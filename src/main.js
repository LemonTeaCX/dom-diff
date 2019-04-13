import ReactDOM from './element/react-dom';
import { createElement } from './element/react';

import diff from './dom-diff/diff';
import patch from './dom-diff/patch';
// import diffList from './dom-diff/diff-list';
// import patchList from './dom-diff/patch-list';

const box01 = createElement('ul', { class: 'list' }, [
  createElement('li', { class: 'item-1' }, ['2']),
  createElement('li', { class: 'item-3' }, ['4']),
  createElement('li', { class: 'item-5' }, ['6'])
]);

let boxNode = box01.render();

ReactDOM.render(boxNode, document.getElementById('app'));

const box02 = createElement('ul', { class: 'list-new' }, [
  createElement('li', { class: 'item-1' }, ['2']),
  createElement('div', { class: 'item-3' }, ['4']),
  createElement('li', { class: 'item-5' }, ['6'])
]);

const patches = diff(box01, box02);
patch(boxNode, patches);

/*const list01 = [ {key: 'A'}, {key: 'B'}, {key: 'C'}, {key: 'D'} ];
const list02 = [ {key: 'B'}, {key: 'A'}, {key: 'C'}, {key: 'E'} ];

const list01 = [
  createElement('div', { class: 'div-0', key: 'key-0' }, ['A']),
  createElement('div', { class: 'div-1', key: 'key-1' }, ['B']),
  createElement('div', { class: 'div-2', key: 'key-2' }, ['C']),
  createElement('div', { class: 'div-3', key: 'key-3' }, ['D'])
];

const list02 = [
  createElement('div', { class: 'div-1', key: 'key-1' }, ['B']),
  createElement('div', { class: 'div-0', key: 'key-0' }, ['A']),
  createElement('div', { class: 'div-2', key: 'key-2' }, ['C']),
  createElement('div', { class: 'div-4', key: 'key-4' }, ['E'])
];

const listPatches = diffList(list01, list02, 'key');
console.log(listPatches);

patchList(list01, listPatches);*/
