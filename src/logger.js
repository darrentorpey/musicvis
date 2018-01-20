function time() {
  return window._show.getCurrentTime()
}

export function logTime(mark) {
  console.log(`[${mark}] ${window._show.getCurrentTime()}`)
}

const records = []

export function logProgram(mark) {
  const record = `[${time()}, '${mark}']`
  console.log(record)

  records.push(record)
}

export function report() {
  console.log(records.join(',\n'))
}
