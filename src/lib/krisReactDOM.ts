import krisReact from "./krisReact";

function setAttribute(dom, props) {
  for (let key in props) {
    console.log(key);
    if (/^on/.test(key)) {
      //对事件绑定的处理，以 on 开头的，dom[onclick] = props[onClick]
      dom[key.toLocaleLowerCase()] = props[key];
    } else if (key === "style") {
      //对 style 的处理
      Object.assign(dom.style, props[key]); //新增的会赋值到 dom.style 上，同名的属性会覆盖
    } else {
      //其他的直接作为 dom 的属性
      dom[key] = props[key];
    }
  }
}
//创建组件
function createComponent(constructor, attrs) {
  let component;
  console.log(11111, constructor.prototype instanceof krisReact.Component);

  if (constructor.prototype instanceof krisReact.Component) {
    component = new constructor(attrs); //创造一个组件对象
  } else {
    console.log(2222, attrs);

    component = new krisReact.Component(attrs); //使组件具有 state， props
    component.constructor = constructor;
    component.render = function () {
      //增加 render 方法
      return this.constructor(attrs);
    };
  }
  let vnode = component.render(); //调用他的 render 方法，得到组件对应的虚拟节点(jsx)
  let dom = createDomfromVnode(vnode); //渲染成真实的 DOM
  component.$root = dom; //方便后续拿到组件对应的真实的 DOM
  return dom;
}
//渲染组件
export function renderComponent(component) {
  let vnode = component.render();
  let dom = createDomfromVnode(vnode);

  if (component.$root && component.$root.parentNode) {
    component.$root.parentNode.replaceChild(dom, component.$root);
  }
  component.$root = dom;
}
const _render = (vnode: string | HTMLElement, container: HTMLElement) => {
  let dom = createDomfromVnode(vnode);
  container.appendChild(dom);
};
const createDomfromVnode = (vnode) => {
  if (typeof vnode === "string" || typeof vnode === "number") {
    //创建文本节点，挂载到容器中
    return document.createTextNode(vnode);
  }
  if (typeof vnode === "object") {
    if (typeof vnode.tag === "function") {
      console.log("fun", vnode);

      //当 vnode.tag 是个函数时，就去创造一个组件
      let dom = createComponent(vnode.tag, vnode.props); //第一个参数是构造函数名，第二个参数是组件的属性
      return dom; //返回的是一个真实的 DOM 节点，挂载到容器上
    }
    let dom = document.createElement(vnode.tag);
    setAttribute(dom, vnode.props);
    if (vnode.children && Array.isArray(vnode.children)) {
      vnode.children.forEach((vnodeChild) => {
        _render(vnodeChild, dom);
      });
    }

    return dom;
  }
};

export const render = (vnode: string | HTMLElement, container: HTMLElement) => {
  //每次调用 render 时，先把之前的清空
  container.innerHTML = "";
  _render(vnode, container);
};
