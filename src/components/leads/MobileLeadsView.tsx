"use client"
import type { Lead } from "@/types/crm"
import { MobileLeadCard } from "./MobileLeadCard"

interface MobileLeadsViewProps {
  leads: Lead[]
  onLeadClick: (lead: Lead) => void
}

export function MobileLeadsView({ leads, onLeadClick }: MobileLeadsViewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
      {leads.map((lead) => (
        <MobileLeadCard key={lead.id} lead={lead} onCardClick={onLeadClick} />
      ))}
    </div>
  )
}
