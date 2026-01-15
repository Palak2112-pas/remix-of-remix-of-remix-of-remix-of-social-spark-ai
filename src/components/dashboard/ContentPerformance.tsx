import { useState } from "react";
import { Heart, MessageCircle, Share2, Eye, Sparkles, X, Clock, FileText, Zap, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Post {
  id: number;
  type: "Reel" | "Carousel" | "Static";
  title: string;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  engagement: number;
  thumbnail: string;
  postedAt: string;
  platform: string;
}

const posts: Post[] = [
  {
    id: 1,
    type: "Reel",
    title: "5 Productivity Hacks for 2024",
    likes: 12400,
    comments: 892,
    shares: 456,
    reach: 89000,
    engagement: 15.4,
    thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=100&h=100&fit=crop",
    postedAt: "Wed 7:30 PM",
    platform: "Instagram",
  },
  {
    id: 2,
    type: "Carousel",
    title: "The Complete Guide to Remote Work",
    likes: 8900,
    comments: 634,
    shares: 298,
    reach: 56000,
    engagement: 17.6,
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop",
    postedAt: "Fri 6:00 PM",
    platform: "LinkedIn",
  },
  {
    id: 3,
    type: "Static",
    title: "Morning Routine Infographic",
    likes: 5600,
    comments: 412,
    shares: 189,
    reach: 34000,
    engagement: 18.2,
    thumbnail: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=100&h=100&fit=crop",
    postedAt: "Mon 9:00 AM",
    platform: "Instagram",
  },
  {
    id: 4,
    type: "Reel",
    title: "Quick Tips for Better Sleep",
    likes: 3200,
    comments: 245,
    shares: 98,
    reach: 21000,
    engagement: 16.9,
    thumbnail: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=100&h=100&fit=crop",
    postedAt: "Thu 2:00 PM",
    platform: "Instagram",
  },
  {
    id: 5,
    type: "Carousel",
    title: "Startup Funding 101",
    likes: 7800,
    comments: 523,
    shares: 312,
    reach: 48000,
    engagement: 18.0,
    thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&h=100&fit=crop",
    postedAt: "Wed 8:00 PM",
    platform: "LinkedIn",
  },
];

const typeColors = {
  Reel: "bg-coral/20 text-coral border-coral/30",
  Carousel: "bg-violet/20 text-violet border-violet/30",
  Static: "bg-primary/20 text-primary border-primary/30",
};

interface ExplainerPanelProps {
  post: Post;
  onClose: () => void;
}

function ExplainerPanel({ post, onClose }: ExplainerPanelProps) {
  const isHighPerformer = post.engagement > 16;
  const isOptimalTime = post.postedAt.includes("7:") || post.postedAt.includes("8:") || post.postedAt.includes("6:");
  const isReel = post.type === "Reel";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl animate-slide-up overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-display font-semibold text-foreground">{post.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn("text-xs px-2 py-0.5 rounded-full border", typeColors[post.type])}>
                  {post.type}
                </span>
                <span className="text-xs text-muted-foreground">{post.platform}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-violet">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <h4 className="font-display font-semibold text-foreground">
              Why This Post Performed This Way
            </h4>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            {isHighPerformer
              ? "This post achieved above-average engagement due to several key factors working together."
              : "This post had moderate engagement. Here's what influenced its performance."}
          </p>

          {/* Factors */}
          <div className="space-y-4">
            {/* Posting Time */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
              <div className={cn("p-2 rounded-lg", isOptimalTime ? "bg-accent/20" : "bg-amber/20")}>
                <Clock className={cn("w-4 h-4", isOptimalTime ? "text-accent" : "text-amber")} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-foreground">Posting Time</span>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full", 
                    isOptimalTime ? "bg-accent/20 text-accent" : "bg-amber/20 text-amber")}>
                    {isOptimalTime ? "Optimal" : "Suboptimal"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Posted at {post.postedAt}. {isOptimalTime 
                    ? "This aligns with your audience's peak activity window, maximizing initial reach."
                    : "Consider posting between 6-9 PM on Wed/Fri for higher visibility."}
                </p>
              </div>
            </div>

            {/* Content Format */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
              <div className={cn("p-2 rounded-lg", isReel ? "bg-accent/20" : "bg-primary/20")}>
                <FileText className={cn("w-4 h-4", isReel ? "text-accent" : "text-primary")} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-foreground">Content Format</span>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full", typeColors[post.type])}>
                    {post.type}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {isReel
                    ? "Reels receive 3.2x higher reach in your niche. The short-form video format drives higher engagement velocity."
                    : post.type === "Carousel"
                    ? "Carousels drive 40% more saves. Your 5-slide format kept users swiping."
                    : "Static posts work best for evergreen content. Consider adding interactive elements."}
                </p>
              </div>
            </div>

            {/* Engagement Velocity */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
              <div className="p-2 rounded-lg bg-violet/20">
                <Zap className="w-4 h-4 text-violet" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-foreground">Engagement Velocity</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-violet/20 text-violet">
                    {isHighPerformer ? "High" : "Moderate"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {isHighPerformer
                    ? "Strong initial engagement (first 30 min) signaled quality to the algorithm, boosting distribution."
                    : "Initial engagement was slower. Quick early comments can help boost algorithmic reach."}
                </p>
              </div>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-violet/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Key Success Factors</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {isOptimalTime && (
                <span className="text-xs px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30">
                  ✓ Peak posting time
                </span>
              )}
              {isReel && (
                <span className="text-xs px-3 py-1 rounded-full bg-coral/20 text-coral border border-coral/30">
                  ✓ High-reach format
                </span>
              )}
              {post.engagement > 17 && (
                <span className="text-xs px-3 py-1 rounded-full bg-violet/20 text-violet border border-violet/30">
                  ✓ Strong save rate
                </span>
              )}
              {post.comments > 500 && (
                <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                  ✓ High conversation
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContentPerformance() {
  const [filter, setFilter] = useState("all");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const filteredPosts = filter === "all" 
    ? posts 
    : posts.filter(p => p.type.toLowerCase() === filter);

  return (
    <>
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-display font-semibold text-foreground">
              Content Performance
            </h3>
            <p className="text-sm text-muted-foreground">
              Click any post for AI performance analysis
            </p>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-32 bg-muted/50 border-border/50">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="reel">Reels</SelectItem>
              <SelectItem value="carousel">Carousels</SelectItem>
              <SelectItem value="static">Static</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Posts Table */}
        <div className="space-y-3">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer group border border-transparent hover:border-primary/20"
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-14 h-14 rounded-lg object-cover"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn("text-xs px-2 py-0.5 rounded-full border", typeColors[post.type])}>
                    {post.type}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.postedAt}</span>
                </div>
                <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {post.title}
                </p>
              </div>

              <div className="flex items-center gap-6 text-muted-foreground text-sm">
                <div className="flex items-center gap-1.5 min-w-[70px]">
                  <Heart className="w-4 h-4" />
                  <span>{(post.likes / 1000).toFixed(1)}k</span>
                </div>
                <div className="flex items-center gap-1.5 min-w-[50px]">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments}</span>
                </div>
                <div className="flex items-center gap-1.5 min-w-[50px]">
                  <Share2 className="w-4 h-4" />
                  <span>{post.shares}</span>
                </div>
                <div className="flex items-center gap-1.5 min-w-[60px]">
                  <Eye className="w-4 h-4" />
                  <span>{(post.reach / 1000).toFixed(0)}k</span>
                </div>
                <div className="min-w-[60px] text-right">
                  <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent font-medium">
                    {post.engagement}% ER
                  </span>
                </div>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explainer Panel */}
      {selectedPost && (
        <ExplainerPanel post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </>
  );
}
