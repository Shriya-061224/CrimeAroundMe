"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Phone, Heart, MapPin, MessageSquare } from "lucide-react"

interface SOSPanelProps {
  language: "en" | "kn" | "ta"
}

export function SOSPanel({ language }: SOSPanelProps) {
  const emergencyNumbers = {
    en: {
      title: "Emergency Contacts",
      police: { name: "Police", number: "100" },
      ambulance: { name: "Ambulance", number: "108" },
      women: { name: "Women Helpline", number: "1091" },
      fire: { name: "Fire Department", number: "101" },
      child: { name: "Child Helpline", number: "1098" },
    },
    kn: {
      title: "ತುರ್ತು ಸಂಪರ್ಕಗಳು",
      police: { name: "ಪೋಲೀಸ್", number: "100" },
      ambulance: { name: "ಆಂಬುಲೆನ್ಸ್", number: "108" },
      women: { name: "ಮಹಿಳಾ ಸಹಾಯ ರೇಖೆ", number: "1091" },
      fire: { name: "ಅಗ್ನಿ ವಿಭಾಗ", number: "101" },
      child: { name: "ಮಕ್ಕಳ ಸಹಾಯ ರೇಖೆ", number: "1098" },
    },
    ta: {
      title: "அவசர தொடர்புகள்",
      police: { name: "காவல்துறை", number: "100" },
      ambulance: { name: "অ্যাম্বুলেন্স", number: "108" },
      women: { name: "மகளிர் உதவி", number: "1091" },
      fire: { name: "தீயணைப்பு", number: "101" },
      child: { name: "குழந்தை உதவி", number: "1098" },
    },
  }

  const sosLabels = {
    en: {
      sosTitle: "Emergency SOS",
      sosDesc: "Hold to send distress signal",
      safeTips: "Safety Tips",
    },
    kn: {
      sosTitle: "ತುರ್ತು ಎಸ್ಒಎಸ್",
      sosDesc: "ಆಪತ್ತು ಸಿಗ್ನಲ್ ಕಳುಹಿಸಲು ಹೋಲ್ಡ ಮಾಡಿ",
      safeTips: "ಸುರಕ್ಷತೆ ಸಲಹೆ",
    },
    ta: {
      sosTitle: "அவசர SOS",
      sosDesc: "அசம்பாவிதக் குறிப்பு அனுப்ப பிடித்து வைக்கவும்",
      safeTips: "பாதுகாப்பு உதவிக்குறிப்புகள்",
    },
  }

  const contacts = emergencyNumbers[language]
  const labels = sosLabels[language]
  const contactList = [contacts.police, contacts.ambulance, contacts.women, contacts.fire, contacts.child]

  const handleSOSActivate = () => {
    // Simulate SOS activation
    alert(`SOS Activated! Sending distress signal to emergency services and your emergency contacts.`)
    // In production: Send location data, trigger alerts, notify emergency contacts
  }

  return (
    <>
      <Card className="p-6 bg-destructive bg-opacity-5 border-destructive border-opacity-30">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="text-destructive" size={24} />
          <h3 className="text-lg font-bold">{contacts.title}</h3>
        </div>
        <div className="space-y-2">
          {contactList.map((contact, index) => (
            <a
              key={index}
              href={`tel:${contact.number}`}
              className="flex items-center justify-between p-3 bg-background rounded border border-border hover:bg-muted transition-colors group"
            >
              <span className="font-semibold text-sm">{contact.name}</span>
              <Button size="sm" variant="ghost" className="group-hover:bg-primary group-hover:text-primary-foreground">
                <Phone size={16} />
              </Button>
            </a>
          ))}
        </div>
      </Card>

      <Card className="p-4 bg-accent bg-opacity-5 border-accent border-opacity-30 space-y-3">
        <Button
          onClick={handleSOSActivate}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold py-6 flex items-center justify-center gap-2 pulse-animation"
        >
          <Heart size={20} />
          {labels.sosTitle}
        </Button>
        <p className="text-xs text-center opacity-75">{labels.sosDesc}</p>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="text-xs gap-1 bg-transparent">
            <MapPin size={14} />
            Share Location
          </Button>
          <Button variant="outline" size="sm" className="text-xs gap-1 bg-transparent">
            <MessageSquare size={14} />
            Alert Contacts
          </Button>
        </div>
      </Card>

      <Card className="p-4">
        <h4 className="font-semibold mb-3 text-sm">{labels.safeTips}</h4>
        <ul className="text-sm space-y-2 opacity-75">
          <li>• Stay alert in crowded areas</li>
          <li>• Share location with trusted contacts</li>
          <li>• Report suspicious activity</li>
          <li>• Keep emergency numbers saved</li>
          <li>• Travel in groups when possible</li>
          <li>• Trust your instincts</li>
        </ul>
      </Card>
    </>
  )
}
