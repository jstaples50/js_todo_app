const sortByDate = (arr) => {
  arr.sort((a, b) => {
    const dateA = a.date;
    const dateB = b.date;

    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  });
};

const sortByPriority = (arr) => {
  const hasHighPriority = arr.filter((todo) => todo.highPriority === true);
  const noPriority = arr.filter((todo) => todo.highPriority === false);
  const allPriority = [...hasHighPriority, ...noPriority];

  return allPriority;
};

export const sortByStatusAndDate = (arr) => {
  const statusZeroArray = arr.filter((todo) => todo.status === 0);
  const statusOneArray = arr.filter((todo) => todo.status === 1);
  const statusTwoArray = arr.filter((todo) => todo.status === 2);

  const totalStatusArray = [statusZeroArray, statusOneArray, statusTwoArray];

  const allArrays = totalStatusArray.map((statusArray) => {
    sortByDate(statusArray);
    return sortByPriority(statusArray);
  });
  return allArrays.flat();
};

export const getAllCategoryStrings = (categoriesToShow) => {
  return categoriesToShow.map((c) => c.title);
};
