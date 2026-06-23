import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule,
  ],
  highlight: {
    projectId: 'test-project-id',
    enableServerTracking: false,
  },
})
