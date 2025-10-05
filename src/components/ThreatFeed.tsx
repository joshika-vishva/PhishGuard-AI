import { useState, useEffect } from "react";
import { Activity, AlertTriangle, Shield, Clock, Globe, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ThreatEvent {
  id: string;
  timestamp: Date;
  type: "email" | "sms" | "web" | "social";
  severity: "low" | "medium" | "high" | "critical";
  source: string;
  description: string;
  blocked: boolean;
}

const generateThreatEvent = (): ThreatEvent => {
  const types: ("email" | "sms" | "web" | "social")[] = ["email", "sms", "web", "social"];
  const severities: ("low" | "medium" | "high" | "critical")[] = ["low", "medium", "high", "critical"];
  const descriptions = [
    "Credential harvesting attempt detected",
    "Malicious link redirecting to fake login page",
    "Brand impersonation - PayPal phishing",
    "Social engineering attempt via urgent message",
    "Suspicious attachment with potential malware",
    "Domain spoofing detected in email header",
    "Homoglyph attack using unicode characters",
    "Zero-day phishing campaign identified",
  ];

  const sources = [
    "unknown-sender@suspicious-domain.xyz",
    "192.168.1.42",
    "https://paypa1-secure.net",
    "no-reply@amaz0n-verify.com",
    "+1-555-0123",
    "https://microsoft-account.tk",
  ];

  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date(),
    type: types[Math.floor(Math.random() * types.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    blocked: Math.random() > 0.1,
  };
};

const ThreatFeed = () => {
  const [threats, setThreats] = useState<ThreatEvent[]>([]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // Initialize with some threats
    const initialThreats = Array.from({ length: 10 }, generateThreatEvent);
    setThreats(initialThreats.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));

    if (isLive) {
      const interval = setInterval(() => {
        const newThreat = generateThreatEvent();
        setThreats((prev) => [newThreat, ...prev].slice(0, 50));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isLive]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "web":
        return <Globe className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-cyber-red border-cyber-red/30 bg-cyber-red/10";
      case "high":
        return "text-cyber-red border-cyber-red/30 bg-cyber-red/10";
      case "medium":
        return "text-cyber-yellow border-cyber-yellow/30 bg-cyber-yellow/10";
      case "low":
        return "text-cyber-green border-cyber-green/30 bg-cyber-green/10";
      default:
        return "";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-gradient-cyber">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Activity className="h-6 w-6 text-primary animate-pulse" />
                Live Threat Feed
              </CardTitle>
              <CardDescription className="text-foreground/70">
                Real-time monitoring of detected phishing attempts and security events
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-safe border border-cyber-green/20">
                <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-cyber-green">Live</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-3">
              {threats.map((threat, index) => (
                <div
                  key={threat.id}
                  className={`p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-all ${
                    index === 0 ? "animate-in slide-in-from-top" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className={getSeverityColor(threat.severity)}>
                          {threat.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                          {getTypeIcon(threat.type)}
                          <span className="ml-1 capitalize">{threat.type}</span>
                        </Badge>
                        {threat.blocked ? (
                          <Badge variant="outline" className="bg-cyber-green/10 text-cyber-green border-cyber-green/30">
                            <Shield className="h-3 w-3 mr-1" />
                            Blocked
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-cyber-yellow/10 text-cyber-yellow border-cyber-yellow/30">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Flagged
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm font-medium">{threat.description}</p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(threat.timestamp)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          <span className="font-mono truncate max-w-[300px]">{threat.source}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Last Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">47</div>
            <p className="text-xs text-muted-foreground mt-1">Threats detected</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Block Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyber-green">94%</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully blocked</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">32ms</div>
            <p className="text-xs text-muted-foreground mt-1">Average detection</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThreatFeed;
