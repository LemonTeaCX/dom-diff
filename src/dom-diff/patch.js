import { ATTRS, TEXT, REMOVE, REPLACE } from "./diff-type";

let patches = {},
  nodeIndex = 0;

// 给node打补丁patches
const patch = (node, patch) => {
  patches = patch;
  walk(node);
};

// 根据不同的patches更新新组件树
const walk = (node) => {
  let curPatches = patches[nodeIndex++] || [];

  node.childNodes.forEach(child => walk(child));
  curPatches.forEach(patch => {
    switch (patch.type) {
      case ATTRS:
        Object.keys(patch.attrs).forEach(attr => {
          node.setAttribute(attr, patch.attrs[attr]);
        });
        break;
      case TEXT:
        node.textContent = patch.text;
        break;
      case REMOVE:
        node.parentNode.removeChild(node);
        break;
      case REPLACE:
        let newElement = patch.newElement,
          newNode = (typeof newElement === 'string')
            ? document.createTextNode(newElement)
            : newElement.render();

        node.parentNode.replaceChild(newNode, node);
        break;
      default:
        break;
    }
  });
};

export default patch;
