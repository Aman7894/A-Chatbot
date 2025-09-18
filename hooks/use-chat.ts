"use client"

import { useState, useEffect, useCallback } from "react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface ChatState {
  messages: Message[]
  isLoading: boolean
  error: string | null
}

const STORAGE_KEY = "chat-messages"

export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  })

  // Load messages from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsedMessages = JSON.parse(saved).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setState((prev) => ({ ...prev, messages: parsedMessages }))
      }
    } catch (error) {
      console.error("Failed to load chat history:", error)
    }
  }, [])

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (state.messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.messages))
      } catch (error) {
        console.error("Failed to save chat history:", error)
      }
    }
  }, [state.messages])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || state.isLoading) return

      const userMessage: Message = {
        id: Date.now().toString(),
        content: content.trim(),
        role: "user",
        timestamp: new Date(),
      }

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        isLoading: true,
        error: null,
      }))

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: content.trim(),
            history: state.messages,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to get response")
        }

        const data = await response.json()

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          role: "assistant",
          timestamp: new Date(),
        }

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, assistantMessage],
          isLoading: false,
        }))
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"

        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))

        // Add error message to chat
        const errorChatMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
          role: "assistant",
          timestamp: new Date(),
        }

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, errorChatMessage],
        }))
      }
    },
    [state.messages, state.isLoading],
  )

  const clearMessages = useCallback(() => {
    setState((prev) => ({ ...prev, messages: [] }))
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const deleteMessage = useCallback((messageId: string) => {
    setState((prev) => ({
      ...prev,
      messages: prev.messages.filter((msg) => msg.id !== messageId),
    }))
  }, [])

  const copyMessage = useCallback((content: string) => {
    navigator.clipboard.writeText(content).catch((error) => {
      console.error("Failed to copy message:", error)
    })
  }, [])

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    clearMessages,
    deleteMessage,
    copyMessage,
  }
}
