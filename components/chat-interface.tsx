"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Sparkles, Trash2, RotateCcw } from "lucide-react"
import { TypingIndicator } from "@/components/typing-indicator"
import { MessageBubble } from "@/components/message-bubble"
import { ThemeToggle } from "@/components/theme-toggle"
import { ChatSettings, type ChatSettings as ChatSettingsType } from "@/components/chat-settings"
import { ExportChat } from "@/components/export-chat"
import { useChat } from "@/hooks/use-chat"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function ChatInterface() {
  const { messages, isLoading, error, sendMessage, clearMessages, deleteMessage, copyMessage } = useChat()
  const [input, setInput] = useState("")
  const [chatSettings, setChatSettings] = useState<ChatSettingsType>()
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    await sendMessage(input)
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleSettingsChange = (settings: ChatSettingsType) => {
    setChatSettings(settings)
    // You could save settings to localStorage here
    localStorage.setItem("chat-settings", JSON.stringify(settings))
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Perceptron</h1>
            <p className="text-sm text-muted-foreground">A Chatbot</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ExportChat messages={messages} />
          {messages.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 bg-transparent">
                  <Trash2 className="w-4 h-4" />
                  Clear
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear Chat History</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all messages in this conversation. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={clearMessages}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Clear All Messages
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <ChatSettings onSettingsChange={handleSettingsChange} />
          <ThemeToggle />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-destructive/10 border-b border-destructive/20">
          <div className="flex items-center gap-2 text-destructive">
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm font-medium">Connection Error</span>
          </div>
          <p className="text-sm text-destructive/80 mt-1">{error}</p>
        </div>
      )}

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Welcome to AI Assistant</h2>
              <p className="text-muted-foreground max-w-md mb-6">
                Start a conversation with our AI assistant. Ask questions, get help with tasks, or just chat!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                <Button
                  variant="outline"
                  className="p-4 h-auto text-left justify-start bg-transparent hover:bg-muted/50"
                  onClick={() => setInput("What can you help me with?")}
                >
                  <div>
                    <div className="font-medium">Get Started</div>
                    <div className="text-sm text-muted-foreground">What can you help me with?</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="p-4 h-auto text-left justify-start bg-transparent hover:bg-muted/50"
                  onClick={() => setInput("Explain quantum computing in simple terms")}
                >
                  <div>
                    <div className="font-medium">Learn Something</div>
                    <div className="text-sm text-muted-foreground">Explain quantum computing</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="p-4 h-auto text-left justify-start bg-transparent hover:bg-muted/50"
                  onClick={() => setInput("Help me write a professional email")}
                >
                  <div>
                    <div className="font-medium">Get Help</div>
                    <div className="text-sm text-muted-foreground">Write a professional email</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="p-4 h-auto text-left justify-start bg-transparent hover:bg-muted/50"
                  onClick={() => setInput("Tell me a creative story")}
                >
                  <div>
                    <div className="font-medium">Be Creative</div>
                    <div className="text-sm text-muted-foreground">Tell me a creative story</div>
                  </div>
                </Button>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} onDelete={deleteMessage} onCopy={copyMessage} />
          ))}

          {isLoading && <TypingIndicator />}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card/50">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>Press Enter to send, Shift+Enter for new line</span>
          {messages.length > 0 && (
            <span>
              {messages.length} message{messages.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
