export const delayKeyUp = (function () {
    let timer: any = 0
    return function (callback: () => any, ms: number) {
      clearTimeout(timer as number)
      timer = setTimeout(callback, ms)
    }
  })()
  