/* eslint import/prefer-default-export: 0 */
import { SILENCE } from 'src/constants.js'

export function decibelsToGain(value) {
  if (value <= SILENCE) {
    return 0
  }

  return Math.round(Math.exp(value / 8.6858) * 10000) / 10000
}
