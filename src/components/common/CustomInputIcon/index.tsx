import Image from 'next/image'

interface Props {
  value: string
  placeholder: string
  name: string
  isError?: boolean
  isPassword?: boolean
  isShowPassword?: boolean
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  changeStatusPassword?: () => void
  onBlur?: React.FocusEventHandler<HTMLInputElement>
}

export const CustomInputIcon = ({
  placeholder,
  value,
  name,
  isError,
  isPassword = false,
  isShowPassword = true,
  onBlur,
  onChangeInput,
  changeStatusPassword,
}: Props) => {
  return (
    <div className="relative mt-2">
      <input
        className={`px-4 py-2.5 w-full rounded border-[0.5px] border-solid overflow-hidden
                         ${isError ? ' border-[#e11d48]' : ' border-[#B3B8C2]'}
                         focus:border-[#4F46E5] focus:outline-none`}
        type={isShowPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChangeInput}
        onBlur={onBlur}
      />
      {isPassword ? (
        <button
          type="button"
          className="absolute inset-y-0 right-0 px-3 flex items-center"
          onClick={changeStatusPassword}
        >
          {isShowPassword ? (
            <Image width={24} height={24} src="/images/icon/eye_open.svg" alt="eye_open" />
          ) : (
            <Image width={24} height={24} src="/images/icon/eye_close.svg" alt="eye_close" />
          )}
        </button>
      ) : null}
    </div>
  )
}
