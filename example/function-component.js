import TinyReact from '../src/react/index'
// import TinyReact from "../dist/tiny-react"
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
	</div>
)

const app = document.querySelector('#app')

function Demo() {
	return <div>Demo</div>
}

// 函数组件
// function Heart() {
// 	// return <h1>&hearts;</h1>
// 	return <Demo />
// }

function Heart(props) {
	return (
		<div>
			{props.title}
			&hearts; <Demo />
		</div>
	)
}

// TinyReact.render(virtualDOM, app)

// 渲染函数组件
// TinyReact.render(<Heart title="Hello React" />, app)

class Alert extends TinyReact.Component {
	// new virtualDOM.type(virtualDOM.props || {}) 传递给constructor
	constructor(props) {
		// 把props 传给父类
		super(props)
	}
	render() {
		return (
			<div>
				<div>Hello React</div>
				<div>{this.props.title}</div>
			</div>
		)
	}
}

// 渲染类组件
TinyReact.render(<Alert title="Hello Vue" />, app)
