"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, User, Copy, Trash2, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface MessageBubbleProps {
  message: Message
  onDelete?: (messageId: string) => void
  onCopy?: (content: string) => void
}

export function MessageBubble({ message, onDelete, onCopy }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === "user"

  const handleCopy = async () => {
    if (onCopy) {
      onCopy(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(message.id)
    }
  }

  return (
    <div className={cn("flex gap-3 max-w-[85%] group", isUser ? "ml-auto flex-row-reverse" : "mr-auto")}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback
          className={cn("text-xs", isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}
        >
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <Card
          className={cn(
            "p-3 shadow-sm relative",
            isUser
              ? "bg-primary text-primary-foreground border-primary/20"
              : "bg-card text-card-foreground border-border",
          )}
        >
          <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</div>
          <div
            className={cn("text-xs mt-2 opacity-70", isUser ? "text-primary-foreground/70" : "text-muted-foreground")}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>

          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-6 w-6 p-0",
                    isUser
                      ? "hover:bg-primary-foreground/20 text-primary-foreground/70 hover:text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={handleCopy} className="gap-2">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="gap-2 text-destructive focus:text-destructive">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Card>
      </div>
    </div>
  )
}
