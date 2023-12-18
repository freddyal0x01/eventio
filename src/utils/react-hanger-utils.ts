export const updateArrayMemberById = ({ array, id, update }) => {
  const updated = array.value.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...update,
      };
    }
    return item;
  });

  array.setValue(updated);
};
