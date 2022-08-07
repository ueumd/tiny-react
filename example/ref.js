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

class DemoRef extends TinyReact.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		console.log('value', this.input.value)
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
				<input type="text" ref={input => (this.input = input)} />
				<button onClick={this.handleClick}>submit</button>
				<Alert name="Hello Vue" id="6666" />
			</div>
		)
	}
}

const app = document.querySelector('#app')
TinyReact.render(<DemoRef />, app)
