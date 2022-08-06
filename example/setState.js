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
	render() {
		return (
			<div>
				<div className="test">Hello React</div>
				<div>name: {this.props.name}</div>
				<button onClick={this.handleClick}>title: {this.state.title}</button>
			</div>
		)
	}
}

const app = document.querySelector('#app')

// 渲染类组件
TinyReact.render(<Alert name="Hello Vue" />, app)
