import React from 'react'

type Props = {
  list: string[]
  placeholder: string
  classProp?: string
}

const CustomSelect: React.FC<Props> = ({ list, placeholder, classProp }) => {
  return (
    <select
      className={classProp}
    >
      <option selected>
        {placeholder}
      </option>
      {list.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  )
}

export default CustomSelect
