import { useState } from "react";
import { Send, Sparkles, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const suggestedPrompts = [
  "What should I post next week?",
  "Why are my carousels underperforming?",
  "Should I focus on Reels or Static posts?",
  "What's my best posting time?",
];

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hi! I'm your AI Strategy Assistant. I can help you analyze your content performance, suggest optimal posting times, and recommend content strategies based on your analytics. What would you like to know?",
  },
];

export function StrategyChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "What should I post next week?":
          "Based on your analytics, I recommend focusing on Educational Reels for maximum engagement. Your audience shows 85% higher engagement with how-to content. Consider posting:\n\n• Monday 7PM: Quick productivity tip (Reel)\n• Wednesday 8PM: Tutorial carousel\n• Friday 6PM: Behind-the-scenes content",
        "Why are my carousels underperforming?":
          "Your carousels are getting 23% less engagement than average. Analysis shows:\n\n• Cover slides lack visual hooks\n• Average 8 slides (optimal is 5-6)\n• Text-heavy designs reduce swipe-through rate\n\nTry: Bold headlines, visual storytelling, and ending with a CTA slide.",
        "Should I focus on Reels or Static posts?":
          "Your Reels outperform static posts by 3.2x in reach and 2.1x in engagement. However, static posts drive 40% more saves. My recommendation:\n\n• Reels for awareness (70% of content)\n• Static for evergreen educational content (30%)",
        "What's my best posting time?":
          "Your optimal posting windows are:\n\n🔥 Hot: Wed & Fri 7-9 PM (90% engagement)\n📈 Good: Mon & Thu 6-8 PM (70% engagement)\n⚠️ Avoid: Weekends before 12 PM (30% engagement)",
      };

      const aiResponse: Message = {
        id: messages.length + 2,
        role: "assistant",
        content:
          responses[text] ||
          "I've analyzed your recent performance data. Your engagement rate has increased by 15% this week, primarily driven by your Reel content. Would you like me to break down the specific factors contributing to this growth?",
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="glass-card flex flex-col h-[500px]">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-violet">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">
              Strategy Chat
            </h3>
            <p className="text-xs text-muted-foreground">
              AI-powered content advisor
            </p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-accent">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 animate-fade-in",
              message.role === "user" && "flex-row-reverse"
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                message.role === "assistant"
                  ? "bg-gradient-to-br from-primary to-violet"
                  : "bg-muted"
              )}
            >
              {message.role === "assistant" ? (
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              ) : (
                <User className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <div
              className={cn(
                "max-w-[80%] p-3 rounded-xl text-sm",
                message.role === "assistant"
                  ? "bg-muted/50 text-foreground"
                  : "bg-primary text-primary-foreground"
              )}
            >
              <p className="whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-violet flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground animate-pulse" />
            </div>
            <div className="bg-muted/50 p-3 rounded-xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.1s]" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Prompts */}
      <div className="px-4 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="flex-shrink-0 px-3 py-1.5 text-xs rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors border border-border/50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your content strategy..."
            className="bg-muted/50 border-border/50"
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
