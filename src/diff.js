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

		// 使用key属性对比
		// 1. 将拥有key属性的子元素放置在一个单独的对象中
		let keyedElements = {}
		for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
			const domElement = oldDOM.childNodes[i]
			if (domElement.nodeType === 1) {
				let key = domElement.getAttribute('key')
				if (key) {
					keyedElements[key] = domElement
				}
			}
		}

		// 是否找到拥有key属性的元素
		const hasNoKey = Object.keys(keyedElements).length === 0

		if (hasNoKey) {
			// 没有key 使用索引方式 对比子节点
			virtualDOM.children.forEach((child, index) => {
				diff(child, oldDOM, oldDOM.childNodes[index])
			})
		} else {
			virtualDOM.children.forEach((child, i) => {
				// 获取要进行比对元素的key属性
				let key = child.props.key

				// key 属性存在
				if (key) {
					// 到已存在的 DOM 元素对象中查找对应的 DOM 元素
					let domElement = keyedElements[key]
					// 如果找到元素就说明该元素已经存在 不需要重新渲染
					if (domElement) {
						// 虽然 DOM 元素不需要重新渲染 但是不能确定元素的位置就一定没有发生变化
						// 所以还要查看一下元素的位置
						// 看一下 oldDOM 对应的(i)子元素和 domElement 是否是同一个元素 如果不是就说明元素位置发生了变化
						if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
							// 元素位置发生了变化
							// 将 domElement 插入到当前元素位置的前面 oldDOM.childNodes[i] 就是当前位置
							// domElement 就被放入了当前位置
							oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
						}
					} else {
						mountElement(child, oldDOM, oldDOM.childNodes[i])
					}
				}
			})
		}

		// 4. 删除节点
		// 获取旧节点
		let oldChildNodes = oldDOM.childNodes

		// 如果旧节点的数量多于要渲染的新节点的长度
		if (oldChildNodes.length > virtualDOM.children.length) {
			// // 有节点删除
			// for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
			// 	unmountNode(oldChildNodes[i])
			// }

			if (hasNoKey) {
				for (let i = oldChildNodes.length - 1; i >= virtualDOM.children.length; i--) {
					oldDOM.removeChild(oldChildNodes[i])
				}
			} else {
				for (let i = 0; i < oldChildNodes.length; i++) {
					let oldChild = oldChildNodes[i]
					let oldChildKey = oldChild._virtualDOM.props.key
					let found = false
					for (let n = 0; n < virtualDOM.children.length; n++) {
						if (oldChildKey === virtualDOM.children[n].props.key) {
							found = true
							break
						}
					}
					if (!found) {
						unmountNode(oldChild)
						i--
					}
				}
			}
		}
	}
}
