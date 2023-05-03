export const fancyTimeFormat = (duration: number) => {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600)
    const mins = ~~((duration % 3600) / 60)
    const secs = ~~duration % 60
  
    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = ''
  
    if (hrs > 0) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
    }
  
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    ret += '' + mins + ':' + (secs < 10 ? '0' : '')
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    ret += '' + secs
    return ret
  }
  