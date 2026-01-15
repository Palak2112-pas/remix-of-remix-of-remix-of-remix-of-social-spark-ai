import { Heart, MessageCircle, Share2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const topPosts = [
  {
    id: 1,
    type: "Reel",
    title: "5 Productivity Hacks for 2024",
    likes: 12400,
    comments: 892,
    shares: 456,
    reach: 89000,
    thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=100&h=100&fit=crop",
    performance: "high",
  },
  {
    id: 2,
    type: "Carousel",
    title: "The Complete Guide to Remote Work",
    likes: 8900,
    comments: 634,
    shares: 298,
    reach: 56000,
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop",
    performance: "high",
  },
  {
    id: 3,
    type: "Static",
    title: "Morning Routine Infographic",
    likes: 5600,
    comments: 412,
    shares: 189,
    reach: 34000,
    thumbnail: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=100&h=100&fit=crop",
    performance: "medium",
  },
];

const typeColors = {
  Reel: "bg-coral/20 text-coral",
  Carousel: "bg-violet/20 text-violet",
  Static: "bg-primary/20 text-primary",
};

const performanceColors = {
  high: "bg-accent/20 text-accent",
  medium: "bg-amber/20 text-amber",
  low: "bg-coral/20 text-coral",
};

export function TopPosts() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-display font-semibold text-foreground">
            Top Performing Posts
          </h3>
          <p className="text-sm text-muted-foreground">This week's best content</p>
        </div>
      </div>

      <div className="space-y-4">
        {topPosts.map((post, index) => (
          <div
            key={post.id}
            className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Rank */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-violet/20 flex items-center justify-center font-display font-bold text-foreground">
              {index + 1}
            </div>

            {/* Thumbnail */}
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-12 h-12 rounded-lg object-cover"
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", typeColors[post.type as keyof typeof typeColors])}>
                  {post.type}
                </span>
                <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", performanceColors[post.performance as keyof typeof performanceColors])}>
                  {post.performance === "high" ? "🔥 High" : post.performance === "medium" ? "📈 Medium" : "📉 Low"}
                </span>
              </div>
              <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                {post.title}
              </p>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-2 sm:gap-4 text-muted-foreground text-xs sm:text-sm shrink-0">
              <div className="flex items-center gap-1.5 min-w-[50px] justify-center px-2 py-1 rounded-md bg-muted/40">
                <Heart className="w-3.5 h-3.5 shrink-0" />
                <span className="font-medium">{(post.likes / 1000).toFixed(1)}k</span>
              </div>
              <div className="flex items-center gap-1.5 min-w-[50px] justify-center px-2 py-1 rounded-md bg-muted/40">
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span className="font-medium">{post.comments}</span>
              </div>
              <div className="flex items-center gap-1.5 min-w-[50px] justify-center px-2 py-1 rounded-md bg-muted/40">
                <Share2 className="w-3.5 h-3.5 shrink-0" />
                <span className="font-medium">{post.shares}</span>
              </div>
              <div className="flex items-center gap-1.5 min-w-[50px] justify-center px-2 py-1 rounded-md bg-muted/40">
                <Eye className="w-3.5 h-3.5 shrink-0" />
                <span className="font-medium">{(post.reach / 1000).toFixed(0)}k</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
