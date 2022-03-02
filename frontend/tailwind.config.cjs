module.exports = {
    content: [
        './public/**/*.html',
        './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}',
    ],
    mode: 'jit',
    // @todo stefan: look over settings please
    // purge: [
    //     './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}',
    // ],
    corePlugins: {
        width: false,
    },
    theme: {
        screens: {
            'md': '37.5em', // keep synced with _settings.breakpoints.scss
            'lg': '64em', // keep synced with _settings.breakpoints.scss
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
        },
        spacing: {
            '0': '0px',
            '25': 'var(--size-25)',
            '50': 'var(--size-50)',
            '100': 'var(--size-100)',
            '200': 'var(--size-200)',
            '300': 'var(--size-300)',
            '400': 'var(--size-400)',
            '500': 'var(--size-500)',
            '600': 'var(--size-600)',
            '700': 'var(--size-700)',
            '800': 'var(--size-800)',
            '900': 'var(--size-900)',
            '1000': 'var(--size-1000)',
            '1100': 'var(--size-1100)',
            '1200': 'var(--size-1200)',
            'body': 'var(--body-p)',
            'box': 'var(--box-p)',
            'item': 'var(--item-p)',
            'auto': 'auto',
        },
        minHeight: {
            // '0': '0',
            // '1/4': '25%',
            // '1/2': '50%',
            // '3/4': '75%',
            // 'full': '100%',
            'header': 'var(--header-h)',
            'screen': '100vh',
        },
        borderRadius: {
            // 'none': '0',
            'sm': 'var(--radius-sm)',
            'md': 'var(--radius-md)',
            'full': '100%',
        },
        borderWidth: {
            DEFAULT: '1px',
            '0': '0',
        },
        extend: {
            inset: {
                '25': 'var(--size-25)',
                '50': 'var(--size-50)',
                '100': 'var(--size-100)',
                '200': 'var(--size-200)',
                '300': 'var(--size-300)',
                '400': 'var(--size-400)',
                '500': 'var(--size-500)',
                '600': 'var(--size-600)',
                '700': 'var(--size-700)',
            },
            zIndex: {
                '1': '1',
            }
        }
    },
};
