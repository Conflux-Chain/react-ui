import React from 'react'

export interface TabsItemConfig {
  value: string
  label: string
  disabled: boolean
}

export interface Handles {
  currentTab(v?: string): string | void
}

export interface TabsConfig {
  register: (item: TabsItemConfig | { remove: string }) => void
  currentValue?: string
}

export const TabsContext = React.createContext<TabsConfig | null>(null)

export const useTabsContext = (): TabsConfig | null =>
  React.useContext<TabsConfig | null>(TabsContext)
