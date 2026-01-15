import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, Youtube, Linkedin, Instagram, Facebook } from "lucide-react";
import { IntegrationCard } from "./IntegrationCard";
import { IntegrationAuthModal } from "./IntegrationAuthModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Platform configurations
const mainPlatforms = [
  {
    id: "youtube",
    name: "YouTube",
    icon: <Youtube className="w-full h-full text-[#FF0000]" />,
    iconColor: "#FF0000",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: <Linkedin className="w-full h-full text-[#0A66C2]" />,
    iconColor: "#0A66C2",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: <Instagram className="w-full h-full text-[#E4405F]" />,
    iconColor: "#E4405F",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: <Facebook className="w-full h-full text-[#1877F2]" />,
    iconColor: "#1877F2",
  },
];

const secondaryPlatforms = [
  { id: "tiktok", name: "TikTok", iconColor: "#000000" },
  { id: "x", name: "X (Twitter)", iconColor: "#000000" },
  { id: "pinterest", name: "Pinterest", iconColor: "#E60023" },
];

// Custom X/Twitter icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Custom TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// Custom Pinterest icon component
const PinterestIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.96s-.36-.72-.36-1.78c0-1.66.96-2.9 2.16-2.9 1.02 0 1.52.76 1.52 1.68 0 1.02-.66 2.56-1 3.98-.28 1.2.6 2.18 1.78 2.18 2.14 0 3.78-2.26 3.78-5.5 0-2.88-2.06-4.88-5.02-4.88-3.42 0-5.42 2.56-5.42 5.2 0 1.02.4 2.12.88 2.72.1.12.12.22.08.34l-.32 1.32c-.06.22-.18.26-.4.16-1.5-.7-2.44-2.88-2.44-4.62 0-3.76 2.74-7.22 7.88-7.22 4.14 0 7.36 2.94 7.36 6.88 0 4.12-2.6 7.44-6.2 7.44-1.22 0-2.36-.64-2.74-1.38l-.74 2.84c-.26 1.02-.98 2.3-1.46 3.08A12 12 0 1 0 12 0z" />
  </svg>
);

const getSecondaryIcon = (id: string) => {
  switch (id) {
    case "tiktok":
      return <TikTokIcon className="w-full h-full" />;
    case "x":
      return <XIcon className="w-full h-full" />;
    case "pinterest":
      return <PinterestIcon className="w-full h-full text-[#E60023]" />;
    default:
      return null;
  }
};

export function SocialIntegrations() {
  const [connectedPlatforms, setConnectedPlatforms] = useState<Set<string>>(new Set());
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    platform: string;
    icon: React.ReactNode;
  }>({ isOpen: false, platform: "", icon: null });
  const [addedPlatforms, setAddedPlatforms] = useState<string[]>([]);
  const { toast } = useToast();

  const handleConnect = (platformId: string, platformName: string, icon: React.ReactNode) => {
    setAuthModal({ isOpen: true, platform: platformName, icon });
    // Store which platform is being connected
    setAuthModal((prev) => ({ ...prev, platformId } as any));
  };

  const handleAuthSuccess = () => {
    const platformId = (authModal as any).platformId;
    setConnectedPlatforms((prev) => new Set([...prev, platformId]));
    toast({
      title: "Platform Connected",
      description: `Successfully connected to ${authModal.platform}`,
    });
  };

  const handleDisconnect = (platformId: string, platformName: string) => {
    setConnectedPlatforms((prev) => {
      const next = new Set(prev);
      next.delete(platformId);
      return next;
    });
    toast({
      title: "Platform Disconnected",
      description: `Disconnected from ${platformName}`,
    });
  };

  const handleAddSecondary = (platformId: string) => {
    if (!addedPlatforms.includes(platformId)) {
      setAddedPlatforms((prev) => [...prev, platformId]);
    }
  };

  const allDisplayedPlatforms = [
    ...mainPlatforms,
    ...secondaryPlatforms
      .filter((p) => addedPlatforms.includes(p.id))
      .map((p) => ({
        ...p,
        icon: getSecondaryIcon(p.id),
      })),
  ];

  const availableSecondary = secondaryPlatforms.filter(
    (p) => !addedPlatforms.includes(p.id)
  );

  return (
    <div className="space-y-6">
      {/* Connection Status Header */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {connectedPlatforms.size} of {allDisplayedPlatforms.length} platforms connected
            </span>
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{
                  width: `${(connectedPlatforms.size / allDisplayedPlatforms.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Integration Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {allDisplayedPlatforms.map((platform) => (
          <IntegrationCard
            key={platform.id}
            platform={platform.name}
            icon={platform.icon}
            iconColor={platform.iconColor}
            isConnected={connectedPlatforms.has(platform.id)}
            onConnect={() =>
              handleConnect(platform.id, platform.name, platform.icon)
            }
            onDisconnect={() => handleDisconnect(platform.id, platform.name)}
          />
        ))}

        {/* Add Other Card */}
        {availableSecondary.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="glass-card rounded-xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary/30 transition-all duration-300 group min-h-[200px]">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="text-center">
                  <h3 className="font-display font-semibold text-foreground">
                    Add Other
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Connect more platforms
                  </p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="w-48 bg-card border-border/50 z-50"
            >
              {availableSecondary.map((platform) => (
                <DropdownMenuItem
                  key={platform.id}
                  onClick={() => handleAddSecondary(platform.id)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className="w-5 h-5">{getSecondaryIcon(platform.id)}</div>
                  <span>{platform.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Auth Modal */}
      <IntegrationAuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false, platform: "", icon: null })}
        platform={authModal.platform}
        platformIcon={authModal.icon}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
