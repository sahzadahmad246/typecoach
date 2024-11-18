import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'

const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Chinese', 'Japanese']

export const Translation = () => {
  const [sourceLanguage, setSourceLanguage] = useState('English')
  const [targetLanguage, setTargetLanguage] = useState('Spanish')
  const [originalText, setOriginalText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [explanation, setExplanation] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleTranslate = () => {
    setIsLoading(true)
    // Simulating API call for translation
    setTimeout(() => {
      setTranslatedText('This is the translated text.')
      setExplanation('Here\'s an explanation of the translation and any corrections made.')
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto p-4 space-y-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6">Translation Tool</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="sourceLanguage" className="block text-sm font-medium text-gray-700 mb-1">
            Source Language
          </label>
          <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
            <SelectTrigger id="sourceLanguage">
              <SelectValue placeholder="Select source language" />
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
        <div>
          <label htmlFor="targetLanguage" className="block text-sm font-medium text-gray-700 mb-1">
            Target Language
          </label>
          <Select value={targetLanguage} onValueChange={setTargetLanguage}>
            <SelectTrigger id="targetLanguage">
              <SelectValue placeholder="Select target language" />
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">Original Text ({sourceLanguage})</h2>
          <Textarea
            placeholder="Enter text to translate"
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            className="min-h-[200px] bg-white"
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">Translated Text ({targetLanguage})</h2>
          <Textarea
            placeholder="Translation will appear here"
            value={translatedText}
            readOnly
            className="min-h-[200px] bg-white"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={handleTranslate} disabled={isLoading || !originalText} className="px-8 py-2">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Translating...
            </>
          ) : (
            'Translate'
          )}
        </Button>
      </div>

      {explanation && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Explanation</h2>
          <p className="text-gray-700">{explanation}</p>
        </div>
      )}
    </div>
  )
}