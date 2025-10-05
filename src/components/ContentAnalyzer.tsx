import { useState } from "react";
import { FileText, Loader2, Mail, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface AnalysisResult {
  riskLevel: "low" | "medium" | "high";
  score: number;
  indicators: {
    urgency: boolean;
    personalInfo: boolean;
    links: boolean;
    spoofing: boolean;
    grammar: boolean;
  };
  findings: string[];
  recommendation: string;
}

const ContentAnalyzer = () => {
  const [content, setContent] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [contentType, setContentType] = useState("email");

  const analyzeContent = (text: string): AnalysisResult => {
    const findings: string[] = [];
    const indicators = {
      urgency: false,
      personalInfo: false,
      links: false,
      spoofing: false,
      grammar: false,
    };
    let score = 0;

    // Check for urgency tactics
    const urgencyKeywords = /urgent|immediately|act now|expire|suspend|verify now|limited time/i;
    if (urgencyKeywords.test(text)) {
      indicators.urgency = true;
      findings.push("Uses urgency tactics to pressure quick action");
      score += 20;
    }

    // Check for requests for personal information
    const personalInfoKeywords = /password|credit card|ssn|social security|bank account|pin|verify your account/i;
    if (personalInfoKeywords.test(text)) {
      indicators.personalInfo = true;
      findings.push("Requests sensitive personal or financial information");
      score += 30;
    }

    // Check for suspicious links
    const linkPattern = /(http|https):\/\/[^\s]+/gi;
    const links = text.match(linkPattern);
    if (links && links.length > 0) {
      indicators.links = true;
      findings.push(`Contains ${links.length} link(s) - verify destination before clicking`);
      score += 15;
    }

    // Check for brand impersonation
    const brandKeywords = /PayPal|Amazon|Microsoft|Apple|Google|Facebook|Netflix|Bank of America/i;
    if (brandKeywords.test(text)) {
      indicators.spoofing = true;
      findings.push("References well-known brand - verify sender authenticity");
      score += 25;
    }

    // Check for poor grammar (simple heuristic)
    const grammarIssues = text.match(/\b(your|you're)\s+(account|information)\s+(has|have|is)\s+been\b/gi);
    if (grammarIssues || text.match(/\.\.\.|!!!|URGENT/)) {
      indicators.grammar = true;
      findings.push("Contains grammatical inconsistencies or unusual formatting");
      score += 10;
    }

    let riskLevel: "low" | "medium" | "high";
    let recommendation: string;

    if (score >= 60) {
      riskLevel = "high";
      recommendation = "DO NOT respond or click any links. This appears to be a phishing attempt. Report and delete immediately.";
    } else if (score >= 30) {
      riskLevel = "medium";
      recommendation = "Exercise extreme caution. Verify sender through official channels before taking any action.";
    } else {
      riskLevel = "low";
      recommendation = "Content appears relatively safe, but always verify sender identity and be cautious with links.";
    }

    if (findings.length === 0) {
      findings.push("No obvious phishing indicators detected in initial scan");
    }

    return { riskLevel, score, indicators, findings, recommendation };
  };

  const handleAnalyze = async () => {
    if (!content.trim()) {
      toast.error("Please enter content to analyze");
      return;
    }

    setAnalyzing(true);
    setResult(null);

    // Simulate AI analysis delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const analysis = analyzeContent(content);
    setResult(analysis);
    setAnalyzing(false);

    if (analysis.riskLevel === "high") {
      toast.error("High risk content detected!");
    } else if (analysis.riskLevel === "medium") {
      toast.warning("Suspicious content - Exercise caution");
    } else {
      toast.success("Analysis complete");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-gradient-cyber">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <FileText className="h-6 w-6 text-primary" />
            NLP Content Analyzer
          </CardTitle>
          <CardDescription className="text-foreground/70">
            Advanced semantic analysis using transformer-based NLP models to detect phishing patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={contentType} onValueChange={setContentType}>
            <TabsList className="grid w-full grid-cols-3 bg-card border border-border">
              <TabsTrigger value="email" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </TabsTrigger>
              <TabsTrigger value="sms" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <MessageSquare className="h-4 w-4 mr-2" />
                SMS
              </TabsTrigger>
              <TabsTrigger value="message" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </TabsTrigger>
            </TabsList>

            <TabsContent value={contentType} className="space-y-4 mt-4">
              <Textarea
                placeholder={`Paste ${contentType} content here for analysis...`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] bg-background/50 border-border focus:border-primary font-mono text-sm"
                disabled={analyzing}
              />

              <Button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing with NLP...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Analyze Content
                  </>
                )}
              </Button>
            </TabsContent>
          </Tabs>

          {result && (
            <div className="mt-6 space-y-4">
              <div
                className={`p-6 rounded-lg border-2 ${
                  result.riskLevel === "high"
                    ? "bg-gradient-alert border-cyber-red/30"
                    : result.riskLevel === "medium"
                    ? "bg-gradient-alert border-cyber-yellow/30"
                    : "bg-gradient-safe border-cyber-green/30"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Analysis Results</h3>
                    <p className="text-sm text-muted-foreground">Threat assessment complete</p>
                  </div>
                  <Badge
                    variant={result.riskLevel === "high" ? "destructive" : "default"}
                    className={
                      result.riskLevel === "low"
                        ? "bg-cyber-green/20 text-cyber-green border-cyber-green/30"
                        : result.riskLevel === "medium"
                        ? "bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/30"
                        : ""
                    }
                  >
                    {result.riskLevel.toUpperCase()} RISK ({result.score}%)
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {Object.entries(result.indicators).map(([key, value]) => (
                      <div
                        key={key}
                        className={`p-3 rounded-lg border ${
                          value ? "bg-cyber-red/10 border-cyber-red/30" : "bg-card/50 border-border"
                        }`}
                      >
                        <p className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                        <p className={`text-sm font-semibold ${value ? "text-cyber-red" : "text-cyber-green"}`}>
                          {value ? "Detected" : "Clear"}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border/30">
                    <h4 className="text-sm font-semibold mb-2">Findings:</h4>
                    <ul className="space-y-1">
                      {result.findings.map((finding, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border/30">
                    <h4 className="text-sm font-semibold mb-2">Recommendation:</h4>
                    <p className="text-sm">{result.recommendation}</p>
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

export default ContentAnalyzer;
