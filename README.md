## PostHog Plugin Contrib

[![npm package](https://img.shields.io/npm/v/@posthog/plugin-contrib?style=flat-square)](https://www.npmjs.com/package/@posthog/plugin-contrib)
[![MIT License](https://img.shields.io/badge/License-MIT-red.svg?style=flat-square)](https://opensource.org/licenses/MIT)

This project contains shared code that PostHog plugin authors can use.

## Included in this package

### Batch processing

NOTE: this is still a stub, the code is not yet there

```typescript
import fetch from 'node-fetch'
import { PluginEvent, PluginMeta } from '@posthog/plugin-scaffold'
import { createBatch } from '@posthog/plugin-contrib'

function setupPlugin(meta: PluginMeta) {
    meta.global.batcher = createBatch({
        maxCount: 1000, // elements
        maxDelay: 30, // seconds
        retryCount: 3,
        onBatch: async (batch: PluginEvent[]) => {
            const resp = await fetch('https://httpbin.org/post', {
                method: 'post',
                body:    JSON.stringify(batch),
                headers: { 'Content-Type': 'application/json' },
            })
            const json = await resp.json()
        }
    })
}

export function processEvent(event: PluginEvent, meta: PluginMeta) {
    meta.global.batcher.add(event)
    return event
}
```

## Releasing a new version

It's magic! Just bump up `version` in `package.json` on the main branch and the new version will be published automatically, on GitHub and on npm. Courtesy of GitHub Actions.

## Questions?

### [Join our Slack community.](https://join.slack.com/t/posthogusers/shared_invite/enQtOTY0MzU5NjAwMDY3LTc2MWQ0OTZlNjhkODk3ZDI3NDVjMDE1YjgxY2I4ZjI4MzJhZmVmNjJkN2NmMGJmMzc2N2U3Yjc3ZjI5NGFlZDQ)
