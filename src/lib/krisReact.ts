import { renderComponent } from "./krisReactDom";

export const h = (tag: string, props: any, ...children: any[]) => {
  console.log(tag);
  return {
    tag,
    props,
    children,
  };
};

class Component {
  constructor(props) {
    this.props = props; //构造组件时，需要一些属性
    this.state = {}; //组件内部有些状态/变量

    // renderComponent(this); //创建组件后，需要去渲染这个组件（变成真实的DOM放到页面上）
  }
  setState(state) {
    this.state = Object.assign(this.state, state); //额外的新增或修改，不是覆盖，所以用 Object.assign
    renderComponent(this);
  }
}

export default { Component };
