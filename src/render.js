import diff from './diff'

/**
 * @param virtualDOM
 * @param container
 * @param oldDOM
 *
 * container.firstChild jsx都有一个父级元素
 */
export default function render(virtualDOM, container, oldDOM = container.firstChild) {
	diff(virtualDOM, container, oldDOM)
}
