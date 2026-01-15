import { useState } from "react";
import { Beaker, Sparkles, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface PredictionResult {
  engagement: { min: number; max: number };
  risk: "low" | "medium" | "high";
  confidence: number;
  insights: string[];
}

export function ContentSimulator() {
  const [contentType, setContentType] = useState("reel");
  const [postingDay, setPostingDay] = useState("wednesday");
  const [postingTime, setPostingTime] = useState("7pm");
  const [captionLength, setCaptionLength] = useState([150]);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulate = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Mock prediction based on inputs
      const isOptimal =
        (postingDay === "wednesday" || postingDay === "friday") &&
        (postingTime === "7pm" || postingTime === "8pm") &&
        contentType === "reel";

      const prediction: PredictionResult = {
        engagement: isOptimal
          ? { min: 4500, max: 7200 }
          : contentType === "reel"
          ? { min: 2800, max: 4500 }
          : { min: 1200, max: 2800 },
        risk: isOptimal ? "low" : contentType === "static" ? "high" : "medium",
        confidence: isOptimal ? 92 : contentType === "reel" ? 78 : 65,
        insights: isOptimal
          ? [
              "Optimal posting time selected",
              "Reel format has highest reach potential",
              "Your audience is most active during this window",
            ]
          : [
              contentType !== "reel" && "Consider Reel format for 3x higher reach",
              !["wednesday", "friday"].includes(postingDay) &&
                "Wed/Fri posts perform 40% better",
              !["7pm", "8pm"].includes(postingTime) &&
                "Evening posts (7-9 PM) get more engagement",
            ].filter(Boolean) as string[],
      };

      setPrediction(prediction);
      setIsLoading(false);
    }, 1500);
  };

  const riskColors = {
    low: "text-accent bg-accent/20",
    medium: "text-amber bg-amber/20",
    high: "text-coral bg-coral/20",
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-violet/20">
          <Beaker className="w-5 h-5 text-violet" />
        </div>
        <div>
          <h3 className="text-lg font-display font-semibold text-foreground">
            Content Performance Simulator
          </h3>
          <p className="text-sm text-muted-foreground">
            Predict engagement before you post
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Content Type</label>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger className="bg-muted/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reel">🎬 Reel</SelectItem>
                <SelectItem value="carousel">📚 Carousel</SelectItem>
                <SelectItem value="static">🖼️ Static Image</SelectItem>
                <SelectItem value="story">📱 Story</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Posting Day</label>
            <Select value={postingDay} onValueChange={setPostingDay}>
              <SelectTrigger className="bg-muted/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monday">Monday</SelectItem>
                <SelectItem value="tuesday">Tuesday</SelectItem>
                <SelectItem value="wednesday">Wednesday ⭐</SelectItem>
                <SelectItem value="thursday">Thursday</SelectItem>
                <SelectItem value="friday">Friday ⭐</SelectItem>
                <SelectItem value="saturday">Saturday</SelectItem>
                <SelectItem value="sunday">Sunday</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Posting Time</label>
            <Select value={postingTime} onValueChange={setPostingTime}>
              <SelectTrigger className="bg-muted/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9am">9:00 AM</SelectItem>
                <SelectItem value="12pm">12:00 PM</SelectItem>
                <SelectItem value="3pm">3:00 PM</SelectItem>
                <SelectItem value="6pm">6:00 PM</SelectItem>
                <SelectItem value="7pm">7:00 PM ⭐</SelectItem>
                <SelectItem value="8pm">8:00 PM ⭐</SelectItem>
                <SelectItem value="9pm">9:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-foreground">Caption Length</label>
              <span className="text-sm text-muted-foreground">{captionLength[0]} chars</span>
            </div>
            <Slider
              value={captionLength}
              onValueChange={setCaptionLength}
              max={500}
              min={50}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Short (50)</span>
              <span>Optimal (150-250)</span>
              <span>Long (500)</span>
            </div>
          </div>

          <Button
            onClick={handleSimulate}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-violet hover:opacity-90"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Simulate Performance
              </span>
            )}
          </Button>
        </div>

        {/* Prediction Results */}
        <div className="space-y-4">
          {prediction ? (
            <>
              {/* Engagement Prediction */}
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">Predicted Engagement</span>
                  <span className="text-xs text-muted-foreground">
                    {prediction.confidence}% confidence
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-display font-bold text-foreground">
                    {prediction.engagement.min.toLocaleString()}
                  </span>
                  <span className="text-lg text-muted-foreground mb-1">-</span>
                  <span className="text-3xl font-display font-bold text-accent">
                    {prediction.engagement.max.toLocaleString()}
                  </span>
                </div>
                <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                    style={{
                      width: `${(prediction.engagement.max / 10000) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Risk Level */}
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Risk Level</span>
                  <span
                    className={cn(
                      "flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
                      riskColors[prediction.risk]
                    )}
                  >
                    {prediction.risk === "low" ? (
                      <CheckCircle className="w-3.5 h-3.5" />
                    ) : prediction.risk === "medium" ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5" />
                    )}
                    {prediction.risk.charAt(0).toUpperCase() + prediction.risk.slice(1)} Risk
                  </span>
                </div>
              </div>

              {/* Insights */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-violet/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">AI Insights</span>
                </div>
                <ul className="space-y-2">
                  {prediction.insights.map((insight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center p-8 rounded-xl border border-dashed border-border/50">
              <div className="text-center">
                <Beaker className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Configure your content settings and click "Simulate Performance" to see predictions
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
