import mountElement from './mountElement'
import updateTextNode from './updateTextNode'

export default function diff(virtualDOM, container, oldDOM) {
	const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
	// 判断 oldDOM 是否存在
	if (!oldDOM) {
		// 如果不存在不需要对比 直接接 Virtual DOM 转换为真实DOM
		mountElement(virtualDOM, container)
	} else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
		// 类型节点是否相同
		if (virtualDOM.type === 'text') {
			// 更新内容
			updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
		} else {
			// 更新元素属性
			updateElementNode(oldDOM, virtualDOM, oldVirtualDOM)
		}

		// 对比子元素
		virtualDOM.children.forEach((child, index) => {
			diff(child, oldDOM, oldDOM.childNodes[index])
		})
	}
}
