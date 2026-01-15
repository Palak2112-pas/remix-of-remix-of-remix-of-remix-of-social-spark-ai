import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", likes: 4200, comments: 840, shares: 420 },
  { name: "Tue", likes: 3800, comments: 720, shares: 380 },
  { name: "Wed", likes: 5100, comments: 980, shares: 510 },
  { name: "Thu", likes: 4600, comments: 890, shares: 460 },
  { name: "Fri", likes: 6200, comments: 1240, shares: 620 },
  { name: "Sat", likes: 5800, comments: 1160, shares: 580 },
  { name: "Sun", likes: 4900, comments: 920, shares: 490 },
];

interface EngagementChartProps {
  fullWidth?: boolean;
}

export function EngagementChart({ fullWidth = false }: EngagementChartProps) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-display font-semibold text-foreground">
            Engagement Overview
          </h3>
          <p className="text-sm text-muted-foreground">Weekly performance trends</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Likes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-sm text-muted-foreground">Comments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-violet" />
            <span className="text-sm text-muted-foreground">Shares</span>
          </div>
        </div>
      </div>

      <div className={fullWidth ? "h-96" : "h-72"}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorShares" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(258, 90%, 66%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(258, 90%, 66%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
            <XAxis
              dataKey="name"
              stroke="hsl(215, 20%, 55%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(215, 20%, 55%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 10%)",
                border: "1px solid hsl(217, 33%, 17%)",
                borderRadius: "12px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }}
              labelStyle={{ color: "hsl(210, 40%, 98%)" }}
            />
            <Area
              type="monotone"
              dataKey="likes"
              stroke="hsl(217, 91%, 60%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorLikes)"
            />
            <Area
              type="monotone"
              dataKey="comments"
              stroke="hsl(160, 84%, 39%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorComments)"
            />
            <Area
              type="monotone"
              dataKey="shares"
              stroke="hsl(258, 90%, 66%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorShares)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
