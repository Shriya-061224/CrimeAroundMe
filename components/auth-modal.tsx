"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Mail, Lock, User, Phone } from "lucide-react"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAuthenticated: (user: { id: string; email: string; name: string }) => void
}

export function AuthModal({ open, onOpenChange, onAuthenticated }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        onAuthenticated({
          id: "user_123",
          email: email,
          name: email.split("@")[0],
        })
        onOpenChange(false)
      } else {
        setError("Please fill in all fields")
      }
      setLoading(false)
    }, 800)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (email && password && name && phone) {
        onAuthenticated({
          id: "user_" + Math.random().toString(36).substr(2, 9),
          email: email,
          name: name,
        })
        onOpenChange(false)
      } else {
        setError("Please fill in all fields")
      }
      setLoading(false)
    }, 800)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">CrimeAroundMe</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="space-y-4 mt-4">
            {error && (
              <div className="flex gap-2 p-3 bg-destructive bg-opacity-10 rounded text-sm text-destructive">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email-login" className="text-sm font-semibold">
                  Email
                </Label>
                <div className="relative mt-1">
                  <Mail size={16} className="absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    id="email-login"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password-login" className="text-sm font-semibold">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Lock size={16} className="absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    id="password-login"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup" className="space-y-4 mt-4">
            {error && (
              <div className="flex gap-2 p-3 bg-destructive bg-opacity-10 rounded text-sm text-destructive">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="name-signup" className="text-sm font-semibold">
                  Full Name
                </Label>
                <div className="relative mt-1">
                  <User size={16} className="absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    id="name-signup"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email-signup" className="text-sm font-semibold">
                  Email
                </Label>
                <div className="relative mt-1">
                  <Mail size={16} className="absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    id="email-signup"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone-signup" className="text-sm font-semibold">
                  Phone Number
                </Label>
                <div className="relative mt-1">
                  <Phone size={16} className="absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    id="phone-signup"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password-signup" className="text-sm font-semibold">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Lock size={16} className="absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    id="password-signup"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
