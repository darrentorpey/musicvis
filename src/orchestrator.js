import { Effects } from './effects'
import { logProgram } from './logger'

export const actionShortcuts = {
  water: () => Effects.waterBurst(),
  boom_green: () => Effects.greenBlast(),
  boom_blue: () => Effects.blueBlast(),
  boom_lightblue: () => Effects.lightBlueBlast(),
  boom_orange: () => Effects.orangeBlast(),
}

export function fireEffect(name) {
  actionShortcuts[name]()
}

export function addEffect(name) {
  fireEffect(name)
  logProgram(name)
}
