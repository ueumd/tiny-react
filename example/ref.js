import TinyReact from '../src/react/index'

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
		console.log('alert', this.alert)
	}

	// componentWillReceiveProps(nextProps) {
	// 	console.log('componentWillReceiveProps')
	// }
	//
	// componentWillUpdate() {
	// 	console.log('componentWillUpdate')
	// }
	//
	// componentDidUpdate() {
	// 	console.log('componentDidUpdate')
	// }

	componentDidMount() {
		console.log('componentDidMount')
	}

	render() {
		return (
			<div>
				<input type="text" ref={input => (this.input = input)} />
				<button onClick={this.handleClick}>submit</button>
				{/*获取alert组件的实例对象*/}
				<Alert ref={alert => (this.alert = alert)} name="Hello Vue" id="6666" />
			</div>
		)
	}
}

const app = document.querySelector('#app')
TinyReact.render(<DemoRef />, app)
