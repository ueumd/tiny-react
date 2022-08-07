import createDOMElement from './createDOMElement'
import unmountNode from './unmountNode'

export default function mountNativeElement(virtualDOM, container, oldDOM) {
	const newElement = createDOMElement(virtualDOM)

	if (oldDOM) {
		// 新增DOM时插入指定的顺序
		container.insertBefore(newElement, oldDOM)
	} else {
		//将转换的DOM渲染至页面
		container.appendChild(newElement)
	}

	// 判断旧的DOM对象是否存在 如果存在 删除
	if (oldDOM) {
		unmountNode(oldDOM)
	}

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
