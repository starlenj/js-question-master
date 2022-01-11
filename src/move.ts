interface File {
  id: string;
  name: string;
}
interface List {
  id: string;
  name: string;
  files: File[];
}
/**    there is moved files object another array if valid
 *    @param ( list: List[], destination: string)
 *    return type: List[]
 *
 *
 */
export default function move(list: List[], source: string, destination: string): List[] {
  let moveItem: File;
  // check is item id valid
  const isValid: List[] = list.filter((items) => items.id === destination);
  // if is valid item check files object is valid
  if (isValid.length > 0) {
    list.map((item: List) => {
      const returnItem: List[] = item.files.map((files: File, index: number) => {
        // check files id is source
        if (files && files.id === source) {
          moveItem = files;
          item.files.splice(index, 1);
        }
        // check destination equals items.id
        if (item.id === destination && moveItem !== undefined) {
          item.files.push(moveItem);
        }
        return item;
      });
      // if any return item is files item is not valid
      if (returnItem.length === 0) {
        throw new Error(`You cannot move a folder`);
      }
      return returnItem;
    });
  } else {
    // destination item is not valid
    throw new Error(`You cannot specify a file as the destination`);
  }
  return list;
}
