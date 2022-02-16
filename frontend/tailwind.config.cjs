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
            'body': 'var(--body-p)',
            'auto': 'auto',
        },
        minHeight: {
            // '0': '0',
            // '1/4': '25%',
            // '1/2': '50%',
            // '3/4': '75%',
            // 'full': '100%',
            'screen': '100vh',
            '1/4-screen': '25vh',
        },
        borderRadius: {
            // 'none': '0',
            'sm': 'var(--radius-sm)',
            'md': 'var(--radius-md)',
            'full': '100%',
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
            }
        }
    },
};
