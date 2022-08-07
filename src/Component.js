import diff from './diff'

export default class Component {
	constructor(props) {
		this.props = props
	}
	// 类组件的状态修改
	setState(state) {
		this.state = Object.assign({}, this.state, state)
		console.log('Component state: ', this.state)

		// 获取最新要渲染的 virtualDOM 对象
		let virtualDOM = this.render()

		let oldDOM = this.getDOM()
		console.log('oldDOM', oldDOM)

		// 获取旧的 virtualDOM 对象 进行对比

		// 父级的容器
		let container = oldDOM.parentNode

		diff(virtualDOM, container, oldDOM)
	}

	setDOM(dom) {
		this._dom = dom
	}

	getDOM() {
		return this._dom
	}

	updateProps(props) {
		this.props = props
	}

	// 生命周期函数
	// 子组件要使用 覆盖父类的就可以
	componentWillMount() {}
	componentDidMount() {}
	componentWillReceiveProps(nextProps) {}
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props || nextState !== this.state
	}
	componentWillUpdate(nextProps, nextState) {}
	componentDidUpdate(prevProps, preState) {}
	componentWillUnmount() {}
}
