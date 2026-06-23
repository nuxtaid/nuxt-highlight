import { useNuxtApp } from '#app'
import type { H } from 'highlight.run'

export function useHighlight(): typeof H {
  return useNuxtApp().$highlight as typeof H
}
