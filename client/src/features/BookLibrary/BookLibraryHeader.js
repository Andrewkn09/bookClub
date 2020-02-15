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

const defaultConfig = {
  page: 1,
  limit: 5,
  sortBy: 'TITLE_ASC',
};

const bookLibraryHeader = props => {
  const [config, updateConfig] = useState(defaultConfig);

  const handleSelect = e => {
    const { name, value } = e.target;
    updateConfig(prevState => {
      return { ...prevState, [name]: value };
    });

    props.updateConfig(config);
  };

  return (
    <div>
      <label>
        SortBy:
        <select value={config.sortBy} onChange={handleSelect} name='sortBy'>
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

export default bookLibraryHeader;
