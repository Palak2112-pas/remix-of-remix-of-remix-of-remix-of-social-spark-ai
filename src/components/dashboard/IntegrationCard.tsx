import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Loader2, Unplug } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IntegrationCardProps {
  platform: string;
  icon: React.ReactNode;
  iconColor: string;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function IntegrationCard({
  platform,
  icon,
  iconColor,
  isConnected,
  onConnect,
  onDisconnect,
}: IntegrationCardProps) {
  return (
    <div className="glass-card rounded-xl p-6 flex flex-col items-center gap-4 hover:border-primary/30 transition-all duration-300 group">
      {/* Platform Icon */}
      <div
        className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300",
          "bg-gradient-to-br from-muted to-muted/50 group-hover:scale-110",
          isConnected && "ring-2 ring-accent ring-offset-2 ring-offset-background"
        )}
        style={{
          boxShadow: `0 0 30px ${iconColor}20`,
        }}
      >
        <div className={cn("w-8 h-8", isConnected && "opacity-80")}>
          {icon}
        </div>
      </div>

      {/* Platform Name */}
      <div className="text-center">
        <h3 className="font-display font-semibold text-foreground">{platform}</h3>
        {isConnected && (
          <div className="flex items-center gap-1.5 justify-center mt-1">
            <Check className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs text-accent font-medium">Connected</span>
          </div>
        )}
      </div>

      {/* Action Button */}
      {isConnected ? (
        <Button
          variant="outline"
          size="sm"
          onClick={onDisconnect}
          className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Unplug className="w-4 h-4 mr-2" />
          Disconnect
        </Button>
      ) : (
        <Button
          size="sm"
          onClick={onConnect}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Connect
        </Button>
      )}
    </div>
  );
}
