export default function isFunction(virtualDOM) {
	/**
   {
     children: []
     props: {children: Array(0)}
     type: ƒ Heart()
   }
   */
	return virtualDOM && typeof virtualDOM.type === 'function'
}
