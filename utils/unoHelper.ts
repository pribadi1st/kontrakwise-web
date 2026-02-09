const marginSide: Record<string, string | string[]> = {
    'l': 'margin-left',
    'r': 'margin-right',
    't': 'margin-top',
    'b': 'margin-bottom',
    'x': ['margin-left', 'margin-right'],
    'y': ['margin-top', 'margin-bottom'],
    'default': 'margin'
}

const paddingSide: Record<string, string | string[]> = {
    'l': 'padding-left',
    'r': 'padding-right',
    't': 'padding-top',
    'b': 'padding-bottom',
    'x': ['padding-left', 'padding-right'],
    'y': ['padding-top', 'padding-bottom'],
    'default': 'padding'
}

export function getMarginValue(_: unknown, side: string, value: number) {
    const margin = marginSide[side]
    if (Array.isArray(margin)) {
        return margin.map((m) => ({ [m]: `${value * 4}px` }))
    }
    return { [margin]: `${value * 4}px` }
}

export function getPaddingValue(_: unknown, side: string, value: number) {
    const padding = paddingSide[side]
    if (Array.isArray(padding)) {
        return padding.map((p) => ({ [p]: `${value * 4}px` }))
    }
    return { [padding]: `${value * 4}px` }
}
