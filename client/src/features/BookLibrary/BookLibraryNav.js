import React, { useState } from 'react';

//TODO: MOVE TO ANOTHER FILE
const sortOptions = [
  {
    id: 1,
    desc: 'TITLE_ASC',
  },
  {
    id: 2,
    desc: 'TITLE_DESC',
  },
  {
    id: 3,
    desc: 'AUTHOR_ASC',
  },
  {
    id: 4,
    desc: 'AUTHOR_DESC',
  },
  {
    id: 5,
    desc: 'GENRE_ASC',
  },
  {
    id: 6,
    desc: 'GENRE_DESC',
  },
];

const bookLibraryNav = props => {
  const [sortSelect, updateSelect] = useState('TITLE_ASC');
  const [countSelect, updateCount] = useState(5);

  const handleSelect = e => {
    const { name, value } = e.target;
    if (name === 'sort') {
      updateSelect(value);
    } else if (name === 'count') {
      updateCount(value);
    }
  };

  return (
    <div>
      <label>
        SortBy:
        <select value={sortSelect} onChange={handleSelect} name='sort'>
          {sortOptions.map(sort => {
            return (
              <option key={sort.id} value={sort.desc}>
                {sort.desc}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};

export default bookLibraryNav;
