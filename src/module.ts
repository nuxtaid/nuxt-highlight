import { defineNuxtModule, addPlugin, addServerPlugin, createResolver, addImports } from '@nuxt/kit'
import { defu } from 'defu'
import type { HighlightOptions } from 'highlight.run'

export interface ModuleOptions {
  /**
   * The Highlight project ID. You can find this in your Highlight dashboard.
   * @default ''
   */
  projectId: string
  /**
   * Options to configure the Highlight client.
   * @default {}
   */
  clientOptions?: Omit<HighlightOptions, 'environment' | 'version' | 'serviceName'>
  /**
   * The environment name (e.g., 'production', 'staging').
   * @default 'production'
   */
  environment?: string
  /**
   * The version of your application.
   * @default undefined
   */
  version?: string
  /**
   * The name of your service.
   * @default 'nuxt-server' for server-side tracking and 'nuxt-client' for client-side tracking
   */
  serviceName?: string
  /**
   * Enable or disable client-side tracking.
   * @default true
   */
  enableClientTracking?: boolean
  /**
   * Enable or disable server-side tracking.
   * @default true
   */
  enableServerTracking?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-highlight',
    configKey: 'highlight',
  },
  defaults: {
    projectId: '',
    enableClientTracking: true,
    enableServerTracking: true,
    environment: 'production',
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    const config = nuxt.options.runtimeConfig.public

    config.highlight = defu(config.highlight || {}, {
      projectId: options.projectId,
      environment: options.environment,
      version: options.version,
      serviceName: options.serviceName,
      clientOptions: options.clientOptions,
    })

    if (options.enableClientTracking) {
      addPlugin({
        src: resolve('./runtime/plugins/plugin.client'),
        mode: 'client',
      })
    }

    if (options.enableServerTracking) {
      addServerPlugin(resolve('./runtime/server/plugin'))
    }

    addImports({
      name: 'useHighlight',
      as: 'useHighlight',
      from: resolve('./runtime/composables/useHighlight'),
    })
  },
})
