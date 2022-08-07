/**
 * 卸载节点并不是说将节点直接删除就可以了，还需要考虑以下几种情况
 *
 * 如果要删除的节点是文本节点的话可以直接删除
 * 如果要删除的节点由组件生成，需要调用组件卸载生命周期函数
 * 如果要删除的节点中包含了其他组件生成的节点，需要调用其他组件的卸载生命周期函数
 * 如果要删除的节点身上有 ref 属性，还需要删除通过 ref 属性传递给组件的 DOM 节点对象
 * 如果要删除的节点身上有事件，需要删除事件对应的事件处理函数
 * @param dom
 */
export default function unmountNode(dom) {
	const virtualDOM = dom._virtualDOM

	// 1. 文本节点可以直接删除
	if (virtualDOM.type === 'text') {
		dom.remove()

		return
	}

	// 2. 查看节点是否由组件生成
	let component = virtualDOM.component
	if (component) {
		// 调用组件卸载生命周期函数
		component.componentWillMount()
	}

	// 3. 如果节点具有 ref 属性 通过再次调用 ref 方法 将传递给组件的DOM对象删除
	if (virtualDOM.props && virtualDOM.props.ref) {
		virtualDOM.props.ref(null)
	}

	// 4. 事件处理
	Object.keys(virtualDOM.props).forEach(propName => {
		if (propName.slice(0, 2) === 'on') {
			const eventName = propName.toLowerCase().slice(2)
			const eventHandler = virtualDOM.props[eventName]
			dom.removeEventListener(eventName, eventHandler)
		}
	})

	// 5. 递归删除子节点
	if (dom.childNodes.length > 0) {
		for (let i = 0; i < dom.childNodes.length; i++) {
			unmountNode(dom.childNodes[i])
			i--
		}
	}

	dom.remove()
}
