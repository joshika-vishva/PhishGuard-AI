import { BookOpen, CheckCircle2, AlertTriangle, Mail, Link as LinkIcon, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const EducationModule = () => {
  const phishingExamples = [
    {
      title: "Urgent Account Verification",
      email: "From: security@paypa1-verify.com\nSubject: URGENT: Verify Your Account Now!\n\nDear Valued Customer,\n\nYour PayPal account has been suspended due to suspicious activity. Click here immediately to verify your identity or your account will be permanently closed within 24 hours.\n\nVerify Now: http://paypa1-secure.tk/login",
      indicators: [
        "Misspelled domain (paypa1 instead of paypal)",
        "Creates false urgency",
        "Threatens account closure",
        "Suspicious link with .tk TLD",
        "Generic greeting instead of your name",
      ],
      safe: false,
    },
    {
      title: "Legitimate Company Email",
      email: "From: notifications@amazon.com\nSubject: Your Order #123-4567890 Has Shipped\n\nHi John Smith,\n\nYour order has been shipped and will arrive on Friday, Dec 15.\n\nView your order: amazon.com/orders\n\nThank you for shopping with Amazon!",
      indicators: [
        "Legitimate amazon.com domain",
        "Personalized greeting with your name",
        "No urgent action required",
        "Clean, professional URL",
        "Specific order information",
      ],
      safe: true,
    },
  ];

  const redFlags = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Suspicious Sender",
      description: "Check for misspelled domains, generic email addresses, or mismatched sender information",
      examples: ["paypa1@gmail.com", "noreply@secure-bank.tk", "admin@company.co.uk.net"],
    },
    {
      icon: <LinkIcon className="h-5 w-5" />,
      title: "Malicious Links",
      description: "Hover over links to preview the actual URL. Look for IP addresses, misspellings, or unusual domains",
      examples: ["http://192.168.1.1/login", "https://micr0soft.com", "bit.ly/abc123"],
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "Urgency & Threats",
      description: "Phishing emails create panic to bypass rational thinking",
      examples: ["Act now or lose access!", "Verify within 24 hours", "Immediate action required"],
    },
    {
      icon: <User className="h-5 w-5" />,
      title: "Generic Greetings",
      description: "Legitimate companies usually address you by name",
      examples: ["Dear Customer", "Valued User", "Account Holder"],
    },
  ];

  const bestPractices = [
    {
      category: "Email Safety",
      practices: [
        "Never click links in unexpected emails",
        "Verify sender email addresses carefully",
        "Enable two-factor authentication (2FA)",
        "Use unique passwords for each account",
        "Report suspicious emails to IT security",
      ],
    },
    {
      category: "URL Verification",
      practices: [
        "Manually type important URLs instead of clicking links",
        "Check for HTTPS and valid SSL certificates",
        "Look for misspellings in domain names",
        "Be cautious of shortened URLs (bit.ly, tinyurl)",
        "Verify the actual domain, not just the display text",
      ],
    },
    {
      category: "Information Protection",
      practices: [
        "Never share passwords via email or chat",
        "Legitimate companies won't ask for sensitive info via email",
        "Use password managers for secure storage",
        "Regularly update security software",
        "Be suspicious of unexpected attachments",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-gradient-cyber">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <BookOpen className="h-6 w-6 text-primary" />
            Phishing Awareness Training
          </CardTitle>
          <CardDescription className="text-foreground/70">
            Learn to identify and protect yourself from phishing attacks
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Red Flags Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Common Phishing Red Flags</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {redFlags.map((flag, index) => (
            <Card key={index} className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">{flag.icon}</div>
                  {flag.title}
                </CardTitle>
                <CardDescription>{flag.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Examples:</p>
                  {flag.examples.map((example, i) => (
                    <div key={i} className="p-2 rounded bg-destructive/10 border border-destructive/20">
                      <code className="text-xs text-destructive">{example}</code>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Example Emails */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Example Analysis</h3>
        <div className="grid grid-cols-1 gap-6">
          {phishingExamples.map((example, index) => (
            <Card
              key={index}
              className={`border-2 ${
                example.safe
                  ? "border-cyber-green/30 bg-gradient-safe"
                  : "border-cyber-red/30 bg-gradient-alert"
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{example.title}</CardTitle>
                  <Badge
                    variant={example.safe ? "outline" : "destructive"}
                    className={example.safe ? "bg-cyber-green/20 text-cyber-green border-cyber-green/30" : ""}
                  >
                    {example.safe ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Safe
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Phishing
                      </>
                    )}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-background/50 border border-border font-mono text-xs whitespace-pre-wrap">
                  {example.email}
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Key Indicators:</h4>
                  <ul className="space-y-1">
                    {example.indicators.map((indicator, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        {example.safe ? (
                          <CheckCircle2 className="h-4 w-4 text-cyber-green mt-0.5 flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-cyber-red mt-0.5 flex-shrink-0" />
                        )}
                        {indicator}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Best Practices */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Security Best Practices</h3>
        <Accordion type="single" collapsible className="w-full">
          {bestPractices.map((section, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                {section.category}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pt-2">
                  {section.practices.map((practice, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{practice}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Quick Tips */}
      <Card className="border-primary/20 bg-gradient-cyber">
        <CardHeader>
          <CardTitle>Quick Security Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-card/50 border border-border">
              <h4 className="font-semibold text-cyber-green mb-2">✓ DO</h4>
              <ul className="space-y-1 text-sm">
                <li>• Verify sender identity independently</li>
                <li>• Use strong, unique passwords</li>
                <li>• Enable 2FA on all accounts</li>
                <li>• Keep software updated</li>
                <li>• Report suspicious emails</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border">
              <h4 className="font-semibold text-cyber-red mb-2">✗ DON'T</h4>
              <ul className="space-y-1 text-sm">
                <li>• Click suspicious links</li>
                <li>• Share passwords via email</li>
                <li>• Trust urgent requests</li>
                <li>• Download unexpected attachments</li>
                <li>• Ignore security warnings</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducationModule;
