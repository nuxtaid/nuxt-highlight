export default defineNuxtConfig({
  modules: ['nuxt-highlight'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  highlight: {
    projectId: process.env.HIGHLIGHT_PROJECT_ID || '',
    environment: 'development',
  },
})
