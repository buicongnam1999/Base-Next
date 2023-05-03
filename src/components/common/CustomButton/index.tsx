import Image from "next/image";
import { LoadingSquareEffect } from "../LoadingSquareEffect";

interface Props {
  customClassName?: string;
  label?: string;
  iconAfter?: string;
  loading?: boolean;
  disable?: boolean;
  backgroundGradient?: boolean;
  customPadding?: string;
  iconName?: string;
  colorLoading?: string;
  loadingLabel?: string;
  fontSize?: string;
  type?: "submit" | "button";
  onClick?: any;
}

const CustomButton = ({
  customClassName,
  label,
  iconAfter,
  loading = false,
  disable = false,
  backgroundGradient = false,
  customPadding,
  iconName,
  loadingLabel = "Loading",
  colorLoading,
  fontSize,
  type = "button",
  onClick,
}: Props) => {
  return <button
  className={`
  text-[${fontSize ? fontSize : '14'}px]
  ${disable || loading ? 'pointer-events-auto' : 'pointer-events-auto'}
  ${customPadding ? customPadding : 'px-6 py-3'}
  ${customClassName ? customClassName : 'text-white '}
`}
  onClick={onClick}
  disabled={disable || loading}
  type={type}
  style={{
    backgroundImage: backgroundGradient ? 'linear-gradient(to right, #F22876 0%, #FB8F26 50%, #F22876 100%)' : '',
  }}
>
  {loading ? (
    <>
      <LoadingSquareEffect />
      <span className={`${colorLoading ? colorLoading : 'text-white'} ml-1`}>
        {loadingLabel ? loadingLabel : label}
      </span>
    </>
  ) : (
    <>
      {iconName ? <Image src={`/images/icon/${iconName}.svg`} width={16} height={16} alt={iconName} /> : null}
      {label ? <span>{label}</span> : null}
      {iconAfter && (
        <Image src={`/images/icon/${iconAfter}.svg`} className="object-contain object-center" alt={iconAfter} />
      )}
    </>
  )}
</button>
};
