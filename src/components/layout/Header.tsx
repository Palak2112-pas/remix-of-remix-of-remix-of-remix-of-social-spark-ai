import { Bell, Search, User, Instagram, Linkedin, Twitter, ArrowLeft, LogOut, Home, TrendingUp, TrendingDown, Link2, AlertCircle, CheckCircle, Info, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Mock notifications data
const initialNotifications = [
  {
    id: 1,
    type: "success" as const,
    message: "Your Instagram engagement increased by 23% this week!",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "alert" as const,
    message: "LinkedIn sync failed. Please reconnect your account.",
    timestamp: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "info" as const,
    message: "Your weekly summary is ready to view.",
    timestamp: "1 day ago",
    read: false,
  },
  {
    id: 4,
    type: "alert" as const,
    message: "Engagement drop detected on Twitter (-15%)",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: 5,
    type: "success" as const,
    message: "Successfully connected to Instagram",
    timestamp: "3 days ago",
    read: true,
  },
];

const notificationIcons = {
  success: CheckCircle,
  alert: AlertCircle,
  info: Info,
};

const notificationColors = {
  success: "text-accent",
  alert: "text-coral",
  info: "text-primary",
};
interface HeaderProps {
  platform: string;
  onPlatformChange: (platform: string) => void;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function Header({
  platform,
  onPlatformChange,
  timeRange,
  onTimeRangeChange,
  showBackButton,
  onBack,
}: HeaderProps) {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate("/");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast({
      title: "Notifications",
      description: "All notifications marked as read.",
    });
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Section - Back Button & Search */}
        <div className="flex items-center gap-4">
          {/* Back to Home Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToHome}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Button>

          {/* Section Back Button */}
          {showBackButton && onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          )}
          
          {/* Search */}
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search content, metrics..."
              className="pl-10 bg-muted/50 border-border/50 focus:border-primary/50"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          {/* Platform Filter */}
          <Select value={platform} onValueChange={onPlatformChange}>
            <SelectTrigger className="w-40 bg-muted/50 border-border/50">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <span className="flex items-center gap-2">All Platforms</span>
              </SelectItem>
              <SelectItem value="instagram">
                <span className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-coral" /> Instagram
                </span>
              </SelectItem>
              <SelectItem value="linkedin">
                <span className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-primary" /> LinkedIn
                </span>
              </SelectItem>
              <SelectItem value="twitter">
                <span className="flex items-center gap-2">
                  <Twitter className="w-4 h-4 text-electric-blue" /> Twitter
                </span>
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Time Range */}
          <Select value={timeRange} onValueChange={onTimeRangeChange}>
            <SelectTrigger className="w-32 bg-muted/50 border-border/50">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>

          {/* Notifications */}
          <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-coral rounded-full flex items-center justify-center text-[10px] font-bold text-white px-1">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0 bg-card border-border shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h4 className="font-semibold text-foreground">Notifications</h4>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs text-primary hover:text-primary/80 h-auto py-1 px-2"
                  >
                    Mark all as read
                  </Button>
                )}
              </div>

              {/* Notification List */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                    <Bell className="w-10 h-10 mb-2 opacity-40" />
                    <p className="text-sm">No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notification) => {
                    const Icon = notificationIcons[notification.type];
                    return (
                      <div
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={cn(
                          "flex items-start gap-3 px-4 py-3 border-b border-border/50 cursor-pointer transition-colors hover:bg-muted/50",
                          !notification.read && "bg-primary/5"
                        )}
                      >
                        <div className={cn("mt-0.5 shrink-0", notificationColors[notification.type])}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-sm text-foreground leading-snug",
                            !notification.read && "font-medium"
                          )}>
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{notification.timestamp}</span>
                          </div>
                        </div>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="px-4 py-2 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => setNotificationOpen(false)}
                  >
                    View all notifications
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-violet flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-foreground">Account</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleBackToHome}>
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
