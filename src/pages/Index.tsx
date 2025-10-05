import { useState } from "react";
import { Shield, AlertTriangle, CheckCircle2, Activity } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UrlScanner from "@/components/UrlScanner";
import ThreatDashboard from "@/components/ThreatDashboard";
import ContentAnalyzer from "@/components/ContentAnalyzer";
import ThreatFeed from "@/components/ThreatFeed";
import EducationModule from "@/components/EducationModule";

const Index = () => {
  const [activeTab, setActiveTab] = useState("scanner");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Shield className="h-8 w-8 text-primary" />
                <div className="absolute inset-0 animate-pulse-slow">
                  <Shield className="h-8 w-8 text-primary/30" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-cyber-blue-glow to-cyber-purple bg-clip-text text-transparent">
                  PhishGuard AI
                </h1>
                <p className="text-xs text-muted-foreground">Advanced Phishing Detection Framework</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-safe border border-cyber-green/20">
                <Activity className="h-4 w-4 text-cyber-green animate-pulse" />
                <span className="text-sm font-medium text-cyber-green">System Active</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid bg-card border border-border">
            <TabsTrigger value="scanner" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="h-4 w-4 mr-2" />
              URL Scanner
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Activity className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="analyzer" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Content Analyzer
            </TabsTrigger>
            <TabsTrigger value="feed" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Activity className="h-4 w-4 mr-2" />
              Threat Feed
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Education
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scanner" className="space-y-6">
            <UrlScanner />
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <ThreatDashboard />
          </TabsContent>

          <TabsContent value="analyzer" className="space-y-6">
            <ContentAnalyzer />
          </TabsContent>

          <TabsContent value="feed" className="space-y-6">
            <ThreatFeed />
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <EducationModule />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>PhishGuard AI - Real-time Phishing Detection Framework</p>
            <p className="mt-1 text-xs">Powered by Advanced ML/DL & NLP Technologies</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
