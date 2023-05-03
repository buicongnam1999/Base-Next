import { memo } from 'react'

type Props = {
  label: string
  value: string | number
  checked: boolean
  isCapitalize: boolean
  onChange: (value: string | number) => any
}

export const CheckBox = memo(({ label, value, checked, onChange, isCapitalize }: Props) => {
  return (
    <div className="flex items-center gap-3 w-fit cursor-pointer group" onClick={() => onChange(value)}>
      <div
        className={`w-5 h-5 flex items-center justify-center transition-all duration-200 ease-linear ${
          checked ? 'bg-[#1171FF]' : 'bg-transparent border border-[#6A6A6A]'
        }`}
      >
        {checked && <img className="w-[9px] h-2 object-contain object-center" src="/images/tick.svg" alt="tick" />}
      </div>
      <span
        className={`group-hover:text-white ${
          checked ? 'text-white font-medium' : 'text-[#D2D2D2]'
        } transition-all duration-200 ease-linear select-none ${isCapitalize && 'capitalize'}`}
      >
        {label}
      </span>
    </div>
  )
})
