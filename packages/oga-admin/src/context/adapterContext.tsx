'use client'

import { createContext, useContext } from "react"
import { SerializedAdapter } from "../types";

interface AdapterContextType {
  adapter: SerializedAdapter;
}

interface AdapterProviderProps{
  children: React.ReactNode
  adapter: SerializedAdapter
}

const AdapterContext = createContext<AdapterContextType | null>(null);

export function AdapterProvider({ children, adapter}: AdapterProviderProps) {
  return (
    <AdapterContext.Provider value={{ adapter }}>
      {children}
    </AdapterContext.Provider>
  )
}

export function useAdapter(){
  const context = useContext(AdapterContext)
  if (!context) throw new Error('useAdapter must be used within an Adapter Provider')
  return context
}