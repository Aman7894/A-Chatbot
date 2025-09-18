"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Settings } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

interface ChatSettingsProps {
  onSettingsChange?: (settings: ChatSettings) => void
}

export interface ChatSettings {
  temperature: number
  maxTokens: number
  systemPrompt: string
  autoSave: boolean
  soundEnabled: boolean
}

const defaultSettings: ChatSettings = {
  temperature: 0.7,
  maxTokens: 2048,
  systemPrompt: "You are a helpful AI assistant. Be concise and accurate in your responses.",
  autoSave: true,
  soundEnabled: false,
}

export function ChatSettings({ onSettingsChange }: ChatSettingsProps) {
  const [settings, setSettings] = useState<ChatSettings>(defaultSettings)
  const [isOpen, setIsOpen] = useState(false)

  const handleSettingChange = <K extends keyof ChatSettings>(key: K, value: ChatSettings[K]) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onSettingsChange?.(newSettings)
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    onSettingsChange?.(defaultSettings)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Open settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Chat Settings</SheetTitle>
          <SheetDescription>Customize your AI assistant experience</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* AI Parameters */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">AI Parameters</h3>

            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature: {settings.temperature}</Label>
              <Slider
                id="temperature"
                min={0}
                max={1}
                step={0.1}
                value={[settings.temperature]}
                onValueChange={([value]) => handleSettingChange("temperature", value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Controls randomness. Lower values make responses more focused and deterministic.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxTokens">Max Tokens: {settings.maxTokens}</Label>
              <Slider
                id="maxTokens"
                min={256}
                max={4096}
                step={256}
                value={[settings.maxTokens]}
                onValueChange={([value]) => handleSettingChange("maxTokens", value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Maximum length of the AI response.</p>
            </div>
          </div>

          <Separator />

          {/* System Prompt */}
          <div className="space-y-2">
            <Label htmlFor="systemPrompt">System Prompt</Label>
            <textarea
              id="systemPrompt"
              value={settings.systemPrompt}
              onChange={(e) => handleSettingChange("systemPrompt", e.target.value)}
              className="w-full min-h-[100px] p-3 text-sm border border-border rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter system prompt..."
            />
            <p className="text-xs text-muted-foreground">Instructions that guide the AI's behavior and personality.</p>
          </div>

          <Separator />

          {/* Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Preferences</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoSave">Auto-save conversations</Label>
                <p className="text-xs text-muted-foreground">Automatically save chat history to local storage</p>
              </div>
              <Switch
                id="autoSave"
                checked={settings.autoSave}
                onCheckedChange={(checked) => handleSettingChange("autoSave", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="soundEnabled">Sound notifications</Label>
                <p className="text-xs text-muted-foreground">Play sound when receiving responses</p>
              </div>
              <Switch
                id="soundEnabled"
                checked={settings.soundEnabled}
                onCheckedChange={(checked) => handleSettingChange("soundEnabled", checked)}
              />
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={resetSettings} variant="outline" className="flex-1 bg-transparent">
              Reset to Defaults
            </Button>
            <Button onClick={() => setIsOpen(false)} className="flex-1">
              Save Changes
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
