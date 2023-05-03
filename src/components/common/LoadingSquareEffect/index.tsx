import React from 'react'
import styles from './LoadingSquareEffect.module.css'

export const LoadingSquareEffect = React.memo(() => {
  return (
    <div className={styles.loader}>
      <div className={`${styles.firstRow} flex`}>
        <div className="w-1 h-1 mr-[2px] bg-white" />
        <div className="w-1 h-1 mr-[2px] bg-white" />
        <div className="w-1 h-1 mr-[2px] bg-white" />
        <div className="w-1 h-1 mb-[2px] bg-white" />
      </div>

      <div className={`${styles.secondRow} flex justify-between`}>
        <div className="w-1 h-1 mb-[2px] bg-white" />
        <div className="w-1 h-1 mb-[2px] bg-white" />
      </div>

      <div className={`${styles.thirdRow} flex justify-between`}>
        <div className="w-1 h-1 mb-[2px] bg-white" />
        <div className="w-1 h-1 mb-[2px] bg-white" />
      </div>

      <div className={`${styles.fourthRow} flex`}>
        <div className="w-1 h-1 mr-[2px] bg-white" />
        <div className="w-1 h-1 mr-[2px] bg-white" />
        <div className="w-1 h-1 mr-[2px] bg-white" />
        <div className="w-1 h-1 bg-white" />
      </div>
    </div>
  )
})
