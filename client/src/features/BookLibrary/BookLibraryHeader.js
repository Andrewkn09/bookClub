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

const countOptions = [
  { key: 1, desc: 5 },
  { key: 2, desc: 10 },
  { key: 3, desc: 20 },
];

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
      <PrimarySelect
        label='Limit'
        name='limit'
        value={props.config.limit}
        options={countOptions}
        onChange={handleSelect}
      />

      <PrimaryButton description='Update' handleClick={props.updateList} />
    </div>
  );
};

export default bookLibraryHeader;
