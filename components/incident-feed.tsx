"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, AlertTriangle, Info } from "lucide-react"

interface Incident {
  id: string
  type: string
  description: string
  date: string
  severity: "low" | "medium" | "high"
  verified: boolean
  source: string
}

export function RealTimeIncidentFeed() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSource, setSelectedSource] = useState<"all" | "crimeometer" | "fbi">("all")

  useEffect(() => {
    const fetchIncidents = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/crimes?lat=12.9716&lng=77.5946&radius=10&source=${selectedSource}`)

        if (!response.ok) {
          throw new Error("Failed to fetch incidents")
        }

        const data = await response.json()

        // Transform API response to match Incident interface
        const formattedIncidents = (data || []).map((crime: any) => ({
          id: crime.id,
          type: crime.type,
          description: crime.description,
          date: new Date(crime.date).toLocaleString(),
          severity: crime.severity || "medium",
          verified: crime.verified !== false,
          source: crime.source === "fbi-ucr" ? "FBI UCR" : "Crimeometer",
        }))

        setIncidents(formattedIncidents)
        console.log("[v0] Fetched", formattedIncidents.length, "incidents from API")
      } catch (err) {
        console.error("[v0] Error fetching incidents:", err)
        setError("Failed to load incidents. Please try again.")

        // Fallback to sample data on error
        setIncidents([
          {
            id: "sample-1",
            type: "Street Robbery",
            description: "Mobile phone and wallet stolen at gunpoint",
            date: new Date().toLocaleString(),
            severity: "high",
            verified: true,
            source: "Crimeometer",
          },
          {
            id: "sample-2",
            type: "Cybercrime",
            description: "Credit card fraud reported by multiple users",
            date: new Date(Date.now() - 15 * 60 * 1000).toLocaleString(),
            severity: "high",
            verified: true,
            source: "FBI UCR",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchIncidents()

    // Refresh data every 5 minutes
    const interval = setInterval(fetchIncidents, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [selectedSource])

  const severityIcons = {
    high: <AlertTriangle className="text-destructive" size={20} />,
    medium: <Bell className="text-accent" size={20} />,
    low: <Info className="text-muted-foreground" size={20} />,
  }

  const severityBadgeVariants = {
    high: "destructive",
    medium: "secondary",
    low: "outline",
  } as const

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Real-Time Incident Feed</h2>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSelectedSource("all")}
          className={`px-3 py-1 rounded text-sm ${
            selectedSource === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          All Sources
        </button>
        <button
          onClick={() => setSelectedSource("crimeometer")}
          className={`px-3 py-1 rounded text-sm ${
            selectedSource === "crimeometer"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Crimeometer
        </button>
        <button
          onClick={() => setSelectedSource("fbi")}
          className={`px-3 py-1 rounded text-sm ${
            selectedSource === "fbi"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          FBI Data
        </button>
      </div>

      {error && <div className="bg-destructive/10 text-destructive p-3 rounded mb-4">{error}</div>}

      {loading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading incidents...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {incidents.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No incidents found</p>
          ) : (
            incidents.map((incident) => (
              <div key={incident.id} className="border border-border rounded p-4 hover:bg-muted transition-colors">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{severityIcons[incident.severity]}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold capitalize">{incident.type}</h3>
                      <div className="flex gap-2">
                        <Badge variant={severityBadgeVariants[incident.severity]} className="capitalize">
                          {incident.severity}
                        </Badge>
                        {incident.verified && (
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Verified
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {incident.source}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm mb-2">{incident.description}</p>
                    <p className="text-xs opacity-50">{incident.date}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </Card>
  )
}
