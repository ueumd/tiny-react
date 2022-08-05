/**
 * 在进行 virtual DOM 转换之前还需要确定 Virtual DOM 的类 Component VS Native Element。
 * @param virtualDOM
 * @param container
 */
import mountNativeElement from './mountNativeElement'

/**
 * mountElement
 * @param virtualDOM
 * @param container
 */
export default function mountElement(virtualDOM, container) {
	// Component VS NativeElement
	// 通过 mountNativeElement 方法转换 Native Element
	mountNativeElement(virtualDOM, container)
}
