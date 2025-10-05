import { Activity, AlertTriangle, Shield, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const threatData = [
  { time: "00:00", threats: 45, blocked: 42, flagged: 3 },
  { time: "04:00", threats: 32, blocked: 30, flagged: 2 },
  { time: "08:00", threats: 78, blocked: 71, flagged: 7 },
  { time: "12:00", threats: 95, blocked: 88, flagged: 7 },
  { time: "16:00", threats: 67, blocked: 63, flagged: 4 },
  { time: "20:00", threats: 54, blocked: 51, flagged: 3 },
];

const categoryData = [
  { name: "Credential Phishing", value: 35, color: "hsl(0 84% 60%)" },
  { name: "Malware Distribution", value: 25, color: "hsl(45 93% 47%)" },
  { name: "Brand Impersonation", value: 20, color: "hsl(189 94% 43%)" },
  { name: "Social Engineering", value: 15, color: "hsl(271 76% 53%)" },
  { name: "Other", value: 5, color: "hsl(215 20% 65%)" },
];

const vectorData = [
  { vector: "Email", count: 145 },
  { vector: "SMS", count: 78 },
  { vector: "Messaging", count: 52 },
  { vector: "Social Media", count: 34 },
  { vector: "Web", count: 62 },
];

const ThreatDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-primary/20 bg-gradient-cyber">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Threats Detected</CardTitle>
            <AlertTriangle className="h-4 w-4 text-cyber-red" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">371</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-cyber-red">+12%</span> from last 24h
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-gradient-safe">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Threats Blocked</CardTitle>
            <Shield className="h-4 w-4 text-cyber-green" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyber-green">345</div>
            <p className="text-xs text-muted-foreground mt-1">
              93% success rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-gradient-alert">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Flagged for Review</CardTitle>
            <Activity className="h-4 w-4 text-cyber-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyber-yellow">26</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting manual review
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-gradient-cyber">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Detection Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">98.7%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-cyber-green">+2.1%</span> improvement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Threat Activity (24h)</CardTitle>
            <CardDescription>Real-time threat detection and blocking metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={threatData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 22%)" />
                <XAxis dataKey="time" stroke="hsl(215 20% 65%)" />
                <YAxis stroke="hsl(215 20% 65%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(217 33% 17%)",
                    border: "1px solid hsl(217 33% 22%)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="threats"
                  stackId="1"
                  stroke="hsl(0 84% 60%)"
                  fill="hsl(0 84% 60% / 0.3)"
                  name="Total Threats"
                />
                <Area
                  type="monotone"
                  dataKey="blocked"
                  stackId="2"
                  stroke="hsl(142 76% 36%)"
                  fill="hsl(142 76% 36% / 0.3)"
                  name="Blocked"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Attack Vectors</CardTitle>
            <CardDescription>Distribution by communication channel</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vectorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 22%)" />
                <XAxis dataKey="vector" stroke="hsl(215 20% 65%)" />
                <YAxis stroke="hsl(215 20% 65%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(217 33% 17%)",
                    border: "1px solid hsl(217 33% 22%)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="hsl(189 94% 43%)" name="Threats Detected" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-primary/20 lg:col-span-2">
          <CardHeader>
            <CardTitle>Threat Categories</CardTitle>
            <CardDescription>Classification of detected phishing attempts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(217 33% 17%)",
                      border: "1px solid hsl(217 33% 22%)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {categoryData.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: category.color }}></div>
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{category.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThreatDashboard;
