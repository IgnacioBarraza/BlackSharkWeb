'use client'

import { useContext } from "react"

import { UserContext } from "../context/UserContext"

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('You cant use this hook outside of its provider!')
  }

  return context
}