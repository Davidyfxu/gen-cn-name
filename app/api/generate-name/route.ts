import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createServerSupabaseClient } from "@/lib/supabase-server";

// Initialize OpenAI client, configured to use DeepSeek API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_PROXY_URL,
});

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();

    // Get the current user session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, data } = await req.json();
    const userId = session.user.id;

    // Get user from database
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user has enough credits
    if (user.credits < 1) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 402 },
      );
    }

    // Prepare prompt based on input type
    let prompt = "";
    let inputData: any = {};

    if (type === "form") {
      inputData = {
        age: parseInt(data.age),
        name: data.name,
        hobbies: data.hobbies.split(",").map((h: string) => h.trim()),
        expectations: data.expectations,
        china_knowledge: data.chinaKnowledge,
      };

      prompt = `Create a personalized Chinese name for someone with these details:
      Name: ${data.name}
      Sex: ${data.sex}
      Age: ${data.age}
      Hobbies: ${data.hobbies}
      Expectations/Aspirations: ${data.expectations}
      Knowledge of China: ${data.chinaKnowledge}
      
      Please provide:
      1. A Chinese name (simplified characters)
      2. Pinyin pronunciation
      3. Traditional characters (if different)
      4. Detailed meaning and significance of the name
      5. Cultural background and why this name suits them
    
    Format the response as JSON with these fields: chinese_name, pinyin, traditional, meaning, cultural_significance`;
    } else if (type === "chat") {
      inputData = { chat_context: JSON.stringify(data) };

      const conversation = data
        .map(
          (msg: any) =>
            `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`,
        )
        .join("\n");

      prompt = `Based on this conversation, create a personalized Chinese name:
      
      ${conversation}
      
      Please provide:
      1. A Chinese name (simplified characters)
      2. Pinyin pronunciation  
      3. Traditional characters (if different)
      4. Detailed meaning and significance of the name
      5. Cultural background and why this name suits them
      
    Format the response as JSON with these fields: chinese_name, pinyin, traditional, meaning, cultural_significance`;
    }

    // Call DeepSeek API using OpenAI SDK
    try {
      const completion = await openai.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content:
              "You are an expert in Chinese culture and names. You create meaningful, culturally appropriate Chinese names for foreigners based on their personality, interests, and aspirations. IMPORTANT: You must respond with ONLY valid JSON format, without any markdown formatting, code blocks, or additional text.",
          },
          {
            role: "user",
            content:
              prompt +
              "\n\nIMPORTANT: Respond with ONLY the JSON object, no markdown formatting or additional text.",
          },
        ],
        temperature: 1.3,
      });

      let generatedName;

      try {
        const content = completion.choices[0]?.message?.content;
        if (!content) {
          throw new Error("No content received from AI");
        }

        // Clean content, remove possible markdown code block markers
        let cleanContent = content.trim();

        // Remove ```json prefix and ``` suffix
        if (cleanContent.startsWith("```json")) {
          cleanContent = cleanContent.replace(/^```json\s*/, "");
        }
        if (cleanContent.startsWith("```")) {
          cleanContent = cleanContent.replace(/^```\s*/, "");
        }
        if (cleanContent.endsWith("```")) {
          cleanContent = cleanContent.replace(/\s*```$/, "");
        }

        // Try to extract JSON part (if there's other text)
        const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          cleanContent = jsonMatch[0];
        }

        generatedName = JSON.parse(cleanContent);
      } catch (parseError) {
        console.error("JSON parsing error:", parseError);
        // Fallback if JSON parsing fails
        generatedName = {
          chinese_name: "李明",
          pinyin: "Lǐ Míng",
          traditional: "李明",
          meaning:
            'Li (李) means "plum" symbolizing resilience and beauty. Ming (明) means "bright" or "intelligent", representing wisdom and clarity.',
          cultural_significance:
            "This name combines natural beauty with intellectual qualities, reflecting traditional Chinese values of both inner and outer cultivation.",
        };
      }

      // Deduct credit from user
      const { error: updateError } = await supabase
        .from("users")
        .update({ credits: user.credits - 1 })
        .eq("id", user.id);

      if (updateError) {
        console.error("Failed to update user credits:", updateError);
      }

      // Save generation to database
      const { error: insertError } = await supabase
        .from("name_generations")
        .insert({
          user_id: userId,
          input_data: inputData,
          generated_name: generatedName,
        });

      if (insertError) {
        console.error("Failed to save generation:", insertError);
      }

      return NextResponse.json(generatedName);
    } catch (aiError) {
      console.error("DeepSeek API error:", aiError);
      return NextResponse.json(
        {
          error: "Name generation failed",
          details:
            aiError instanceof Error ? aiError.message : "Unknown AI error",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
