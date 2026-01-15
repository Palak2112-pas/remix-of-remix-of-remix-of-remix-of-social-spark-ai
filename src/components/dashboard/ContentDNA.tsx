import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Sparkles, BookOpen, Megaphone, Heart, Zap } from "lucide-react";

const contentData = [
  { category: "Educational", value: 85, fullMark: 100 },
  { category: "Promotional", value: 45, fullMark: 100 },
  { category: "Emotional", value: 70, fullMark: 100 },
  { category: "Trend-based", value: 60, fullMark: 100 },
  { category: "Entertaining", value: 55, fullMark: 100 },
];

const contentTypes = [
  { type: "Educational", icon: BookOpen, performance: "Best", color: "accent" },
  { type: "Emotional", icon: Heart, performance: "High", color: "coral" },
  { type: "Trend-based", icon: Zap, performance: "Medium", color: "violet" },
  { type: "Promotional", icon: Megaphone, performance: "Low", color: "primary" },
];

export function ContentDNA() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-display font-semibold text-foreground">
            Content DNA Analyzer
          </h3>
          <p className="text-sm text-muted-foreground">
            Your content personality profile
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={contentData}>
              <PolarGrid stroke="hsl(217, 33%, 17%)" />
              <PolarAngleAxis
                dataKey="category"
                tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 10 }}
              />
              <Radar
                name="Performance"
                dataKey="value"
                stroke="hsl(217, 91%, 60%)"
                fill="hsl(217, 91%, 60%)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Content Type Performance */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground mb-4">
            Performance by Content Type
          </p>
          {contentTypes.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.type}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/30"
              >
                <div className={`p-2 rounded-lg bg-${item.color}/20`}>
                  <Icon className={`w-4 h-4 text-${item.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.type}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    item.performance === "Best"
                      ? "bg-accent/20 text-accent"
                      : item.performance === "High"
                      ? "bg-coral/20 text-coral"
                      : item.performance === "Medium"
                      ? "bg-violet/20 text-violet"
                      : "bg-primary/20 text-primary"
                  }`}
                >
                  {item.performance}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Insight */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-accent/20">
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Content Strategy Insight</p>
            <p className="text-sm text-muted-foreground">
              Your audience responds best to <span className="text-accent font-medium">Educational + Short-form</span> content. 
              Consider creating more how-to guides and quick tips to maximize engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
