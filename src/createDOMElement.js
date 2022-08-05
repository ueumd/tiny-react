import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'

export default function createDOMElement(virtualDOM) {
	let newElement = null

	if (virtualDOM.type === 'text') {
		// 文本节点
		newElement = document.createTextNode(virtualDOM.props.textContent)
	} else {
		// 元素节点
		newElement = document.createElement(virtualDOM.type)
		// console.log(newElement)

		// 元素结点属性
		updateNodeElement(newElement, virtualDOM)
	}

	// virtualDEOM 对比
	// _virtualDOM 存放当前元素的virtualDOM
	newElement._virtualDOM = virtualDOM

	// 递归创建子节点
	virtualDOM.children.forEach(child => {
		mountElement(child, newElement)
	})

	return newElement
}
