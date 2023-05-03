import { useEffect } from 'react'

interface Props {
  isModalOpen: boolean
}

export const usePreventBodyScrollWhenModalOpen = ({ isModalOpen }: Props) => {
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      document.ontouchmove = function (event) {
        event.preventDefault()
      }
    } else {
      document.body.style.overflow = 'unset'
      document.ontouchmove = function () {
        return true
      }
    }
  }, [isModalOpen])
}
