import React, { useState } from 'react';
import PrimaryButton from '../../shared/buttons/PrimaryButton.js';
import PrimarySelect from '../../shared/selects/PrimarySelect.js';

//TODO: MOVE TO ANOTHER FILE
const sortOptions = [
  {
    key: 1,
    desc: 'TITLE_ASC',
  },
  {
    key: 2,
    desc: 'TITLE_DESC',
  },
  {
    key: 3,
    desc: 'AUTHOR_ASC',
  },
  {
    key: 4,
    desc: 'AUTHOR_DESC',
  },
  {
    key: 5,
    desc: 'GENRE_ASC',
  },
  {
    key: 6,
    desc: 'GENRE_DESC',
  },
];

const defaultConfig = {
  page: 1,
  limit: 5,
  sortBy: 'TITLE_ASC',
};

const bookLibraryHeader = props => {
  const handleSelect = async e => {
    const { name, value } = e.target;
    props.updateConfig({ ...props.config, [name]: value });
  };

  return (
    <div>
      <PrimaryButton description='Add Book' handleClick={props.handleAddBook} />
      <PrimarySelect
        label='SortBy'
        name='sortBy'
        value={props.config.sortBy}
        options={sortOptions}
        onChange={handleSelect}
      />
    </div>
  );
};

export default bookLibraryHeader;
