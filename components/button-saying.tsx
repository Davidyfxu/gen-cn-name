"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { useEffect, useState, ComponentProps, useCallback } from "react";

interface ButtonSayingProps
  extends Omit<ComponentProps<typeof Button>, "onError"> {
  /** 要朗读的文本 */
  text: string;
  /** 语言设置，默认为中文 */
  lang?: string;
  /** 音量，范围 0-1，默认为 1 */
  volume?: number;
  /** 语速，范围 0.1-10，默认为 0.8 */
  rate?: number;
  /** 音调，范围 0-2，默认为 1 */
  pitch?: number;
  /** 选择特定的语音，如果不指定则使用默认语音 */
  voiceIndex?: number;
  /** 朗读开始时的回调 */
  onStart?: () => void;
  /** 朗读完成时的回调 */
  onEnd?: () => void;
  /** 朗读出错时的回调 */
  onError?: (error: string) => void;
  /** 朗读中显示的文本，默认为 "Playing..." */
  speakingText?: string;
  /** 默认显示的文本，默认为 "Play" */
  defaultText?: string;
}

export function ButtonSaying({
  text,
  lang = "zh-CN",
  volume = 1,
  rate = 0.8,
  pitch = 1,
  voiceIndex,
  onStart,
  onEnd,
  onError,
  speakingText = "Playing...",
  defaultText = "Play",
  children,
  disabled,
  className,
  ...props
}: ButtonSayingProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // 检查浏览器支持
    if (!("speechSynthesis" in window)) {
      setIsSupported(false);
    }
  }, []);

  const handleSpeak = useCallback(() => {
    if (!isSupported) {
      const errorMsg =
        "Your browser doesn't support speech synthesis. Please use a different browser or update your current one.";
      alert(errorMsg);
      onError?.(errorMsg);
      return;
    }

    if (isSpeaking) {
      // 如果正在朗读，则停止
      window?.speechSynthesis?.cancel?.();
      setIsSpeaking(false);
      return;
    }

    try {
      // 创建 SpeechSynthesisUtterance 实例
      const msg = new SpeechSynthesisUtterance();

      // 设置朗读内容
      msg.text = text;

      // 设置语言
      msg.lang = lang;

      // 设置音量
      msg.volume = Math.max(0, Math.min(1, volume));

      // 设置语速
      msg.rate = Math.max(0.1, Math.min(10, rate));

      // 设置音调
      msg.pitch = Math.max(0, Math.min(2, pitch));

      // 获取可用的语音列表并选择指定的语音
      const voices = window.speechSynthesis.getVoices();
      if (voiceIndex !== undefined && voices[voiceIndex]) {
        msg.voice = voices[voiceIndex];
      }

      // 监听朗读开始事件
      msg.addEventListener("start", () => {
        setIsSpeaking(true);
        onStart?.();
      });

      // 监听朗读完成事件
      msg.addEventListener("end", () => {
        setIsSpeaking(false);
        onEnd?.();
      });

      // 监听朗读错误事件
      msg.addEventListener("error", (event) => {
        setIsSpeaking(false);
        const errorMsg = `Speech synthesis error: ${event.error}`;
        console.error(errorMsg);
        onError?.(errorMsg);
      });

      // 开始朗读
      window.speechSynthesis.speak(msg);
    } catch (error) {
      const errorMsg = `Speech synthesis failed: ${error instanceof Error ? error.message : "Unknown error"}`;
      console.error(errorMsg);
      onError?.(errorMsg);
    }
  }, [
    text,
    lang,
    volume,
    rate,
    pitch,
    voiceIndex,
    isSpeaking,
    isSupported,
    onStart,
    onEnd,
    onError,
  ]);

  useEffect(() => {
    // 组件卸载时停止朗读
    return () => {
      if (window.speechSynthesis) {
        window?.speechSynthesis?.cancel?.();
      }
    };
  }, []);

  return (
    <Button
      onClick={handleSpeak}
      disabled={disabled || !isSupported || !text.trim()}
      className={cn(isSpeaking && "animate-pulse-strong", className)}
      {...props}
    >
      {children || (isSpeaking ? speakingText : defaultText)}
    </Button>
  );
}
