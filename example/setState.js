import TinyReact from '../src/index'
class Alert extends TinyReact.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: 'Default Title'
		}

		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		this.setState({
			title: 'Change Title'
		})
	}

	componentWillReceiveProps(nextProps) {
		console.log('componentWillReceiveProps')
	}

	componentWillUpdate() {
		console.log('componentWillUpdate')
	}

	componentDidUpdate() {
		console.log('componentDidUpdate')
	}

	render() {
		return (
			<div>
				<div className="test">Hello React</div>
				<div>
					name: {this.props.name}, id: {this.props.id}
				</div>
				<button onClick={this.handleClick}>title: {this.state.title}</button>
			</div>
		)
	}
}

function Heart(props) {
	return (
		<div>
			{props.name}
			<h3>&hearts;</h3>
		</div>
	)
}

const app = document.querySelector('#app')

// 渲染类组件
TinyReact.render(<Alert name="Hello Vue" id="6666" />, app)

// 组件属性更新
setTimeout(() => {
	// TinyReact.render(<Heart name="Hello Vue" id="999" />, app)

	// 更新同一个组件
	TinyReact.render(<Alert name="Hello React" id="999" />, app)
}, 4000)
