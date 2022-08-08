import isFunction from './isFunction'

export default function isFunctionComponent(virtualDOM) {
	const type = virtualDOM.type

	// 函数组件
	// 是否是函数 原型上没有render方法
	return type && isFunction(virtualDOM) && !(type.prototype && type.prototype.render)
}
