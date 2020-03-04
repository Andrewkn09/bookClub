export const formatDate = dateStr => {
  let date = dateStr.slice(0, 10).split('-');
  let year = date[0].slice(2);
  let month = date[1];
  let day = date[2];

  return [month, day, year].join('/');
};
