import { GoogleGenerativeAI } from "@google/generative-ai"

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY environment variable is not set")
}

const genAI = new GoogleGenerativeAI(API_KEY)

export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isLoading?: boolean
}

export interface ChatSession {
  messages: Message[]
  addMessage: (message: Message) => void
}

let chatSession: any = null

export async function initializeChat() {
  if (!chatSession) {
    chatSession = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    })
  }
  return chatSession
}

export async function sendMessage(userMessage: string): Promise<string> {
  try {
    const chat = await initializeChat()
    const result = await chat.sendMessage(userMessage)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Error sending message:", error)
    throw error
  }
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
