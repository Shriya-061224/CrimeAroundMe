"use client"

import { Button } from "@/components/ui/button"
import { NotificationCenter } from "@/components/notification-center"

interface NavigationProps {
  language: "en" | "kn" | "ta"
  setLanguage: (lang: "en" | "kn" | "ta") => void
  userId?: string
}

export function Navigation({ language, setLanguage, userId }: NavigationProps) {
  return (
    <nav className="bg-sidebar text-sidebar-foreground border-b border-sidebar-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-sidebar-primary">CrimeAroundMe</h1>
          <p className="text-xs opacity-75">Safety Intelligence Platform</p>
        </div>
        <div className="flex items-center gap-2">
          <NotificationCenter userId={userId} />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage("en")}
            className={language === "en" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
          >
            EN
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage("kn")}
            className={language === "kn" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
          >
            ಕನ್ನಡ
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage("ta")}
            className={language === "ta" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
          >
            தமிழ்
          </Button>
        </div>
      </div>
    </nav>
  )
}
