import {
    defineConfig,
    // presetAttributify,
    // presetIcons,
    presetWebFonts,
    presetWind3
} from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { getMarginValue, getPaddingValue } from './utils/unoHelper'

export default defineConfig({
    presets: [
        presetWind3(),
        presetWebFonts({
            provider: 'google',
            fonts: {
                display: 'Manrope',
                sans: 'Manrope',
            },
        }),
        // ...
    ],
    theme: {
        colors: {
            primary: {
                DEFAULT: '#18abf4',
                surface: '#f1faff',
                border: '#a5daf5',
                hover: '#169ad9',
            },
            neutral: {
                DEFAULT: '#FFFFFF',
                bg: '#F5F5F5', // Added for neutral-bg
                20: '#F5F5F5',
                30: '#EDEDED',
                40: '#E0E0E0',
                50: '#C2C2C2',
                60: '#9E9E9E',
                70: '#757575',
                80: '#616161',
                90: '#404040',
                100: '#0A0A0A'
            },
            success: {
                DEFAULT: '#5CB489',
                surface: '#EEFFF6',
                border: '#B8DBCA',
                hover: '#367A89',
            },
            danger: {
                DEFAULT: '#CB3A31',
                surface: '#FFF4F2',
                border: '#EEB4B0',
                hover: '#BD251C',
            },
            warning: {
                DEFAULT: '#FAAD14',
                surface: '#FFF7E8',
                border: '#FCE4B6',
                hover: '#E19600',
            }

        },
        fontSize: {
            'extra-small-regular': ['12px', '18px'],
            'small-regular': ['14px', '20px'],
            'small-medium': ['14px', '22px'],

            'display-small-medium': ['24px', '32px'],
            'display-medium-medium': ['36px', '44px'],

            'medium': ['16px', '24px'],
            'large': ['18px', '28px'],
            'header-small-medium': ['30px', '38px'],
        },
    },
    shortcuts: {

        'text-xs-regular': 'font-normal text-extra-small-regular',
        'text-sm-regular': 'font-normal text-small-regular',
        'text-sm-medium': 'font-medium text-small-medium',

        'text-ds-medium': 'font-medium text-display-small-medium text-neutral-100',
        'text-dm-medium': 'font-medium text-display-medium-medium text-neutral-100',

        'text-md': 'font-normal text-medium',
        'text-md-medium': 'font-medium text-medium',

        'text-lg': 'font-normal text-large',
        'text-lg-medium': 'font-medium text-large',

        // Header
        'h-sm-medium': 'font-medium text-header-small-medium ',
        // Subheader
        'subheader-lg': 'font-normal text-large-regular text-neutral-70',

        // Flex
        'flex-center': 'flex items-center',
        'flex-between': 'flex justify-between',
        'flex-end': 'flex justify-end',
    },
    rules: [
        // Margin utilities
        [/^m([trblxy])?-?(\d+)$/, ([match, side, value]) => getMarginValue(match, side || 'default', parseInt(value))],

        // Padding utilities
        [/^p([trblxy])?-?(\d+)$/, ([match, side, value]) => getPaddingValue(match, side || 'default', parseInt(value))],

        // Other utilities
        [/^w-(\d+)$/, ([, d]) => ({ width: `${parseInt(d) * 4}px` })],
        [/^h-(\d+)$/, ([, d]) => ({ height: `${parseInt(d) * 4}px` })],
        [/^rounded-(\d+)$/, ([, d]) => ({ 'border-radius': `${parseInt(d) * 4}px` })],
        [/^gap-(\d+)$/, ([, d]) => ({ gap: `${parseInt(d) * 4}px` })],
    ],
    transformers: [
        transformerVariantGroup(),
    ],
})