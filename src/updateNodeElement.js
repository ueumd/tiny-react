/**
 * 为元素添加属性
 * @param newElement 创建好的 DOM元素对象 div
 * @param virtualDOM
 */
export default function updateNodeElement(newElement, virtualDOM) {
	/**
   class
   props: {
    children: (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    className: "container"
   }

   // event
   props: {
     children: [{…}]
     onClick: ƒ onClick()
   }
   */

	// 获取节点对应属性对象
	const newProps = virtualDOM.props

	Object.keys(newProps).forEach(propName => {
		const newPropsValue = newProps[propName]

		// 是否是事件属性 onClick -> click
		if (propName.slice(0, 2) === 'on') {
			const eventName = propName.toLowerCase().slice(2)

			// 元素添加事件
			// 	<button onClick={() => alert('你好')}>点击我</button>
			newElement.addEventListener(eventName, newPropsValue)
		} else if (propName === 'value' || propName === 'checked') {
			newElement[propName] = newPropsValue
		} else if (propName !== 'children') {
			// 属性 className: "container"
			if (propName === 'className') {
				newElement.setAttribute('class', newPropsValue)
			} else {
				// 普通属性
				newElement.setAttribute(propName, newPropsValue)
			}
		}
	})
}
