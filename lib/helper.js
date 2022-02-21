const { Dish } = require('../model');

exports.findTopThree = (arr) => {
  let res = {};
  const topArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (!(arr[i] in res)) {
      res[arr[i]] = 1;
    } else {
      res[arr[i]] += res[arr[i]];
    }
  }

  const sortable = Object.fromEntries(Object.entries(res).sort(([, a], [, b]) => b - a));
  Object.keys(sortable)
    .slice(0, 3)
    .map((item) => topArray.push({ dishName: item, count: res[item] }));

  return topArray;
};
