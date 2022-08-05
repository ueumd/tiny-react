import isFunctionComponent from './isFunctionComponent'
import mountNativeElement from './mountNativeElement'
import isFunction from './isFunction'
import mountElement from './mountElement'

export default function mountComponent(virtualDOM, container) {
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
	}

	/**
   解决函数组件返回函数组件
   function Heart() {
    // return <h1>&hearts&</h1>
    return <Demo />
  }
   */
	if (isFunction(nextVirtualDOM)) {
		mountElement(nextVirtualDOM, container)
	} else {
		// 普通DOM元素 渲染至页面上
		mountNativeElement(nextVirtualDOM, container)
	}
}

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
