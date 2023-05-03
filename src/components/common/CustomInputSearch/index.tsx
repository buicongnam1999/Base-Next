import React, { ReactNode } from 'react'

interface Props {
  isShowPassword?: boolean
  showPoint?: boolean
  isError?: boolean
  disabled?: boolean
  name: string
  value?: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeStatusPassword?: () => void
  iconRight?: JSX.Element
  iconLeft?: ReactNode
  customClassName?: string
}

export const CustomInputSearch = ({
  isShowPassword = true,
  showPoint = false,
  isError = false,
  disabled = false,
  iconLeft,
  iconRight,
  placeholder,
  onChange,
  changeStatusPassword,
  name,
  value,
  customClassName,
}: Props) => {
  return (
    <div className="relative w-full">
      {iconRight && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {iconRight}
          <span className={`pl-2 text-[${disabled ? '#C9CDD3' : isError ? '#E92215' : '#88909F'}]`}>|</span>
        </div>
      )}
      <input
        type={isShowPassword ? 'text' : 'password'}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`block  w-full  p-3 bg-white border border-[#B3B8C2] ${customClassName ? customClassName : ''}
        text-sm shadow-sm placeholder-slate-400
        focus:outline-none ${isError ? 'focus:border-[#FF7A72] bg-[#FFF5F4] text-[#E92215]' : 'focus:border-[#FB8F26]'}
        ${iconLeft ? 'pr-12' : ''}
        ${iconRight ? 'pl-14' : ''} `}
      />
      {iconLeft && (
        <div
          onClick={changeStatusPassword}
          className={`absolute inset-y-0 right-0 flex items-center pr-1
         ${!showPoint ? 'pointer-events-none' : 'cursor-pointer'}`}
        >
          {iconLeft}
        </div>
      )}
    </div>
  )
}
