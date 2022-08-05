/**
 * 在进行 virtual DOM 转换之前还需要确定 Virtual DOM 的类 Component VS Native Element。
 * @param virtualDOM
 * @param container
 */
import mountNativeElement from './mountNativeElement'
import isFunction from './isFunction'
import mountComponent from './mountCompoent'

/**
 * mountElement
 * @param virtualDOM
 * @param container
 */
export default function mountElement(virtualDOM, container) {
	// Component VS NativeElement

	if (isFunction(virtualDOM)) {
		// Function Component
		console.log('component...')
		mountComponent(virtualDOM, container)
	} else {
		// NativeElement
		// 通过 mountNativeElement 方法转换 Native Element
		mountNativeElement(virtualDOM, container)
	}
}
