import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  color: "primary" | "accent" | "coral" | "violet";
  delay?: number;
}

const colorStyles = {
  primary: {
    bg: "from-primary/20 to-primary/5",
    icon: "bg-primary/20 text-primary",
    glow: "shadow-[0_0_30px_hsl(var(--primary)/0.2)]",
  },
  accent: {
    bg: "from-accent/20 to-accent/5",
    icon: "bg-accent/20 text-accent",
    glow: "shadow-[0_0_30px_hsl(var(--accent)/0.2)]",
  },
  coral: {
    bg: "from-coral/20 to-coral/5",
    icon: "bg-coral/20 text-coral",
    glow: "shadow-[0_0_30px_hsl(var(--coral)/0.2)]",
  },
  violet: {
    bg: "from-violet/20 to-violet/5",
    icon: "bg-violet/20 text-violet",
    glow: "shadow-[0_0_30px_hsl(var(--violet)/0.2)]",
  },
};

export function KPICard({ title, value, change, icon: Icon, color, delay = 0 }: KPICardProps) {
  const styles = colorStyles[color];
  const isPositive = change > 0;
  const isNeutral = change === 0;

  return (
    <div
      className={cn(
        "glass-card-hover p-5 animate-slide-up",
        styles.glow
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-2.5 rounded-xl", styles.icon)}>
          <Icon className="w-5 h-5" />
        </div>
        <div
          className={cn(
            "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
            isPositive && "text-accent bg-accent/10",
            !isPositive && !isNeutral && "text-coral bg-coral/10",
            isNeutral && "text-muted-foreground bg-muted"
          )}
        >
          {isPositive ? (
            <TrendingUp className="w-3.5 h-3.5" />
          ) : isNeutral ? (
            <Minus className="w-3.5 h-3.5" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" />
          )}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-muted-foreground text-sm">{title}</p>
        <p className="text-3xl font-display font-bold text-foreground">{value}</p>
      </div>

      {/* Gradient bar */}
      <div className={cn("mt-4 h-1 rounded-full bg-gradient-to-r", styles.bg)} />
    </div>
  );
}
