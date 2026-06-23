import { H } from '@highlight-run/node'
import { useRuntimeConfig } from '#imports'
import type { NitroApp } from 'nitropack'

export default (nitroApp: NitroApp) => {
  const config = useRuntimeConfig().public.highlight

  if (!config.projectId) {
    console.warn('[nuxt-highlight] No projectId provided. Server-side Highlight will not initialize.')
    return
  }

  H.init({
    projectID: config.projectId,
    serviceName: config.serviceName || 'nuxt-server',
    environment: config.environment,
  })

  nitroApp.hooks.hook('error', (error) => {
    H.consumeError(
      error instanceof Error ? error : new Error(String(error)),
    )
  })
}
