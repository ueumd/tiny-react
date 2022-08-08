/**
 * 创建 Virtual DOM
 * @param {string} type 类型
 * @param {object | null} props 属性
 * @param  {createElement[]} children 子元素
 * @return {object} Virtual DOM
 * {
 *   type: "div",
 *   props: null,
 *   children: [{type: "text", props: {textContent: "Hello"}}]
 * }
 */
export default function createElement(type, props, ...children) {
	// 拷贝children 到新数组里
	// child 子节点
	const childElements = [].concat(...children).reduce((result, child) => {
		// 解决 子元素类型 刨除 null true false  	{2 === 1 && <div>如果2和1相等渲染当前内容</div>}
		if (child !== false && child !== true && child !== null) {
			if (child instanceof Object) {
				result.push(child)
			} else {
				// 文本节点 变成对象形式
				/**
         children: []
         props: {textContent: '你好 Tiny React'}
         type: "text"
         */
				result.push(createElement('text', { textContent: child }))
			}
		}
		// 将需要保留的 Virtual DOM 放入 result 数组
		return result
	}, [])

	return {
		type,
		props: Object.assign({ children: childElements }, props), // 通过props.children 拿到子节点
		children: childElements
	}
}
