import createDOMElement from './createDOMElement'

export default function mountNativeElement(virtualDOM, container) {
	const newElement = createDOMElement(virtualDOM)

	//将转换的DOM渲染至页面
	container.appendChild(newElement)

	// 类组件返回的 component
	let component = virtualDOM.component
	if (component) {
		component.setDOM(newElement)
	}
}

// export default function mountNativeElement(virtualDOM, container) {
//   let newElement = null
//
//   if (virtualDOM.type === 'text') {
//     // 文本节点
//     newElement = document.createTextNode(virtualDOM.props.textContent)
//   } else {
//     // 元素节点
//     newElement = document.createElement(virtualDOM.type)
//   }
//
//   // 递归创建子节点
//   virtualDOM.children.forEach((child) => {
//     mountElement(child, newElement)
//   })
//
//   //将转换的DOM渲染至页面
//   container.appendChild(newElement)
// }
