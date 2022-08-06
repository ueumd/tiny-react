import isFunctionComponent from './isFunctionComponent'
import mountNativeElement from './mountNativeElement'
import isFunction from './isFunction'

/**
 * 渲染 类组件 与 函数组件
 * @param virtualDOM
 * @param container
 * @param oldDOM
 */
export default function mountComponent(virtualDOM, container, oldDOM) {
	let nextVirtualDOM = null
	// 函数组件 VS 类组件
	if (isFunctionComponent(virtualDOM)) {
		console.log('function component...')
		nextVirtualDOM = buildFunctionComponent(virtualDOM)

		/**
     {
       children: [{…}]
       props: {children: Array(1)}
       type: "h1"
     }
     */
		console.log(nextVirtualDOM)
	} else {
		// class component
		console.log('class component...')
		nextVirtualDOM = buildClassComponent(virtualDOM)
	}

	/**
   继续判断
   解决函数组件返回函数组件
   function Heart() {
    // return <h1>&hearts&</h1>
    return <Demo />
  }
   */
	if (isFunction(nextVirtualDOM)) {
		mountComponent(nextVirtualDOM, container, oldDOM)
	} else {
		// 普通DOM元素 渲染至页面上
		mountNativeElement(nextVirtualDOM, container, oldDOM)
	}
}

// 函数组件
function buildFunctionComponent(virtualDOM) {
	/**
   {
    children: []
    props: {
      children: []
      title: "Hello React"
    }
    type: ƒ Heart(props)
   }
   */
	return virtualDOM.type(virtualDOM.props || {})
}

// 类组件
function buildClassComponent(virtualDOM) {
	// component 实例化类组件
	const component = new virtualDOM.type(virtualDOM.props || {})

	const nextVirtualDOM = component.render()

	// 挂载类组件实例 修改组件状态 更新DOM时需要用
	// 传给 mountNativeElement
	nextVirtualDOM.component = component

	return nextVirtualDOM
}
