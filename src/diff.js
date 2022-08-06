import mountElement from './mountElement'
import updateTextNode from './updateTextNode'
import updateNodeElement from './updateNodeElement'
import createDOMElement from './createDOMElement'
import unmountNode from './unmountNode'
import diffComponent from './diffComponent'

/**
 * 创建DOM 与 对比
 * @param virtualDOM
 * @param container
 * @param oldDOM
 *
 * 1. 节点不同（创建新DOM，替换原DOM）
 * 2. 更新文本内容
 * 3. 更新节点属性
 * 4. 删除节点
 * 5. 组件对比
 *
 */
export default function diff(virtualDOM, container, oldDOM) {
	const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
	// 判断 oldDOM 是否存在
	if (!oldDOM) {
		// 如果不存在不需要对比 直接接 Virtual DOM 转换为真实DOM
		mountElement(virtualDOM, container)
	} else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function') {
		// 1. 节点不同 创建新DOM 替换原来的DOM
		const newElement = createDOMElement(virtualDOM)
		oldDOM.parentNode.replaceChild(newElement, oldDOM)
	} else if (typeof virtualDOM.type === 'function') {
		// oldComponent 组件要更新的实例对象
		const oldComponent = oldVirtualDOM.component
		// 组件对比
		diffComponent(virtualDOM, oldComponent, oldDOM, container)
	} else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
		// 类型节点是否相同

		// 本文节点
		if (virtualDOM.type === 'text') {
			// 2. 更新内容
			updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
		} else {
			// 3. 更新节点属性
			updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
		}

		// 对比子节点
		virtualDOM.children.forEach((child, index) => {
			diff(child, oldDOM, oldDOM.childNodes[index])
		})

		// 4. 删除节点
		// 获取旧节点
		let oldChildNodes = oldDOM.childNodes

		// 判断旧节点数量
		if (oldChildNodes.length > virtualDOM.children.length) {
			// 有节点删除
			for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
				unmountNode(oldChildNodes[i])
			}
		}
	}
}
