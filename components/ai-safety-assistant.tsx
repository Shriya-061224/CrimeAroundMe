"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Lightbulb, Shield } from "lucide-react"

interface AISafetyAssistantProps {
  userLocation?: { lat: number; lng: number }
}

export function AISafetyAssistant({ userLocation }: AISafetyAssistantProps) {
  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">("medium")

  // Simulated AI predictions based on location and time
  const aiInsights = {
    riskAssessment: {
      level: "high",
      score: 72,
      factors: [
        "7:30 PM - Peak crime hours",
        "MG Road - Known hotspot for theft",
        "Friday night - Weekend activity increase",
      ],
      recommendation: "Avoid MG Road between 7-9 PM. Use alternative routes.",
    },
    safetyTips: [
      "Travel in groups during evening hours",
      "Keep valuables out of sight",
      "Stay alert in crowded areas",
      "Share your location with trusted contacts",
      "Keep emergency numbers saved",
    ],
    predictedCrimes: [
      {
        type: "Theft",
        probability: 35,
        preventions: ["Keep phone secure", "Don't carry large amounts of cash"],
      },
      {
        type: "Harassment",
        probability: 18,
        preventions: ["Avoid isolated areas", "Stay with others"],
      },
      {
        type: "Robbery",
        probability: 12,
        preventions: ["Don't resist", "Report to police immediately"],
      },
    ],
    safeRoutes: [
      {
        name: "Route via Indiranagar",
        safety: 85,
        duration: "25 mins",
        description: "Safer neighborhood with better lighting",
      },
      {
        name: "Route via Whitefield",
        safety: 90,
        duration: "32 mins",
        description: "Safest route with commercial areas",
      },
    ],
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Lightbulb size={24} className="text-accent" />
            AI Safety Assistant
          </h2>
          <p className="text-sm opacity-75">Personalized safety insights powered by machine learning</p>
        </div>

        <Tabs defaultValue="risk" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="risk" className="text-xs">
              Risk Level
            </TabsTrigger>
            <TabsTrigger value="tips" className="text-xs">
              Safety Tips
            </TabsTrigger>
            <TabsTrigger value="crimes" className="text-xs">
              Predictions
            </TabsTrigger>
            <TabsTrigger value="routes" className="text-xs">
              Safe Routes
            </TabsTrigger>
          </TabsList>

          {/* Risk Assessment Tab */}
          <TabsContent value="risk" className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 bg-destructive bg-opacity-10 rounded border border-destructive border-opacity-30">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <AlertCircle size={20} className="text-destructive" />
                    Current Risk Level
                  </h3>
                  <span className="text-2xl font-bold text-destructive">HIGH</span>
                </div>
                <div className="w-full bg-border rounded-full h-2 mb-3">
                  <div className="bg-destructive h-2 rounded-full" style={{ width: "72%" }} />
                </div>
                <p className="text-sm opacity-75">Risk Score: 72/100</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Risk Factors:</h4>
                {aiInsights.riskAssessment.factors.map((factor, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 bg-muted rounded">
                    <span className="text-destructive font-bold text-xs mt-1">•</span>
                    <span className="text-sm">{factor}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-accent bg-opacity-10 rounded">
                <p className="text-sm font-semibold mb-1">AI Recommendation:</p>
                <p className="text-sm opacity-75">{aiInsights.riskAssessment.recommendation}</p>
              </div>
            </div>
          </TabsContent>

          {/* Safety Tips Tab */}
          <TabsContent value="tips" className="space-y-3">
            {aiInsights.safetyTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-muted rounded">
                <Shield size={16} className="text-secondary flex-shrink-0 mt-1" />
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </TabsContent>

          {/* Crime Predictions Tab */}
          <TabsContent value="crimes" className="space-y-3">
            <p className="text-xs opacity-75 mb-3">AI-predicted crime probabilities in your area</p>
            {aiInsights.predictedCrimes.map((crime, i) => (
              <div key={i} className="p-4 border border-border rounded">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-sm">{crime.type}</h4>
                  <span className="text-sm font-bold text-destructive">{crime.probability}%</span>
                </div>
                <div className="w-full bg-border rounded-full h-1.5 mb-3">
                  <div className="bg-destructive h-1.5 rounded-full" style={{ width: `${crime.probability}%` }} />
                </div>
                <div className="text-xs opacity-75 space-y-1">
                  {crime.preventions.map((p, j) => (
                    <p key={j}>• {p}</p>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Safe Routes Tab */}
          <TabsContent value="routes" className="space-y-3">
            <p className="text-xs opacity-75 mb-3">AI-recommended safer routes to your destination</p>
            {aiInsights.safeRoutes.map((route, i) => (
              <div key={i} className="p-4 border border-secondary border-opacity-50 bg-secondary bg-opacity-5 rounded">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm">{route.name}</h4>
                  <div className="text-right">
                    <p className="text-xs font-bold text-secondary">{route.safety}%</p>
                    <p className="text-xs opacity-75">Safety Score</p>
                  </div>
                </div>
                <p className="text-xs opacity-75 mb-2">{route.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs opacity-50">⏱ {route.duration}</span>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    View Route
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  )
}
