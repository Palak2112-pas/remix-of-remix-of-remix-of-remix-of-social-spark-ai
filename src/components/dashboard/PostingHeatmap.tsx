import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM"];

// Mock engagement data (0-100)
const heatmapData = [
  [20, 35, 45, 40, 30, 25],
  [25, 40, 50, 45, 35, 30],
  [30, 55, 70, 65, 85, 45],
  [28, 48, 55, 50, 40, 35],
  [35, 60, 75, 70, 90, 50],
  [45, 65, 60, 55, 70, 55],
  [40, 55, 50, 45, 55, 40],
];

function getHeatColor(value: number) {
  if (value >= 80) return "bg-accent";
  if (value >= 60) return "bg-primary";
  if (value >= 40) return "bg-violet/70";
  if (value >= 20) return "bg-muted";
  return "bg-muted/50";
}

function getHeatOpacity(value: number) {
  return Math.max(0.3, value / 100);
}

export function PostingHeatmap() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-display font-semibold text-foreground">
            Smart Posting Times
          </h3>
          <p className="text-sm text-muted-foreground">
            Optimal engagement windows
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Low</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 rounded bg-muted/50" />
            <div className="w-4 h-4 rounded bg-muted" />
            <div className="w-4 h-4 rounded bg-violet/70" />
            <div className="w-4 h-4 rounded bg-primary" />
            <div className="w-4 h-4 rounded bg-accent" />
          </div>
          <span>High</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[400px]">
          {/* Header */}
          <div className="flex mb-2">
            <div className="w-12" />
            {hours.map((hour) => (
              <div
                key={hour}
                className="flex-1 text-center text-xs text-muted-foreground"
              >
                {hour}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="space-y-2">
            {days.map((day, dayIndex) => (
              <div key={day} className="flex items-center gap-2">
                <div className="w-10 text-xs text-muted-foreground font-medium">
                  {day}
                </div>
                <div className="flex-1 flex gap-2">
                  {heatmapData[dayIndex].map((value, hourIndex) => (
                    <div
                      key={hourIndex}
                      className={cn(
                        "flex-1 h-10 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 relative group",
                        getHeatColor(value)
                      )}
                      style={{ opacity: getHeatOpacity(value) }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover border border-border rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        <p className="font-medium">{day} {hours[hourIndex]}</p>
                        <p className="text-muted-foreground">Engagement: {value}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insight */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-violet/10 border border-primary/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-1">AI Insight</p>
            <p className="text-sm text-muted-foreground">
              Posting between <span className="text-accent font-medium">7–9 PM on Wednesday & Friday</span> yields 
              the highest engagement. Your audience is most active during evening hours on weekdays.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
