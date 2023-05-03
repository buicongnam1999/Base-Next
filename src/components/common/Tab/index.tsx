import React, { ReactNode } from 'react'
import { TabNavItem } from '../TabNavItem'

const TABS = [
    {
      id: '1',
      title: '',
      path: '',
      isActivateTab: true,
    },
    {
      id: '2',
      title: '',
      path: '',
      isActivateTab: false,
    },
  ]

interface Props {
  activeTab: string
  setActiveTab: (e: string) => void
  children: ReactNode
}

export const Tabs = ({ children }: Props) => {
  return (
    <>
      <div className="w-max border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab">
          {TABS.map((item) => (
            <TabNavItem key={item.id} title={item.title} path={item.path} isActivateTab={false} />
          ))}
        </ul>
      </div>
      <div className="py-8 px-4">{children}</div>
    </>
  )
}
