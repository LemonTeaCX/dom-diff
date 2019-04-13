// 把虚拟dom渲染到页面已存在的container元素
const render = (node, container) => {
  container.appendChild(node);
};

export default { render };
