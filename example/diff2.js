import TinyReact from '../src/index'
const virtualDOM = (
	<div className="container">
		<h1>你好 Tiny React</h1>
		<h2>(编码必杀技)</h2>
	</div>
)

const modifyDOM = (
	<div className="container">
		<h1>你好 Tiny React</h1>
		<h2>(编码必杀技)</h2>
	</div>
)

const app = document.querySelector('#app')

TinyReact.render(virtualDOM, app)

setTimeout(() => {
	console.log('第 1 次')
	TinyReact.render(modifyDOM, app)
}, 4000)
