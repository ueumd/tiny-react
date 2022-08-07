import TinyReact from '../src/index'

class KeyDemo extends TinyReact.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.add = this.add.bind(this)
		this.state = {
			persons: [
				{ id: 1, name: '张三' },
				{ id: 2, name: '李四' },
				{ id: 3, name: '王五' },
				{ id: 4, name: '赵六' }
			]
		}
	}

	handleClick() {
		const newState = JSON.parse(JSON.stringify(this.state))
		// 删除persons最前面的数组，再放到最后面
		newState.persons.push(newState.persons.shift())

		this.setState(newState)
	}

	add() {
		const newState = JSON.parse(JSON.stringify(this.state))
		newState.persons.splice(1, 0, { id: 100, name: '李逵' })
		this.setState(newState)
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

	componentDidMount() {
		console.log('componentDidMount')
	}

	render() {
		return (
			<div>
				<ul>
					{this.state.persons.map(person => (
						<li key={person.id}>{person.name}</li>
					))}
				</ul>
				<button onClick={this.handleClick}>改变顺序</button>
				<button onClick={this.add}>新增</button>
			</div>
		)
	}
}

const app = document.querySelector('#app')
TinyReact.render(<KeyDemo />, app)
