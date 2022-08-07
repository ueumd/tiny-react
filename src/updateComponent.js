import diff from './diff'

export default function updateComponent(virtualDOM, oldComponent, oldDOM, container) {
	// 调用生命周期函数
	oldComponent.componentWillReceiveProps(virtualDOM.props)

	if (oldComponent.shouldComponentUpdate(virtualDOM.props)) {
		// 未更新前的props
		let prevProps = oldComponent.props

		oldComponent.componentWillUpdate(virtualDOM.props)
		// 组件更新
		oldComponent.updateProps(virtualDOM.props)

		// 获取组件返回的最新的virtualDOM
		let nextVirtualDOM = oldComponent.render()

		// 更新 component 组件实例对象
		nextVirtualDOM.component = oldComponent

		// 比对
		diff(nextVirtualDOM, container, oldDOM)

		oldComponent.componentDidUpdate(prevProps)
	}
}
