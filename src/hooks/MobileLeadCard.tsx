"use client"
import { useState } from "react"
import { format } from "date-fns"
import { ChevronDown, Phone, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Lead } from "@/types/crm"
import { cn } from "@/lib/utils"

interface MobileLeadCardProps {
  lead: Lead
  onCardClick: (lead: Lead) => void
}

export function MobileLeadCard({ lead, onCardClick }: MobileLeadCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="w-full cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate text-foreground">{lead.name}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <Phone className="w-3 h-3" />
              {lead.phone}
            </p>
          </div>
        </div>

        {/* CHANGE: Add expandable sections for Next Follow and Next Details */}
        <div className="space-y-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm font-medium text-foreground"
          >
            <span>Next Follow-up</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
          </button>

          {isExpanded && (
            <div className="space-y-3 bg-muted/30 p-3 rounded-lg animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Follow-up Date</p>
                  <p className="font-medium text-sm">
                    {lead.nextFollowUp ? format(new Date(lead.nextFollowUp), "dd MMM yyyy, HH:mm") : "Not scheduled"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline" className="text-xs">
                  {lead.stage}
                </Badge>
              </div>

              <Button
                size="sm"
                className="w-full gap-2"
                onClick={(e) => {
                  e.stopPropagation()
                  onCardClick(lead)
                }}
              >
                View Full Details
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
