import { useEffect, useMemo, useState, memo } from 'react'
import { useRouter } from 'next/router'
import { QUERY_NAME } from '@/src/model/keys'
import useChangeRoute from '@/src/hooks/useChangeRoute'
import { CheckBox } from '../CheckBox'

export type Props = {
  title: string
  icon: string
  queryName: string
  isShowTitle?: boolean
  list: any[]
}

export const CheckBoxGroup = memo(({ title, icon, queryName, isShowTitle = true, list }: Props) => {
  const router = useRouter()
  const { handleChangeRoute } = useChangeRoute()

  const { query } = router
  const currentValues = useMemo(() => (query?.[queryName] ? query?.[queryName]?.toString()?.split(',') : []), [router])
  const [values, setValues] = useState<string[]>(currentValues || [])

  useEffect(() => {
    setValues(currentValues || [])
  }, [router])

  async function handleChangeCheckBox(value: string) {
    let arrValue: string[] = [...values]

    if (arrValue.includes(value)) {
      const newValues = arrValue.filter((element: string) => element !== value)

      arrValue = [...newValues]
      setValues([...arrValue])
    } else {
      arrValue.push(value)
      setValues([...arrValue])
    }

    const additionalQuery: Record<string, string> = {}

    if (arrValue.length === 0) {
      delete query[queryName]
    } else {
      additionalQuery[queryName] = arrValue.toString()
    }
    const routeQuery: Record<string, string> = {
      ...query,
      ...additionalQuery,
      [QUERY_NAME.PAGE]: '1',
    }

    await handleChangeRoute({ ...routeQuery })
  }

  return (
    <div className="flex flex-col gap-3">
      {isShowTitle && (
        <div className="flex items-center gap-3">
          <img src={icon} alt={title} />
          <span className="font-semibold capitalize">{title}</span>
        </div>
      )}
      <div className="flex max-sm:justify-between flex-wrap sm:flex-col max-sm:gap-y-[18px] sm:gap-[18px]">
        {list.map((checkbox) => (
          <div key={`${queryName}-${checkbox.value}`} className="max-sm:w-[45%]">
            <CheckBox
              isCapitalize={title !== 'speed'}
              value={checkbox.value}
              label={checkbox.label}
              checked={values.includes(String(checkbox.value))}
              onChange={() => handleChangeCheckBox(String(checkbox.value))}
            />
          </div>
        ))}
      </div>
    </div>
  )
})
