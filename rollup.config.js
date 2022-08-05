import babel from '@rollup/plugin-babel'
export default [
    {
        input: './src/index.js',
        output: [
            {
                file: './dist/tiny-react.js',
                format: 'es',
                exports: 'auto',
                sourcemap: true
            }
        ],
        plugins: [
            babel({ babelHelpers: 'bundled' })
        ]
    }
]
