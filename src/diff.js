import mountElement from './mountElement'

export default function diff(virtualDOM, container, oldDOM) {
	// 判断 oldDOM 是否存在
	if (!oldDOM) {
		// 如果不存在不需要对比 直接接 Virtual DOM 转换为真实DOM
		mountElement(virtualDOM, container)
	}
}
