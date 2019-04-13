const MOVE = 'MOVE';
const INSERT = 'INSERT';
const REMOVE = 'REMOVE';

/*[
  {type: "MOVE", fromIndex: 1, toIndex: 0}
  {type: "MOVE", fromIndex: 0, toIndex: 1}
  {type: "INSERT", toIndex: 3, item: {…}}
  {type: "REMOVE", fromIndex: 3}
]
const list01 = [ {key: 'A'}, {key: 'B'}, {key: 'C'}, {key: 'D'} ];
const list02 = [ {key: 'B'}, {key: 'A'}, {key: 'C'}, {key: 'E'} ];
*/

const patchList = (list, patches) => {
  let newList = [];

  patches.forEach(patch => {
    switch (patch.type) {
      case MOVE:
        newList[patch.toIndex] = list[patch.fromIndex];
        break;
      case INSERT:
        newList[patch.toIndex] = patch.item;
        break;
      case REMOVE:

        break;
      default:
        break;
    }
  });

  console.log(123, newList);
  list = newList;
};

export default patchList;
