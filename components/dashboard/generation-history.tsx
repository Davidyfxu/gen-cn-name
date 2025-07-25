import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Plus } from "lucide-react";
import { NameGeneration } from "@/lib/supabase";
import Link from "next/link";

interface GenerationHistoryProps {
  generations: NameGeneration[];
}

export function GenerationHistory({ generations }: GenerationHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Your Generated Names</CardTitle>
            <CardDescription>
              All the Chinese names you've created with their meanings
            </CardDescription>
          </div>
          <Link href="/generate">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Generate New Name
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {generations.length === 0 ? (
          <div className="text-center py-8">
            <Sparkles className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <h3 className="text-base font-medium text-gray-900 mb-2">
              No names generated yet
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Create your first Chinese name to get started
            </p>
            <Link href="/generate">
              <Button size="sm">
                Generate Your First Name
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {generations.map((generation: NameGeneration, index) => (
              <Card
                key={generation.id}
                className="border-l-4 border-l-indigo-500"
              >
                <CardContent>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-indigo-600">
                        {generation.generated_name.chinese_name}
                      </h3>
                      <p className="text-base text-gray-600">
                        {generation.generated_name.pinyin}
                      </p>
                      {generation.generated_name.traditional && (
                        <p className="text-xs text-gray-500">
                          Traditional: {generation.generated_name.traditional}
                        </p>
                      )}
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      {new Date(generation.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Meaning
                      </h4>
                      <p className="text-gray-700 text-xs leading-relaxed">
                        {generation.generated_name.meaning}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Cultural Significance
                      </h4>
                      <p className="text-gray-700 text-xs leading-relaxed">
                        {generation.generated_name.cultural_significance}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
