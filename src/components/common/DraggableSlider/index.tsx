import React, { useRef } from 'react'
import Image from 'next/image'

interface OptionType {
  value: string
  label: string
}

interface Props {
  options: OptionType[]
  listClassName?: string
  active: string
  setActive: (e: string) => void
}

export const Draggable = ({ options, listClassName, active, setActive }: Props) => {
  const listRef = useRef<HTMLUListElement>(null)
  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollLeft -= 150
    }
  }

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollLeft += 150
    }
  }
  return (
    <div className="overflow-hidden flex w-full">
      <div onClick={scrollLeft} className="flex items-center cursor-pointer">
        <div className="py-1.5 px-1.5 bg-gray-200 flex justify-center items-center rounded-full mr-3">
          <Image src="/images/icon/chevron_left_black.svg" alt="chevron-left" width={24} height={24} />
        </div>
      </div>
      <ul
        className={` mr-6 flex whitespace-nowrap overflow-x-auto  gap-4 no-scrollbar flex-grow ${
          listClassName ? listClassName : ''
        }`}
        ref={listRef}
      >
        {options.map((item, index) => (
          <li
            key={index}
            onClick={() => setActive(item.value)}
            className={`whitespace-nowrap
            py-1.5 px-3 cursor-pointer
             ${active == item.value ? 'bg-[#FB8F26] text-white' : 'bg-gray-200 text-gray-500'}
             `}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <div onClick={scrollRight} className="flex items-center justify-end cursor-pointer ">
        <div className="py-1.5 px-1.5  bg-gray-200 flex justify-center items-center rounded-full  ml-3">
          <Image src="/images/icon/chevron_right_black.svg" alt="chevron-left" width={24} height={24} />
        </div>
      </div>
    </div>
  )
}
