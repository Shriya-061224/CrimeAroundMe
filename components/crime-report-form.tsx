"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Clock, Camera, FileText } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CrimeReportFormProps {
  userEmail?: string
  onSubmit?: (report: any) => void
}

export function CrimeReportForm({ userEmail, onSubmit }: CrimeReportFormProps) {
  const [crimeType, setCrimeType] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [evidence, setEvidence] = useState<File | null>(null)
  const [anonymous, setAnonymous] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const crimeTypes = ["Theft", "Assault", "Robbery", "Burglary", "Cybercrime", "Harassment", "Fraud", "Other"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const report = {
        crimeType,
        location,
        description,
        date,
        time,
        anonymous,
        email: anonymous ? "anonymous@report.local" : userEmail,
        timestamp: new Date().toISOString(),
      }

      console.log("Report submitted:", report)
      if (onSubmit) onSubmit(report)

      setSubmitted(true)
      setSubmitting(false)

      // Reset form after 3 seconds
      setTimeout(() => {
        setCrimeType("")
        setLocation("")
        setDescription("")
        setDate("")
        setTime("")
        setEvidence(null)
        setAnonymous(false)
        setSubmitted(false)
      }, 3000)
    }, 1000)
  }

  if (submitted) {
    return (
      <Card className="p-6 bg-secondary bg-opacity-10 border-secondary">
        <div className="text-center space-y-4">
          <div className="text-4xl">✓</div>
          <h3 className="text-lg font-bold text-secondary">Report Submitted Successfully</h3>
          <p className="text-sm opacity-75">
            Thank you for helping keep your community safe. Your report has been forwarded to the authorities.
          </p>
          <p className="text-xs opacity-50">Report ID: RPT-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Report a Crime</h2>
        <p className="text-sm opacity-75">
          Help us keep the community safe by reporting incidents accurately and promptly
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Crime Type */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Crime Type *</Label>
          <Select value={crimeType} onValueChange={setCrimeType}>
            <SelectTrigger>
              <SelectValue placeholder="Select crime type" />
            </SelectTrigger>
            <SelectContent>
              {crimeTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location" className="text-sm font-semibold mb-2 block flex items-center gap-2">
            <MapPin size={16} /> Location *
          </Label>
          <Input
            id="location"
            placeholder="e.g., MG Road, Bangalore"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date" className="text-sm font-semibold mb-2 block">
              Date of Incident *
            </Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="time" className="text-sm font-semibold mb-2 block flex items-center gap-2">
              <Clock size={16} /> Time *
            </Label>
            <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-sm font-semibold mb-2 block flex items-center gap-2">
            <FileText size={16} /> Description *
          </Label>
          <Textarea
            id="description"
            placeholder="Describe what happened in detail. Include any suspects, vehicles, or other relevant information..."
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <p className="text-xs opacity-50 mt-1">Be as detailed as possible to help investigators</p>
        </div>

        {/* Evidence Upload */}
        <div>
          <Label htmlFor="evidence" className="text-sm font-semibold mb-2 block flex items-center gap-2">
            <Camera size={16} /> Evidence (Photo/Video)
          </Label>
          <div className="border-2 border-dashed border-border rounded p-4 text-center cursor-pointer hover:bg-muted transition">
            <input
              id="evidence"
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setEvidence(e.target.files?.[0] || null)}
              className="hidden"
            />
            <label htmlFor="evidence" className="cursor-pointer">
              <p className="font-semibold text-sm">Click to upload evidence</p>
              <p className="text-xs opacity-50">PNG, JPG, MP4 up to 10MB</p>
            </label>
          </div>
          {evidence && <p className="text-xs mt-2 opacity-75">Selected: {evidence.name}</p>}
        </div>

        {/* Anonymous Checkbox */}
        <div className="flex items-center gap-3 p-3 bg-secondary bg-opacity-10 rounded">
          <input
            type="checkbox"
            id="anonymous"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="anonymous" className="text-sm cursor-pointer">
            Report anonymously
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={submitting || !crimeType || !location || !date || !time || !description}
        >
          {submitting ? "Submitting..." : "Submit Report"}
        </Button>

        <p className="text-xs opacity-50 text-center">
          Your report will be verified and sent to local authorities for investigation
        </p>
      </form>
    </Card>
  )
}
