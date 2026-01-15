import { useState } from "react";
import { FileText, Download, Sparkles, TrendingUp, TrendingDown, Target, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SummaryData {
  highlights: string[];
  improvements: string[];
  recommendations: string[];
  metrics: {
    label: string;
    value: string;
    change: number;
  }[];
}

const summaryData: SummaryData = {
  metrics: [
    { label: "Total Reach", value: "245K", change: 18 },
    { label: "Engagement Rate", value: "4.8%", change: 12 },
    { label: "New Followers", value: "1,234", change: -5 },
    { label: "Avg. Comments", value: "89", change: 24 },
  ],
  highlights: [
    "Your Reel 'Productivity Hacks' reached 89K accounts — your best-performing content this month",
    "Wednesday evening posts averaged 3.2x higher engagement than other days",
    "Educational content received 40% more saves than promotional posts",
  ],
  improvements: [
    "Static image posts saw a 15% decline in engagement compared to last week",
    "Weekend posting frequency dropped, resulting in lower overall reach",
    "Caption length on underperforming posts averaged 400+ characters",
  ],
  recommendations: [
    "Increase Reel output to 4-5 per week to maximize reach potential",
    "Shift 70% of posting schedule to Wed-Fri evening slots (6-9 PM)",
    "Test shorter, punchier captions (100-150 chars) for static posts",
    "Create a content series around productivity tips — your audience loves them",
  ],
};

export function WeeklySummary() {
  const [isGenerated, setIsGenerated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsGenerated(true);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/20">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-display font-semibold text-foreground">
              Weekly Strategy Summary
            </h3>
            <p className="text-sm text-muted-foreground">
              AI-generated performance report
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            disabled={!isGenerated}
          >
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
          <Button
            size="sm"
            onClick={handleGenerate}
            disabled={isLoading}
            className="gap-2 bg-gradient-to-r from-primary to-violet hover:opacity-90"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Regenerate
              </>
            )}
          </Button>
        </div>
      </div>

      {isGenerated && (
        <div className="space-y-6 animate-fade-in">
          {/* Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {summaryData.metrics.map((metric) => (
              <div
                key={metric.label}
                className="p-4 rounded-xl bg-muted/30 border border-border/50"
              >
                <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-display font-bold text-foreground">
                    {metric.value}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-medium flex items-center gap-0.5 mb-1",
                      metric.change > 0 ? "text-accent" : "text-coral"
                    )}
                  >
                    {metric.change > 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {Math.abs(metric.change)}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* What Worked */}
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-4 h-4 text-accent" />
                <h4 className="font-medium text-foreground">What Worked</h4>
              </div>
              <ul className="space-y-3">
                {summaryData.highlights.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* What Didn't */}
            <div className="p-4 rounded-xl bg-coral/5 border border-coral/20">
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="w-4 h-4 text-coral" />
                <h4 className="font-medium text-foreground">What Didn't Work</h4>
              </div>
              <ul className="space-y-3">
                {summaryData.improvements.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-coral mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-4 h-4 text-primary" />
                <h4 className="font-medium text-foreground">Next Week's Focus</h4>
              </div>
              <ul className="space-y-3">
                {summaryData.recommendations.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0 font-medium">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
