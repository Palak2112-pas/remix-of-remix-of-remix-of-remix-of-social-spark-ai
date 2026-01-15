import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface IntegrationAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: string;
  platformIcon: React.ReactNode;
  onSuccess: () => void;
}

export function IntegrationAuthModal({
  isOpen,
  onClose,
  platform,
  platformIcon,
  onSuccess,
}: IntegrationAuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setEmail("");
    setPassword("");
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-border/50 sm:max-w-md">
        <DialogHeader className="flex flex-col items-center gap-4 pt-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <div className="w-8 h-8">{platformIcon}</div>
          </div>
          <div className="text-center">
            <DialogTitle className="font-display text-xl">
              Connect to {platform}
            </DialogTitle>
            <DialogDescription className="mt-2">
              Sign in to authorize SocialPulse to access your {platform} analytics
            </DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email / ID</Label>
            <Input
              id="email"
              type="text"
              placeholder={`Your ${platform} email or ID`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-muted/50 border-border/50 focus:border-primary/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-muted/50 border-border/50 focus:border-primary/50"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Authorizing...
              </>
            ) : (
              "Login & Authorize"
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By connecting, you agree to share your analytics data with SocialPulse
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
