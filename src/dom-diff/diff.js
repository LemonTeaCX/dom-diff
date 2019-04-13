import { ATTRS, TEXT, REMOVE, REPLACE } from "./diff-type";

let elementIndex = 0; // 每个Element都有自己的index

// 对比新旧组件树的不同
const diff = (oldElement, newElement) => {
  let patches = {};

  walk(oldElement, newElement, elementIndex, patches);

  return patches;
};

// 对比每一个element元素不同
const walk = (oldElement, newElement, index, patches) => {
  let curPatches = [];

  if (isText(oldElement) && isText(newElement)) { // 文本节点
    if (newElement !== oldElement) {
      curPatches.push({ type: TEXT, text: newElement });
    }
  } else if (!newElement) { // 元素被移除
    curPatches.push({ type: REMOVE, index });
  } else if (oldElement.type === newElement.type) { // 标签相同
    let attrs = diffAttr(oldElement.props, newElement.props);

    // 属性发生改变
    if (Object.keys(attrs)[0]) {
      curPatches.push({ type: ATTRS, attrs });
    }

    // 对比子元素
    if (oldElement.children) {
      diffChildren(oldElement.children, newElement.children, patches);
    }
  } else { // 元素被替换
    curPatches.push({ type: REPLACE, newElement });
  }

  if (curPatches[0]) patches[index] = curPatches;
};

// 比较属性不同
const diffAttr = (oldAttr, newAttr) => {
  let attrs = {};

  // 旧属性发生改变
  for (let k in oldAttr) {
    if (oldAttr.hasOwnProperty(k)) {
      if (newAttr[k] !== oldAttr[k]) {
        attrs[k] = newAttr[k];
      }
    }
  }

  // 新增属性
  for (let k in newAttr) {
    if (newAttr.hasOwnProperty(k)) {
      if (!oldAttr[k]) {
        attrs[k] = newAttr[k];
      }
    }
  }

  return attrs;
};

// 比较子元素不同
const diffChildren = (oldChildren, newChildren, patches) => {
  oldChildren.forEach((child, index) => {
    walk(child, newChildren[index], ++elementIndex, patches);
  });
};

// 是否是文本
const isText = (obj) => {
  return Object.prototype.toString.call(obj) === '[object String]';
};

export default diff;
