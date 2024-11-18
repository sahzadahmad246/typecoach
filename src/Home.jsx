import React, { useState, useEffect } from 'react'
import { ChevronDown, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Translation } from './Translation'

export const Home = () => {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState('')
  const [rewrite, setRewrite] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const languages = ['English', 'Spanish', 'French', 'German', 'Italian']

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (input) {
        setIsLoading(true)
        // Simulating API call for suggestions
        setTimeout(() => {
          setSuggestions('This is a suggestion for your input.')
          setIsLoading(false)
        }, 500)
      }
    }, 300)

    return () => clearTimeout(debounce)
  }, [input])

  const handleRewrite = () => {
    setIsLoading(true)
    // Simulating API call for rewrite
    setTimeout(() => {
      setRewrite('This is a rewritten version of your input.')
      setIsLoading(false)
      setIsDialogOpen(true)
    }, 800)
  }

  const WritingAssistant = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Real-time Writing Assistant</h1>
      
      {/* Language Selection */}
      <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
          Select Language
        </label>
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Input Field */}
      <div>
        <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
          Enter your text
        </label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Start typing here..."
          className="min-h-[150px]"
        />
      </div>
      
      {/* Real-time Suggestions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Suggestions</h2>
        <div className="bg-gray-50 p-4 rounded-md">
          {isLoading ? (
            <p className="text-gray-500">Loading suggestions...</p>
          ) : suggestions ? (
            <p className="text-gray-800">{suggestions}</p>
          ) : (
            <p className="text-gray-500">Suggestions will appear here as you type.</p>
          )}
        </div>
      </div>
      
      {/* Rewrite Button */}
      <Button onClick={handleRewrite} disabled={isLoading}>
        <Send className="h-4 w-4 mr-2" />
        Rewrite
      </Button>
      
      {/* Rewrite Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rewritten Text</DialogTitle>
            <DialogDescription>
              Here's the rewritten version of your input.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Original Text</h3>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-gray-800">{input || 'Your input will appear here.'}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Corrected Text</h3>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-gray-800">{rewrite || 'Corrected text will appear here.'}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Dismiss</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="writing" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="writing">Writing Assistant</TabsTrigger>
            <TabsTrigger value="translation">Translation</TabsTrigger>
          </TabsList>
          <TabsContent value="writing">
            <WritingAssistant />
          </TabsContent>
          <TabsContent value="translation">
            <Translation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}