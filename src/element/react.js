// 创建element元素
export const createElement = (type, props, children) => {
  return new Element(type, props, children);
};

export class Element {
  constructor(type = 'div', props = {}, children = []) {
    this.type = type;
    this.props = props;
    this.children = children;
    this.key = props.key || undefined;
  }

  render() {
    let _this = this,
      { type, props, children } = _this;

    let node = document.createElement(type);
    let { key, ...reset } = props;

    Object.keys(reset).forEach(attr => {
      node.setAttribute(attr, reset[attr]);
    });
    this.renderChildren(node, children);

    return node;
  }

  // 渲染虚拟dom里面的子元素
  renderChildren(node, children) {
    children.forEach(child => {
      let childNode = (child instanceof Element) ?
        child.render() :
        document.createTextNode(child);

      node.appendChild(childNode);
    });
  };
}
