import Link from 'next/link'
import React from 'react'

interface Props {
  title: string
  path?: string
  isActivateTab: boolean
}

export const TabNavItem = ({ title, path, isActivateTab }: Props) => {
  return (
    <li className={`mr-2 ${isActivateTab ? 'border-b-2 border-solid border-black' : ''}`} role="presentation">
      <Link href={path ? path : ''}>
        <button
          className={`inline-block p-4 rounded-t-lg font-normal ${isActivateTab ? 'font-semibold' : ''}`}
          type="button"
          role="tab"
        >
          {title}
        </button>
      </Link>
    </li>
  )
}
