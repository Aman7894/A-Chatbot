"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, FileText, Share } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface ExportChatProps {
  messages: Message[]
}

export function ExportChat({ messages }: ExportChatProps) {
  const [isExporting, setIsExporting] = useState(false)

  const exportAsText = () => {
    if (messages.length === 0) return

    const content = messages
      .map((msg) => {
        const timestamp = msg.timestamp.toLocaleString()
        const role = msg.role === "user" ? "You" : "AI Assistant"
        return `[${timestamp}] ${role}:\n${msg.content}\n`
      })
      .join("\n")

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `chat-export-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const exportAsJSON = () => {
    if (messages.length === 0) return

    const data = {
      exportDate: new Date().toISOString(),
      messageCount: messages.length,
      messages: messages.map((msg) => ({
        id: msg.id,
        content: msg.content,
        role: msg.role,
        timestamp: msg.timestamp.toISOString(),
      })),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `chat-export-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareChat = async () => {
    if (messages.length === 0) return

    const content = messages
      .map((msg) => {
        const role = msg.role === "user" ? "You" : "AI"
        return `${role}: ${msg.content}`
      })
      .join("\n\n")

    if (navigator.share) {
      try {
        await navigator.share({
          title: "AI Chat Conversation",
          text: content,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(content)
        // You could show a toast notification here
      } catch (error) {
        console.error("Error copying to clipboard:", error)
      }
    }
  }

  if (messages.length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={exportAsText} className="gap-2">
          <FileText className="w-4 h-4" />
          Export as Text
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsJSON} className="gap-2">
          <FileText className="w-4 h-4" />
          Export as JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareChat} className="gap-2">
          <Share className="w-4 h-4" />
          Share Conversation
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
