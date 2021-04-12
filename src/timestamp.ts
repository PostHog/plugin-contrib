import { PluginEvent } from '@posthog/plugin-scaffold'

export function getTimestampFromEvent(event: PluginEvent) {
    return event.timestamp || event.data?.timestamp || event.properties?.timestamp || event.now || event.sent_at
}