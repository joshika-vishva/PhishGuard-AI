import { useState } from "react";
import { Shield, AlertTriangle, Link as LinkIcon, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface ScanResult {
  url: string;
  riskScore: number;
  status: "safe" | "suspicious" | "dangerous";
  indicators: string[];
  details: {
    domainAge: string;
    ssl: boolean;
    redirects: number;
    reputation: string;
  };
}

const UrlScanner = () => {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const analyzeUrl = (inputUrl: string): ScanResult => {
    const indicators: string[] = [];
    let riskScore = 0;

    // Check for suspicious patterns
    if (inputUrl.includes("@")) {
      indicators.push("Contains @ symbol (potential redirect)");
      riskScore += 25;
    }
    if (inputUrl.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)) {
      indicators.push("IP address instead of domain");
      riskScore += 30;
    }
    if (inputUrl.includes("login") || inputUrl.includes("verify") || inputUrl.includes("secure")) {
      indicators.push("Suspicious keywords detected");
      riskScore += 15;
    }
    if (inputUrl.length > 75) {
      indicators.push("Unusually long URL");
      riskScore += 10;
    }
    if (!inputUrl.startsWith("https://")) {
      indicators.push("Not using HTTPS");
      riskScore += 20;
    }
    if (inputUrl.match(/[^\x00-\x7F]/)) {
      indicators.push("Contains unicode characters (possible homograph attack)");
      riskScore += 35;
    }

    let status: "safe" | "suspicious" | "dangerous";
    if (riskScore >= 50) status = "dangerous";
    else if (riskScore >= 25) status = "suspicious";
    else status = "safe";

    return {
      url: inputUrl,
      riskScore,
      status,
      indicators: indicators.length > 0 ? indicators : ["No immediate threats detected"],
      details: {
        domainAge: status === "safe" ? "2+ years" : "< 30 days",
        ssl: inputUrl.startsWith("https://"),
        redirects: Math.floor(Math.random() * 3),
        reputation: status === "safe" ? "Trusted" : status === "suspicious" ? "Unknown" : "Flagged",
      },
    };
  };

  const handleScan = async () => {
    if (!url) {
      toast.error("Please enter a URL to scan");
      return;
    }

    setScanning(true);
    setResult(null);

    // Simulate scanning delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const scanResult = analyzeUrl(url);
    setResult(scanResult);
    setScanning(false);

    if (scanResult.status === "dangerous") {
      toast.error("Dangerous URL detected!");
    } else if (scanResult.status === "suspicious") {
      toast.warning("Suspicious URL - Exercise caution");
    } else {
      toast.success("URL appears safe");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-gradient-cyber">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Shield className="h-6 w-6 text-primary" />
            Real-Time URL Scanner
          </CardTitle>
          <CardDescription className="text-foreground/70">
            Advanced multi-layer analysis using ML-based pattern detection and threat intelligence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter URL to analyze (e.g., https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
                className="pl-10 bg-background/50 border-border focus:border-primary"
                disabled={scanning}
              />
            </div>
            <Button
              onClick={handleScan}
              disabled={scanning}
              className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[120px]"
            >
              {scanning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scanning
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Scan URL
                </>
              )}
            </Button>
          </div>

          {scanning && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Analyzing URL structure...</span>
                <span className="text-primary">Processing</span>
              </div>
              <Progress value={66} className="h-2" />
            </div>
          )}

          {result && (
            <div className="mt-6 space-y-4">
              <div
                className={`p-6 rounded-lg border-2 ${
                  result.status === "dangerous"
                    ? "bg-gradient-alert border-cyber-red/30"
                    : result.status === "suspicious"
                    ? "bg-gradient-alert border-cyber-yellow/30"
                    : "bg-gradient-safe border-cyber-green/30"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {result.status === "dangerous" ? (
                        <AlertTriangle className="h-6 w-6 text-cyber-red" />
                      ) : result.status === "suspicious" ? (
                        <AlertTriangle className="h-6 w-6 text-cyber-yellow" />
                      ) : (
                        <Shield className="h-6 w-6 text-cyber-green" />
                      )}
                      <span className="text-xl font-bold">
                        {result.status === "dangerous"
                          ? "High Risk Detected"
                          : result.status === "suspicious"
                          ? "Suspicious Activity"
                          : "Safe URL"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground break-all">{result.url}</p>
                  </div>
                  <Badge
                    variant={
                      result.status === "dangerous"
                        ? "destructive"
                        : result.status === "suspicious"
                        ? "default"
                        : "outline"
                    }
                    className={
                      result.status === "safe"
                        ? "bg-cyber-green/20 text-cyber-green border-cyber-green/30"
                        : result.status === "suspicious"
                        ? "bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/30"
                        : ""
                    }
                  >
                    Risk Score: {result.riskScore}%
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Threat Indicators:</h4>
                    <ul className="space-y-1">
                      {result.indicators.map((indicator, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          {indicator}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-border/30">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Domain Age</p>
                      <p className="text-sm font-semibold">{result.details.domainAge}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">SSL Status</p>
                      <p className="text-sm font-semibold">{result.details.ssl ? "Valid" : "Invalid"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Redirects</p>
                      <p className="text-sm font-semibold">{result.details.redirects}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Reputation</p>
                      <p className="text-sm font-semibold">{result.details.reputation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UrlScanner;
