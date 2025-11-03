"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bell, X, AlertTriangle, Info, CheckCircle, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: string
  type: "alert" | "info" | "warning" | "success"
  title: string
  message: string
  time: string
  location?: string
  read: boolean
  actionUrl?: string
}

interface NotificationCenterProps {
  userId?: string
}

export function NotificationCenter({ userId }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [open, setOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  // Simulate real-time notifications
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "alert",
        title: "High Crime Alert",
        message: "Robbery reported on MG Road. Stay alert and avoid the area.",
        time: "2 minutes ago",
        location: "MG Road, Bangalore",
        read: false,
      },
      {
        id: "2",
        type: "warning",
        title: "Safety Tip",
        message: "Peak crime hours detected: 7-9 PM. Consider using alternative routes.",
        time: "15 minutes ago",
        read: false,
      },
      {
        id: "3",
        type: "info",
        title: "New Report Near You",
        message: "A cybercrime incident has been reported in your area.",
        time: "1 hour ago",
        location: "Koramangala, Bangalore",
        read: false,
      },
      {
        id: "4",
        type: "success",
        title: "Report Verified",
        message: "Your crime report has been verified and sent to authorities.",
        time: "3 hours ago",
        read: true,
      },
    ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((n) => !n.read).length)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
    setUnreadCount(Math.max(0, unreadCount - 1))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
    const notification = notifications.find((n) => n.id === id)
    if (notification && !notification.read) {
      setUnreadCount(Math.max(0, unreadCount - 1))
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="text-destructive" size={20} />
      case "warning":
        return <Zap className="text-accent" size={20} />
      case "success":
        return <CheckCircle className="text-secondary" size={20} />
      default:
        return <Info className="text-primary" size={20} />
    }
  }

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} className="relative">
        <Bell size={20} />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-destructive">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-background border border-border rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <h3 className="font-semibold">Notifications</h3>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X size={16} />
            </Button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center opacity-50">
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 border-b border-border hover:bg-muted transition-colors ${
                    !notif.read ? "bg-primary bg-opacity-5" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">{getIcon(notif.type)}</div>
                    <div className="flex-1 cursor-pointer" onClick={() => markAsRead(notif.id)}>
                      <h4 className="font-semibold text-sm">{notif.title}</h4>
                      <p className="text-xs opacity-75 mt-1">{notif.message}</p>
                      {notif.location && <p className="text-xs opacity-50 mt-1">📍 {notif.location}</p>}
                      <p className="text-xs opacity-50 mt-1">{notif.time}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteNotification(notif.id)}
                      className="flex-shrink-0"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-3 border-t border-border text-center">
            <Button variant="ghost" size="sm" className="text-xs">
              View All Notifications
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
