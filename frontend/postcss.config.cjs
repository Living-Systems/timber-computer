// Add basic postcss plugins
const plugins = [
    require('tailwindcss'),
];

// Add additional plugins for production build
if (process.env.NODE_ENV === 'production') {
    plugins.push(...[
        require('cssnano'),
    ]);
}

module.exports = {
    plugins: plugins,
};
