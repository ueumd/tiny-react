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
function createElement(type, props) {
  var _ref2;

  for (var _len2 = arguments.length, children = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    children[_key2 - 2] = arguments[_key2];
  }

  // 拷贝children 到新数组里
  // child 子节点
  var childElements = (_ref2 = []).concat.apply(_ref2, children).reduce(function (result, child) {
    // 解决 子元素类型 刨除 null true false  	{2 === 1 && <div>如果2和1相等渲染当前内容</div>}
    if (child !== false && child !== true && child !== null) {
      if (child instanceof Object) {
        result.push(child);
      } else {
        // 文本节点 变成对象形式

        /**
             children: []
             props: {textContent: '你好 Tiny React'}
             type: "text"
             */
        result.push(createElement('text', {
          textContent: child
        }));
      }
    } // 将需要保留的 Virtual DOM 放入 result 数组


    return result;
  }, []);

  return {
    type: type,
    props: Object.assign({
      children: childElements
    }, props),
    // 通过props.children 拿到子节点
    children: childElements
  };
}

/**
 * 为元素添加属性
 * @param newElement 创建好的 DOM元素对象 div
 * @param virtualDOM
 */
function updateNodeElement(newElement, virtualDOM) {
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
  var newProps = virtualDOM.props;
  Object.keys(newProps).forEach(function (propName) {
    var newPropsValue = newProps[propName]; // 是否是事件属性 onClick -> click

    if (propName.slice(0, 2) === 'on') {
      var eventName = propName.toLowerCase().slice(2); // 元素添加事件
      // 	<button onClick={() => alert('你好')}>点击我</button>

      newElement.addEventListener(eventName, newPropsValue);
    } else if (propName === 'value' || propName === 'checked') {
      newElement[propName] = newPropsValue;
    } else if (propName !== 'children') {
      // 属性 className: "container"
      if (propName === 'className') {
        newElement.setAttribute('class', newPropsValue);
      } else {
        // 普通属性
        newElement.setAttribute(propName, newPropsValue);
      }
    }
  });
}

function createDOMElement(virtualDOM) {
  var newElement = null;

  if (virtualDOM.type === 'text') {
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type); // console.log(newElement)
    // 元素结点属性

    updateNodeElement(newElement, virtualDOM);
  } // 递归创建子节点


  virtualDOM.children.forEach(function (child) {
    mountElement(child, newElement);
  });
  return newElement;
}

function mountNativeElement(virtualDOM, container) {
  var newElement = createDOMElement(virtualDOM); //将转换的DOM渲染至页面

  container.appendChild(newElement);
} // export default function mountNativeElement(virtualDOM, container) {
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

/**
 * 在进行 virtual DOM 转换之前还需要确定 Virtual DOM 的类 Component VS Native Element。
 * @param virtualDOM
 * @param container
 */
/**
 * mountElement
 * @param virtualDOM
 * @param container
 */

function mountElement(virtualDOM, container) {
  // Component VS NativeElement
  // 通过 mountNativeElement 方法转换 Native Element
  mountNativeElement(virtualDOM, container);
}

function diff(virtualDOM, container, oldDOM) {
  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    // 如果不存在不需要对比 直接接 Virtual DOM 转换为真实DOM
    mountElement(virtualDOM, container);
  }
}

function render(virtualDOM, container, oldDOM) {
  diff(virtualDOM, container, oldDOM);
}

var index = {
  createElement: createElement,
  render: render
};
/**
 * render -> diff -> mountElement -> mountNativeElement
 */

export { index as default };
//# sourceMappingURL=tiny-react.js.map
