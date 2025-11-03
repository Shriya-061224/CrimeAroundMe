"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { CrimeMap } from "@/components/crime-map"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { RealTimeIncidentFeed } from "@/components/incident-feed"
import { SOSPanel } from "@/components/sos-panel"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, Map, BarChart3, Bell } from "lucide-react"
import { AuthModal } from "@/components/auth-modal"
import { CrimeReportForm } from "@/components/crime-report-form"
import { AISafetyAssistant } from "@/components/ai-safety-assistant"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"map" | "analytics" | "feed" | "report" | "ai">("map")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [language, setLanguage] = useState<"en" | "kn" | "ta">("en")
  const [authOpen, setAuthOpen] = useState(false)
  const [user, setUser] = useState<{ id: string; email: string; name: string } | null>(null)

  useEffect(() => {
    // Get user's GPS location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Geolocation error:", error)
          // Default to Bangalore if geolocation fails
          setUserLocation({ lat: 12.9716, lng: 77.5946 })
        },
      )
    }
  }, [])

  const translations = {
    en: {
      title: "CrimeAroundMe",
      subtitle: "Real-Time Crime Awareness & Safety Platform",
      map: "Crime Map",
      analytics: "Analytics",
      feed: "Live Feed",
      report: "Report Crime",
      ai: "AI Safety",
      emergency: "Emergency",
    },
    kn: {
      title: "ಕ್ರೈಮ್ ಅರೌಂಡ್ಮೆ",
      subtitle: "ನೈಜ-ಸಮಯದ ಅಪರಾಧ ಜಾಗರೂಕತೆ",
      map: "ಅಪರಾಧ ನಕ್ಷೆ",
      analytics: "ವಿಶ್ಲೇಷಣ",
      feed: "ನೇರ ಫೀಡ್",
      report: "ಅಪರಾಧ ವರದಿ",
      ai: "AI ಸುರಕ್ಷೆ",
      emergency: "ತುರ್ತು",
    },
    ta: {
      title: "குற்றங்களைச் சுற்றியே",
      subtitle: "நிஜ-நேர குற்ற விழிப்புணர்வு",
      map: "குற்ற வரைபடம்",
      analytics: "பிளாக்",
      feed: "நேரடி ஊட்டம்",
      report: "குற்றம் பதிவு",
      ai: "AI பாதுகாப்பு",
      emergency: "அவசரம்",
    },
  }

  const t = translations[language]

  return (
    <main className="min-h-screen bg-background">
      <Navigation language={language} setLanguage={setLanguage} userId={user?.id} />

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} onAuthenticated={setUser} />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-8 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">{t.title}</h1>
            <p className="text-lg opacity-90">{t.subtitle}</p>
            <p className="text-sm mt-2 opacity-75">Know what's happening around you — before it affects you.</p>
          </div>
          {!user ? (
            <Button onClick={() => setAuthOpen(true)} className="bg-white text-primary hover:bg-gray-100">
              Login / Sign Up
            </Button>
          ) : (
            <div className="text-right">
              <p className="text-sm opacity-90">Welcome, {user.name}!</p>
              <Button
                variant="ghost"
                onClick={() => setUser(null)}
                className="text-white hover:bg-white hover:bg-opacity-20 mt-2"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <Button
            onClick={() => setActiveTab("map")}
            variant={activeTab === "map" ? "default" : "outline"}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Map size={16} /> {t.map}
          </Button>
          <Button
            onClick={() => setActiveTab("analytics")}
            variant={activeTab === "analytics" ? "default" : "outline"}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <BarChart3 size={16} /> {t.analytics}
          </Button>
          <Button
            onClick={() => setActiveTab("feed")}
            variant={activeTab === "feed" ? "default" : "outline"}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Bell size={16} /> {t.feed}
          </Button>
          <Button
            onClick={() => setActiveTab("report")}
            variant={activeTab === "report" ? "default" : "outline"}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <AlertCircle size={16} /> {t.report}
          </Button>
          <Button
            onClick={() => setActiveTab("ai")}
            variant={activeTab === "ai" ? "default" : "outline"}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            ✨ {t.ai}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {activeTab === "map" && userLocation && <CrimeMap userLocation={userLocation} />}
            {activeTab === "analytics" && <AnalyticsDashboard />}
            {activeTab === "feed" && <RealTimeIncidentFeed />}
            {activeTab === "report" &&
              (user ? (
                <CrimeReportForm userEmail={user.email} />
              ) : (
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Report a Crime</h2>
                  <p className="text-sm opacity-75 mb-4">You must be logged in to submit a crime report.</p>
                  <Button onClick={() => setAuthOpen(true)}>Login to Report</Button>
                </Card>
              ))}
            {activeTab === "ai" && <AISafetyAssistant userLocation={userLocation || undefined} />}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            <SOSPanel language={language} />
          </div>
        </div>
      </div>
    </main>
  )
}
