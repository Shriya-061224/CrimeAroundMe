"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CrimeMapProps {
  userLocation: { lat: number; lng: number }
}

interface Crime {
  id: string
  lat: number
  lng: number
  type: string
  description: string
  date: string
  severity: "low" | "medium" | "high"
}

export function CrimeMap({ userLocation }: CrimeMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [crimes, setCrimes] = useState<Crime[]>([])
  const [selectedType, setSelectedType] = useState<string>("all")
  const [radius, setRadius] = useState(5)
  const [hoveredCrime, setHoveredCrime] = useState<string | null>(null)

  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        console.log("[v0] Fetching crime data from API")
        const response = await fetch(`/api/crimes?lat=${userLocation.lat}&lng=${userLocation.lng}&radius=${radius}`)
        const data = await response.json()
        console.log("[v0] Crime data received:", data.length, "crimes")
        setCrimes(data)
      } catch (error) {
        console.error("[v0] Failed to fetch crimes:", error)
        // Fallback to mock data on error
        const mockCrimes: Crime[] = [
          {
            id: "1",
            lat: userLocation.lat + 0.01,
            lng: userLocation.lng + 0.01,
            type: "theft",
            description: "Mobile phone theft",
            date: new Date().toLocaleDateString(),
            severity: "medium",
          },
          {
            id: "2",
            lat: userLocation.lat - 0.01,
            lng: userLocation.lng - 0.01,
            type: "assault",
            description: "Street assault",
            date: new Date().toLocaleDateString(),
            severity: "high",
          },
        ]
        setCrimes(mockCrimes)
      }
    }

    fetchCrimes()
  }, [userLocation, radius])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = "#1e293b"
    ctx.lineWidth = 1
    const gridSize = 40
    for (let i = 0; i <= width; i += gridSize) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height)
      ctx.stroke()
    }
    for (let i = 0; i <= height; i += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(width, i)
      ctx.stroke()
    }

    // Conversion function from lat/lng to canvas coordinates
    const latLngToCanvas = (lat: number, lng: number) => {
      const centerLat = userLocation.lat
      const centerLng = userLocation.lng

      // Scale factor for visualization
      const scale = 50 / radius

      const x = width / 2 + (lng - centerLng) * scale * 100
      const y = height / 2 - (lat - centerLat) * scale * 100

      return { x, y }
    }

    // Draw radius circle
    const center = latLngToCanvas(userLocation.lat, userLocation.lng)
    ctx.strokeStyle = "#0066ff"
    ctx.lineWidth = 2
    ctx.globalAlpha = 0.3
    ctx.beginPath()
    ctx.arc(center.x, center.y, (radius * 50) / radius, 0, Math.PI * 2)
    ctx.stroke()
    ctx.globalAlpha = 1

    // Draw user location
    ctx.fillStyle = "#0066ff"
    ctx.beginPath()
    ctx.arc(center.x, center.y, 8, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "#ffffff"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("You", center.x, center.y - 15)

    // Draw crimes
    crimes.forEach((crime) => {
      const crimePos = latLngToCanvas(crime.lat, crime.lng)

      // Draw crime marker
      const color = crime.severity === "high" ? "#ff4444" : crime.severity === "medium" ? "#ffaa00" : "#44ff44"

      // Highlight hovered crime
      const isHovered = hoveredCrime === crime.id
      const size = isHovered ? 12 : 8

      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(crimePos.x, crimePos.y, size, 0, Math.PI * 2)
      ctx.fill()

      if (isHovered) {
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.5
        ctx.beginPath()
        ctx.arc(crimePos.x, crimePos.y, size + 5, 0, Math.PI * 2)
        ctx.stroke()
        ctx.globalAlpha = 1
      }
    })
  }, [crimes, radius, userLocation, hoveredCrime])

  const crimeTypes = ["all", "theft", "assault", "cybercrime", "robbery", "burglary"]
  const severityColors = {
    high: "bg-destructive",
    medium: "bg-accent",
    low: "bg-secondary",
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const latLngToCanvas = (lat: number, lng: number) => {
      const centerLat = userLocation.lat
      const centerLng = userLocation.lng
      const scale = 50 / radius

      const canvasX = canvas.width / 2 + (lng - centerLng) * scale * 100
      const canvasY = canvas.height / 2 - (lat - centerLat) * scale * 100

      return { x: canvasX, y: canvasY }
    }

    // Check if hovering over any crime
    let found = false
    crimes.forEach((crime) => {
      const crimePos = latLngToCanvas(crime.lat, crime.lng)
      const distance = Math.sqrt(Math.pow(x - crimePos.x, 2) + Math.pow(y - crimePos.y, 2))

      if (distance < 15) {
        setHoveredCrime(crime.id)
        found = true
      }
    })

    if (!found) setHoveredCrime(null)
  }

  return (
    <Card className="p-4 space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-4">Crime Map - Last 7 Days</h2>

        {/* Filters */}
        <div className="space-y-4 mb-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">Crime Type</label>
            <div className="flex flex-wrap gap-2">
              {crimeTypes.map((type) => (
                <Button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  className="capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Radius: {radius} km</label>
            <input
              type="range"
              min="1"
              max="20"
              value={radius}
              onChange={(e) => setRadius(Number.parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Legend */}
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span>High Severity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span>Medium Severity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <span>Low Severity</span>
            </div>
          </div>
        </div>

        {/* Canvas Map */}
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          onMouseMove={handleCanvasMouseMove}
          onMouseLeave={() => setHoveredCrime(null)}
          className="w-full border border-border rounded bg-slate-950 cursor-crosshair"
        />
      </div>

      {/* Crime List */}
      <div className="space-y-2">
        <h3 className="font-semibold">Recent Incidents ({crimes.length})</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {crimes.map((crime) => (
            <div
              key={crime.id}
              onMouseEnter={() => setHoveredCrime(crime.id)}
              onMouseLeave={() => setHoveredCrime(null)}
              className={`p-3 rounded border cursor-pointer transition-all ${
                hoveredCrime === crime.id ? "ring-2 ring-primary" : ""
              } ${severityColors[crime.severity]} bg-opacity-10`}
            >
              <div className="font-semibold capitalize">{crime.type}</div>
              <div className="text-sm opacity-75">{crime.description}</div>
              <div className="text-xs opacity-50">{crime.date}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
