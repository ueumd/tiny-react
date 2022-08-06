/**
 * 在进行 virtual DOM 转换之前还需要确定 Virtual DOM 的类 Component VS Native Element。
 * @param virtualDOM
 * @param container
 */
import mountNativeElement from './mountNativeElement'
import isFunction from './isFunction'
import mountComponent from './mountCompoent'

/**
 * 渲染普通virtualDOM 与 类组件和函数组件
 * @param virtualDOM
 * @param container
 * @param oldDOM
 */
export default function mountElement(virtualDOM, container, oldDOM) {
	// Component VS NativeElement

	if (isFunction(virtualDOM)) {
		// Function Component
		console.log('component...')
		mountComponent(virtualDOM, container, oldDOM)
	} else {
		// NativeElement
		// 通过 mountNativeElement 方法转换 Native Element
		mountNativeElement(virtualDOM, container, oldDOM)
	}
}
