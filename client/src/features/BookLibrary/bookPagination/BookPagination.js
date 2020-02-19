import React, { Fragment } from 'react';

const BookPagination = ({
  config,
  totalPages = 9,
  pageRows = 5,
  updateConfig,
}) => {
  const { page } = config;
  let maxLeft = page - Math.floor(pageRows / 2);
  let maxRight = page + Math.floor(pageRows / 2);
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = pageRows;
  }

  if (maxRight > totalPages) {
    maxLeft = totalPages - (pageRows - 1);

    //Condition if totalPages < pageRows
    if (maxLeft < 1) maxLeft = 1;

    maxRight = totalPages;
  }

  const buttonRange = range(maxLeft, maxRight, 1);
  const handleClick = e => {
    e.preventDefault();
    updateConfig({ ...config, page: Number(e.target.value) });
  };
  return (
    <div>
      {page > 1 ? (
        <Fragment>
          <button value={1} onClick={handleClick}>
            First
          </button>
          <button value={page - 1} onClick={handleClick}>
            {'<'}
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <button disabled>First</button>
          <button disabled>{'<'}</button>
        </Fragment>
      )}
      {buttonRange.map(page => {
        return (
          <button key={page} value={page} onClick={handleClick}>
            {page}
          </button>
        );
      })}
      {page < totalPages ? (
        <Fragment>
          <button value={page + 1} onClick={handleClick}>
            {'>'}
          </button>
          <button value={totalPages} onClick={handleClick}>
            Last
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <button disabled>{'>'}</button>
          <button disabled>Last</button>
        </Fragment>
      )}
    </div>
  );
};

export default BookPagination;
