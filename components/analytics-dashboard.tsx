"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

const crimeByMonth = [
  { month: "Jan", crimes: 45, year2023: 52 },
  { month: "Feb", crimes: 38, year2023: 48 },
  { month: "Mar", crimes: 52, year2023: 55 },
  { month: "Apr", crimes: 61, year2023: 58 },
  { month: "May", crimes: 48, year2023: 62 },
  { month: "Jun", crimes: 67, year2023: 70 },
]

const crimeByType = [
  { type: "Theft", value: 35 },
  { type: "Assault", value: 25 },
  { type: "Robbery", value: 18 },
  { type: "Burglary", value: 14 },
  { type: "Cybercrime", value: 8 },
]

const crimeByHour = [
  { hour: "12 AM", crimes: 5 },
  { hour: "1 AM", crimes: 3 },
  { hour: "2 AM", crimes: 2 },
  { hour: "3 AM", crimes: 1 },
  { hour: "4 AM", crimes: 2 },
  { hour: "5 AM", crimes: 4 },
  { hour: "6 AM", crimes: 8 },
  { hour: "7 AM", crimes: 12 },
  { hour: "8 AM", crimes: 18 },
  { hour: "9 AM", crimes: 14 },
  { hour: "10 AM", crimes: 11 },
  { hour: "11 AM", crimes: 9 },
  { hour: "12 PM", crimes: 13 },
  { hour: "1 PM", crimes: 11 },
  { hour: "2 PM", crimes: 8 },
  { hour: "3 PM", crimes: 10 },
  { hour: "4 PM", crimes: 12 },
  { hour: "5 PM", crimes: 16 },
  { hour: "6 PM", crimes: 20 },
  { hour: "7 PM", crimes: 25 },
  { hour: "8 PM", crimes: 28 },
  { hour: "9 PM", crimes: 24 },
  { hour: "10 PM", crimes: 18 },
  { hour: "11 PM", crimes: 10 },
]

const geographicData = [
  { area: "MG Road", crimes: 45, safetyScore: 35 },
  { area: "Brigade Road", crimes: 38, safetyScore: 42 },
  { area: "Koramangala", crimes: 52, safetyScore: 38 },
  { area: "Indiranagar", crimes: 28, safetyScore: 62 },
  { area: "Whitefield", crimes: 15, safetyScore: 75 },
  { area: "Yelahanka", crimes: 22, safetyScore: 68 },
  { area: "Jayanagar", crimes: 32, safetyScore: 55 },
  { area: "Bellandur", crimes: 41, safetyScore: 45 },
]

const weeklyData = [
  { day: "Mon", incidents: 18, reported: 14 },
  { day: "Tue", incidents: 22, reported: 18 },
  { day: "Wed", incidents: 25, reported: 20 },
  { day: "Thu", incidents: 20, reported: 16 },
  { day: "Fri", incidents: 28, reported: 23 },
  { day: "Sat", incidents: 32, reported: 26 },
  { day: "Sun", incidents: 26, reported: 21 },
]

const COLORS = ["#ff4444", "#ffaa00", "#44ff44", "#0066ff", "#aa00ff"]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Crime Analytics & Trends</h2>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-accent bg-opacity-10 p-4 rounded">
            <div className="text-3xl font-bold text-accent">187</div>
            <div className="text-sm opacity-75">Crimes This Month</div>
          </div>
          <div className="bg-destructive bg-opacity-10 p-4 rounded">
            <div className="text-3xl font-bold text-destructive">23%</div>
            <div className="text-sm opacity-75">Increase YoY</div>
          </div>
          <div className="bg-secondary bg-opacity-10 p-4 rounded">
            <div className="text-3xl font-bold text-secondary">Theft</div>
            <div className="text-sm opacity-75">Most Common Type</div>
          </div>
          <div className="bg-primary bg-opacity-10 p-4 rounded">
            <div className="text-3xl font-bold text-primary">6.2k</div>
            <div className="text-sm opacity-75">YTD Incidents</div>
          </div>
        </div>

        <Tabs defaultValue="trends" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trends">Monthly Trends</TabsTrigger>
            <TabsTrigger value="hourly">Hourly Pattern</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Activity</TabsTrigger>
            <TabsTrigger value="geographic">Hotspots</TabsTrigger>
          </TabsList>

          {/* Monthly Trends Tab */}
          <TabsContent value="trends" className="space-y-4">
            <div>
              <h3 className="font-semibold mb-4">Crime Trend (2024 vs 2023)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={crimeByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="crimes" stroke="#ff4444" name="2024" strokeWidth={2} />
                  <Line type="monotone" dataKey="year2023" stroke="#0066ff" name="2023" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Crime Type Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Crimes by Type</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={crimeByType}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0066ff" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={crimeByType}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ type, value }) => `${type}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {crimeByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hourly" className="space-y-4">
            <div>
              <h3 className="font-semibold mb-4">Peak Crime Hours (24-Hour Pattern)</h3>
              <p className="text-sm opacity-75 mb-4">Identify high-risk times for better safety planning</p>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={crimeByHour}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="hour" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="crimes"
                    stroke="#ff4444"
                    fill="#ff4444"
                    fillOpacity={0.3}
                    name="Incidents"
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 p-3 bg-destructive bg-opacity-10 rounded">
                <p className="text-sm font-semibold">Peak Hours: 7-9 PM (25-28 incidents)</p>
                <p className="text-xs opacity-75">Highest crime activity typically occurs during evening hours</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <div>
              <h3 className="font-semibold mb-4">Weekly Activity & Reporting Rate</h3>
              <p className="text-sm opacity-75 mb-4">Comparison of incidents vs. reported cases by day</p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="incidents" fill="#ff4444" name="Total Incidents" />
                  <Bar dataKey="reported" fill="#0066ff" name="Reported Cases" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 bg-secondary bg-opacity-10 rounded">
                  <p className="text-sm font-semibold">Highest Activity: Saturday</p>
                  <p className="text-xs opacity-75">32 incidents recorded</p>
                </div>
                <div className="p-3 bg-primary bg-opacity-10 rounded">
                  <p className="text-sm font-semibold">Reporting Rate: 80%</p>
                  <p className="text-xs opacity-75">Cases officially reported to police</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="geographic" className="space-y-4">
            <div>
              <h3 className="font-semibold mb-4">Crime Hotspots & Safety Zones</h3>
              <p className="text-sm opacity-75 mb-4">Areas with highest crime rates and safety scores</p>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={geographicData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis type="number" />
                  <YAxis dataKey="area" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="crimes" fill="#ff4444" name="Crime Incidents" />
                  <Bar dataKey="safetyScore" fill="#44ff44" name="Safety Score" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                <div className="p-3 bg-destructive bg-opacity-10 rounded">
                  <p className="text-sm font-semibold">High Risk: Koramangala (52 incidents)</p>
                </div>
                <div className="p-3 bg-secondary bg-opacity-10 rounded">
                  <p className="text-sm font-semibold">Safest Area: Whitefield (15 incidents, 75 safety score)</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
