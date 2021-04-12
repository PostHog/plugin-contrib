type BufferOptions = {
    limit: number
    timeoutSeconds: number
    onFlush: (objects: any[], points: number) => void | Promise<void>
}

export function createBuffer(opts: Partial<BufferOptions>) {
    const buffer = {
        _buffer: [] as any[],
        _timeout: null as NodeJS.Timeout | null,
        _points: 0,
        _options: {
            limit: 10,
            timeoutSeconds: 60,
            ...opts,
        } as BufferOptions,
        add: (object: any, points = 1) => {
            if (buffer._points + points > buffer._options.limit) {
                buffer._flush(object, points)
            } else {
                buffer._points += points
                buffer._buffer.push(object)
            }
            if (!buffer._timeout) {
                buffer._timeout = setTimeout(() => buffer.flush(), buffer._options.timeoutSeconds * 1000)
            }
        },
        _flush: (object = null, points = 0) => {
            if (buffer._timeout) {
                clearTimeout(buffer._timeout)
                buffer._timeout = null
            }
            if (buffer._buffer.length > 0 || buffer._points !== 0) {
                const oldBuffer = buffer._buffer
                const oldPoints = buffer._points
                buffer._buffer = object ? [object] : []
                buffer._points = points
                void buffer._options.onFlush?.(oldBuffer, oldPoints)
            }
        },
        flush: () => buffer._flush(),
    }

    return buffer
}
