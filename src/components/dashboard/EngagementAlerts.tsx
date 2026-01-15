import { AlertTriangle, TrendingDown, Clock, RefreshCw, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const alerts = [
  {
    id: 1,
    type: "drop",
    title: "Engagement Drop Detected",
    description: "Your engagement rate dropped by 18% compared to last week",
    reasons: ["Content fatigue detected", "Posting frequency decreased", "Peak time missed"],
    action: "Consider varying your content format and returning to 7PM posting",
    severity: "high",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "pattern",
    title: "Content Repetition Warning",
    description: "Similar content posted 3 times this week",
    reasons: ["Audience may be experiencing content fatigue"],
    action: "Try introducing new topics or formats to re-engage your audience",
    severity: "medium",
    time: "1 day ago",
  },
  {
    id: 3,
    type: "timing",
    title: "Off-Peak Posting Alert",
    description: "Last 2 posts were published outside optimal hours",
    reasons: ["Posts at 2PM received 40% less engagement"],
    action: "Schedule posts between 6-9 PM for maximum visibility",
    severity: "low",
    time: "2 days ago",
  },
];

const severityColors = {
  high: "border-coral/50 bg-coral/5",
  medium: "border-amber/50 bg-amber/5",
  low: "border-primary/50 bg-primary/5",
};

const severityIcons = {
  high: AlertTriangle,
  medium: Clock,
  low: Lightbulb,
};

const severityIconColors = {
  high: "text-coral bg-coral/20",
  medium: "text-amber bg-amber/20",
  low: "text-primary bg-primary/20",
};

export function EngagementAlerts() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-display font-semibold text-foreground">
            Engagement Alerts
          </h3>
          <p className="text-sm text-muted-foreground">
            Real-time performance warnings
          </p>
        </div>
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-coral/20 text-coral">
          {alerts.filter((a) => a.severity === "high").length} Critical
        </span>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = severityIcons[alert.severity as keyof typeof severityIcons];
          return (
            <div
              key={alert.id}
              className={cn(
                "p-4 rounded-xl border transition-all duration-200 hover:scale-[1.01]",
                severityColors[alert.severity as keyof typeof severityColors]
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "p-2 rounded-lg",
                    severityIconColors[alert.severity as keyof typeof severityIconColors]
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-foreground">
                      {alert.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {alert.description}
                  </p>

                  {/* Reasons */}
                  <div className="space-y-1 mb-3">
                    {alert.reasons.map((reason, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <TrendingDown className="w-3 h-3" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action */}
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-muted/50">
                    <RefreshCw className="w-3.5 h-3.5 text-accent mt-0.5" />
                    <p className="text-xs text-foreground">{alert.action}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
