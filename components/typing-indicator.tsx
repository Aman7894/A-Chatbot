import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Bot } from "lucide-react"

export function TypingIndicator() {
  return (
    <div className="flex gap-3 max-w-[85%] mr-auto">
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback className="bg-muted text-muted-foreground text-xs">
          <Bot className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>

      <Card className="p-3 bg-card text-card-foreground border-border shadow-sm">
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
          </div>
          <span className="text-xs text-muted-foreground ml-2">AI is thinking...</span>
        </div>
      </Card>
    </div>
  )
}
