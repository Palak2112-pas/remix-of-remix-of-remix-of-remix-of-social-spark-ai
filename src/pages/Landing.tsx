import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  TrendingUp, 
  MessageCircle, 
  BarChart3, 
  ArrowRight, 
  Sparkles,
  Clock,
  Target,
  Zap,
  ChevronRight
} from "lucide-react";
import socialPulseLogo from "@/assets/socialpulse-logo.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex items-center gap-3">
          <img src={socialPulseLogo} alt="SocialPulse Logo" className="w-10 h-10 rounded-xl" />
          <span className="font-display text-xl font-bold text-foreground">SocialPulse</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/auth?mode=signin">
            <Button variant="ghost" className="text-foreground hover:bg-secondary">
              Sign In
            </Button>
          </Link>
          <Link to="/auth?mode=signup">
            <Button variant="outline" className="border-border/50 hover:bg-secondary">
              Sign Up
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button className="bg-gradient-to-r from-primary to-violet hover:opacity-90 text-primary-foreground">
              Enter Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-16 pb-24 lg:px-12 lg:pt-24 lg:pb-32">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-secondary/50 border border-border/50">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Social Analytics</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-foreground">Turn Social Media Data into</span>
            <br />
            <span className="gradient-text">Winning Content Strategies</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            An AI-powered platform that explains post performance, predicts engagement, 
            and recommends what to post next.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-primary to-violet hover:opacity-90 text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-primary/25 transition-all">
                Enter Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-foreground px-8 py-6 text-lg" asChild>
              <a href="#features">
                View AI Features
                <ChevronRight className="ml-1 w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Proposition Cards */}
      <section id="features" className="relative z-10 px-6 py-20 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Powered by AI Intelligence
            </h2>
            <p className="text-muted-foreground">Everything you need to optimize your social media strategy</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard
              icon={Brain}
              title="Explain Performance"
              description="AI explains why posts succeed or fail with actionable insights"
              color="primary"
              delay={0}
            />
            <ValueCard
              icon={TrendingUp}
              title="Predict Engagement"
              description="Smart posting time & performance simulator for better results"
              color="accent"
              delay={100}
            />
            <ValueCard
              icon={MessageCircle}
              title="AI Strategy Assistant"
              description="Natural language insights chat for content recommendations"
              color="violet"
              delay={200}
            />
            <ValueCard
              icon={BarChart3}
              title="Unified Analytics"
              description="Cross-platform performance analysis in one dashboard"
              color="coral"
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 px-6 py-20 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground">Three simple steps to optimize your content strategy</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              step={1}
              icon={BarChart3}
              title="Analyze Content"
              description="Connect and analyze your social media content across platforms"
            />
            <StepCard
              step={2}
              icon={Zap}
              title="AI Detects Patterns"
              description="Our AI identifies engagement patterns and success factors"
            />
            <StepCard
              step={3}
              icon={Target}
              title="Get Recommendations"
              description="Receive actionable strategy recommendations to boost performance"
            />
          </div>
        </div>
      </section>

      {/* Feature Preview */}
      <section className="relative z-10 px-6 py-20 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Feature Preview
            </h2>
            <p className="text-muted-foreground">Explore the powerful tools at your fingertips</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <FeaturePreviewCard
              icon={Brain}
              title="Why This Post Worked"
              description="AI-powered explanations for post performance with detailed analysis"
              gradient="from-primary/20 to-violet/20"
            />
            <FeaturePreviewCard
              icon={Clock}
              title="Posting Time Heatmap"
              description="Visual heatmap showing optimal posting times for maximum reach"
              gradient="from-accent/20 to-primary/20"
            />
            <FeaturePreviewCard
              icon={MessageCircle}
              title="Strategy Chat Assistant"
              description="Ask questions and get instant AI-powered content recommendations"
              gradient="from-coral/20 to-amber/20"
            />
          </div>
          
          <div className="text-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-secondary hover:bg-secondary/80 text-foreground px-8 py-6 text-lg rounded-xl border border-border/50">
                Explore Full Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 lg:px-12 border-t border-border/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src={socialPulseLogo} alt="SocialPulse Logo" className="w-8 h-8 rounded-lg" />
              <div>
                <span className="font-display font-bold text-foreground">SocialPulse</span>
                <span className="text-muted-foreground text-sm ml-2">• Hackathon Project</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built by Team SocialPulse</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">AI</span>
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">Analytics</span>
              <span className="px-3 py-1 rounded-full bg-violet/10 text-violet text-xs font-medium">NLP</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ValueCard({ 
  icon: Icon, 
  title, 
  description, 
  color, 
  delay 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  color: string;
  delay: number;
}) {
  const colorClasses: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/10 text-accent",
    violet: "bg-violet/10 text-violet",
    coral: "bg-coral/10 text-coral",
  };

  return (
    <div 
      className="glass-card-hover p-6 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ 
  step, 
  icon: Icon, 
  title, 
  description 
}: { 
  step: number; 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) {
  return (
    <div className="relative text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-violet/20 border border-border/50 flex items-center justify-center">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full">
        <span className="text-5xl font-display font-bold text-border/30">{step}</span>
      </div>
      <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function FeaturePreviewCard({ 
  icon: Icon, 
  title, 
  description, 
  gradient 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  gradient: string;
}) {
  return (
    <div className={`glass-card p-6 bg-gradient-to-br ${gradient} border-border/30 hover:border-border/50 transition-all`}>
      <Icon className="w-8 h-8 text-foreground mb-4" />
      <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
