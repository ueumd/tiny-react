export default function updateTextNode(virtualDOM, oldVirtualDOM, oldDOM) {
	// 内容被更改了
	if (virtualDOM.props.textContent !== oldVirtualDOM.props.textContent) {
		oldDOM.textContent = virtualDOM.props.textContent
		oldDOM._virtualDOM = virtualDOM
		console.dir(oldDOM)
	}
}
