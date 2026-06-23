import { H } from 'highlight.run'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin({
  name: 'highlight-client',
  enforce: 'pre',
  setup(nuxtApp) {
    const config = useRuntimeConfig().public.highlight

    if (!config.projectId) {
      console.warn('[nuxt-highlight] No projectId provided. Highlight will not initialize.')
      return
    }

    H.init(config.projectId, {
      ...config.clientOptions,
      environment: config.environment,
      version: config.version,
      serviceName: config.serviceName,
    })

    nuxtApp.vueApp.config.errorHandler = (error, _instance, info) => {
      H.consumeError(
        error instanceof Error ? error : new Error(String(error)),
        `Vue Error: ${info}`,
      )
    }

    return {
      provide: {
        highlight: H as typeof H,
      },
    }
  },
})
