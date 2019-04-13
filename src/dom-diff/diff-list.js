/*[
 {type: 'MOVE', fromIndex: 1, toIndex: 0},
 {type: 'MOVE', fromIndex: 0, toIndex: 1},
 {type: 'INSERT', toIndex: 3, item: {key: 'E'}},
 {type: 'REMOVE', fromIndex: 3},
]*/
/*
* {
*   type: '',
*   fromIndex: 0,
*   toIndex: 0,
*   item: null
* }
* */
// const list01 = [ {key: 'A'}, {key: 'B'}, {key: 'C'}, {key: 'D'} ];
// const list02 = [ {key: 'B'}, {key: 'A'}, {key: 'C'}, {key: 'E'} ];

// { A:0, B:1, C:2, D:3 }
// { B:0, A:1, C:2, E:3 }

const MOVE = 'MOVE';
const INSERT = 'INSERT';
const REMOVE = 'REMOVE';

const diffList = (oldList, newList, key) => {
  let patches = [],
    oldMap = keyMap(oldList, key),
    newMap = keyMap(newList, key);

  Object.keys(newMap).forEach(newItem => {
    let fromIndex = oldMap[newItem],
      toIndex = newMap[newItem];

    if (fromIndex !== undefined) { // oldList有,需要移动
      if (fromIndex !== toIndex) { // 位置有发生改变
        patches.push({
          type: MOVE,
          fromIndex,
          toIndex,
        });
      }
    } else { // oldList没有，需要添加
      patches.push({
        type: INSERT,
        toIndex,
        item: newList[toIndex]
      });
    }
  });

  Object.keys(oldMap).forEach(oldItem => {
    let fromIndex = oldMap[oldItem],
      toIndex = newMap[oldItem];

    if (toIndex === undefined) { // newList没有，需要删除
      patches.push({
        type: REMOVE,
        fromIndex
      });
    }
  });

  return patches;
};

// 把list转换成json对象 [ {key: 'A'}, {key: 'B'}, {key: 'C'} ] ------> { A:0, B:1, C:2 }
const keyMap = (arr, key) => {
  let map = {};

  arr.forEach((item, index) => {
    if (item[key]) {
      map[item[key]] = index;
    }
  });

  return map;
};

// 根据map的value值获取key
/*const getKeyFromMap = (value, map) => {
  let key = null;

  for (let k in map) {
    if (map.hasOwnProperty(k)) {
      if (map[k] === value) {
        key = k;
      }
    }
  }

  return key;
};*/

export default diffList;
