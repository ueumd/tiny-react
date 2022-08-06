import TinyReact from '../src/index'
const virtualDOM = (
	<div className="container">
		<h1>你好 Tiny React</h1>
		<h2>(编码必杀技)</h2>
		<div>
			嵌套1 <div>嵌套 1.1</div>
		</div>
		<h3>(观察: 这个将会被改变)</h3>
		{2 === 1 && <div>如果2和1相等渲染当前内容</div>}
		{2 === 2 && <div>2</div>}
		<span>这是一段内容</span>
		<button onClick={() => alert('你好')}>点击我</button>
		<h3>这个将会被删除</h3>
		2, 3
		<input type="text" value="7" />
	</div>
)

const modifyDOM = (
	<div className="container">
		<h1>你好 Tiny React</h1>
		<h2>(编码必杀技)</h2>
		<div>
			嵌套1 <div>嵌套 1.1</div>
		</div>
		<h1>(观察: 这个将会被改变)</h1>
		{2 === 1 && <div>如果2和1相等渲染当前内容</div>}
		{2 === 2 && <div>2</div>}
		<span>这是一段被修改的内容</span>
		<input type="text" value="7" />
	</div>
)

const modifyDOM2 = (
	<div className="container">
		<h1>你好 Tiny React</h1>
		<h2>(编码必杀技)</h2>
		<div>
			嵌套1 <div>嵌套 1.1</div>
		</div>
		<h3>(观察: 这个将会被改变)</h3>
		{2 === 1 && <div>如果2和1相等渲染当前内容</div>}
		{2 === 2 && <div>2</div>}
		<span>这是一段内容</span>
		<button onClick={() => alert('你好！！！')}>点击我</button>
		<h3>这个将会被删除</h3>
		2, 3
		<input type="text" value="7" />
	</div>
)

const app = document.querySelector('#app')

TinyReact.render(virtualDOM, app)

setTimeout(() => {
	console.log('第 1 次')
	TinyReact.render(modifyDOM, app)
}, 3000)

setTimeout(() => {
	console.log('第 2 次')
	TinyReact.render(modifyDOM, app)
}, 6000)
