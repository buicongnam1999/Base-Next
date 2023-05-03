import Image from 'next/image'
import { useState } from 'react'
interface Props {
  isShowPassword?: boolean
  isPassword?: boolean
  isError?: boolean
  name?: string
  value?: string
  placeholder: string
  customClassName?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  changeStatusPassword?: () => void
}

export const CustomInput = ({
  isShowPassword = true,
  isError = false,
  isPassword = false,
  name,
  value,
  customClassName,
  placeholder,
  onChange,
  changeStatusPassword,
  ...props
}: Props) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <div
      className={`
      ${customClassName ?? ''} ${isFocused ? (isError ? 'border-red-600' : 'border-blue-600') : 'border-[#B3B8C2]'}`}
    >
      <input
        type={isShowPassword ? 'text' : 'password'}
        placeholder={placeholder}
        onFocus={handleFocus}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        {...props}
      />
      {isPassword && (
        <div className="cursor-pointer" onClick={changeStatusPassword}>
          <Image
            width={24}
            height={24}
            src={`/images/icon/${isShowPassword ? 'eye_open' : 'eye_close'}.svg`}
            alt="Eye Open"
          />
        </div>
      )}
    </div>
  )
}
