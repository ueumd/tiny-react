import babel from '@rollup/plugin-babel'
export default [
	// {
	// 	input: './src/index.js',
	// 	output: [
	// 		{
	// 			file: './dist/tiny-react.js',
	// 			format: 'es',
	// 			exports: 'auto',
	// 			sourcemap: true
	// 		}
	// 	],
	// 	plugins: [babel({ babelHelpers: 'bundled' })]
	// },
	{
		// input: './example/index.js',
		// input: './example/diff.js',
		// input: './example/setState.js',
		// input: './example/ref.js',
		input: './example/diff-key.js',
		output: [
			{
				file: './dist/example.js',
				format: 'umd',
				sourcemap: true
			}
		],
		plugins: [babel({ babelHelpers: 'bundled' })]
	}
]
