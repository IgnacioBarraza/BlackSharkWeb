import { DataContextType } from '@utils/contextTypes'
import { createContext } from 'react'

export const DataContext = createContext<DataContextType | undefined>(undefined)