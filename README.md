![nuxt-highlight](https://raw.githubusercontent.com/nuxtaid/nuxt-highlight/refs/heads/main/playground/public/logo.svg)

# nuxt-highlight

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt module for [Highlight.io](https://highlight.io) with session replay, error monitoring, and logging.

- [✨ Release Notes](/CHANGELOG.md)

## Features

- 🎬 Session replay recording
- 🐛 Automatic error tracking (client & server)
- 📊 Network request recording
- 🔍 Vue error handler integration
- 🖥️ Server-side error tracking via Nitro plugin
- 🧩 `useHighlight()` composable for easy access

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxt module add nuxt-highlight
```

Then configure it in your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-highlight'],
  highlight: {
    projectId: '<YOUR_PROJECT_ID>',
    environment: 'production',
    version: '1.0.0',
  },
})
```

Get your project ID from [app.highlight.io/setup](https://app.highlight.io/setup).

## Configuration

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `projectId` | `string` | `''` | Your Highlight project ID (required) |
| `environment` | `string` | `'production'` | Environment name |
| `version` | `string` | `undefined` | Application version |
| `serviceName` | `string` | `undefined` | Service name for tracing |
| `enableClientTracking` | `boolean` | `true` | Enable client-side session replay & error tracking |
| `enableServerTracking` | `boolean` | `true` | Enable server-side error tracking |
| `clientOptions` | `HighlightOptions` | `undefined` | Additional [Highlight SDK options](https://www.highlight.io/docs/sdk/client#Hinit) |

### Client Options

Pass any `highlight.run` SDK option through `clientOptions`:

```ts
export default defineNuxtConfig({
  highlight: {
    projectId: '<YOUR_PROJECT_ID>',
    clientOptions: {
      networkRecording: {
        enabled: true,
        recordHeadersAndBody: true,
      },
      tracingOrigins: true,
      privacySetting: 'default',
    },
  },
})
```

## Usage

### Composable

Use `useHighlight()` in your components to access the Highlight SDK:

```vue
<script setup>
const H = useHighlight()

function onLogin(user) {
  H.identify(user.email, { name: user.name })
}

function onAction() {
  H.track('button_clicked', { page: 'home' })
}
</script>
```

### Via `$highlight`

The Highlight SDK is also available as `$highlight` on the Nuxt app instance:

```vue
<script setup>
const { $highlight } = useNuxtApp()
$highlight.track('page_viewed', { page: 'home' })
</script>
```

## Environment Variables

All config options can be overridden at runtime via `NUXT_PUBLIC_HIGHLIGHT_*` environment variables:

| Env Variable | Config Key |
| --- | --- |
| `NUXT_PUBLIC_HIGHLIGHT_PROJECT_ID` | `projectId` |
| `NUXT_PUBLIC_HIGHLIGHT_ENVIRONMENT` | `environment` |
| `NUXT_PUBLIC_HIGHLIGHT_VERSION` | `version` |
| `NUXT_PUBLIC_HIGHLIGHT_SERVICE_NAME` | `serviceName` |

This lets you keep secrets out of your `nuxt.config.ts` and configure per-deployment:

```bash
NUXT_PUBLIC_HIGHLIGHT_PROJECT_ID=abc123 nuxt build
```

Or in your `.env` file:

```env
NUXT_PUBLIC_HIGHLIGHT_PROJECT_ID=abc123
NUXT_PUBLIC_HIGHLIGHT_ENVIRONMENT=staging
```

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-highlight/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-highlight

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-highlight.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-highlight

[license-src]: https://img.shields.io/npm/l/nuxt-highlight.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-highlight

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt
[nuxt-href]: https://nuxt.com
