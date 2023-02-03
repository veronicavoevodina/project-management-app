function resortColumnArr(columnArrToResort: IColumnResponse[], newOrder?: number[]): IColumnRequest[] | null {
  if (columnArrToResort) {
    const newColumnsOrder: IColumnRequest[] = [];
    columnArrToResort.forEach((column, index) => {
      let newColumnOrder: { _id: string; order: number };
      if (newOrder) {
        newColumnOrder = { _id: column._id, order: newOrder[index] };
      } else {
        newColumnOrder = { _id: column._id, order: index };
      }
      newColumnsOrder.push(newColumnOrder);
    });

    let isChanged = false;
    newColumnsOrder.forEach((column, index) => {
      if (column._id !== columnArrToResort[index]._id || column.order !== columnArrToResort[index].order) {
        isChanged = true;
        return;
      }
    });

    if (isChanged) {
      return newColumnsOrder;
    }
    return null;
  }
}

export default resortColumnArr;
