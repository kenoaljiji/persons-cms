import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/theme/ThemeContext';

const CustomSearch = ({ type }) => {
  const [value, setValue] = useState('');
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const onClickHandeler = () => {
    if (value !== '') {
      navigate(`/search?words=${value}&sort=relevance&page=1`);
    } else navigate(`/search?words=${value}`);
  };

  return (
    <form
      className={`d-flex items-center ${type}`}
      onSubmit={(e) => {
        e.preventDefault(e);
        onClickHandeler();
      }}
      style={{ marginRight: '7px' }}
    >
      <input
        type='text'
        aria-label='Search'
        value={value}
        onChange={(e) => {
          e.preventDefault(e);
          setValue(e.target.value);
        }}
        placeholder='Search'
        style={{
          border: '0',
          borderBottom: '2px solid #2e2b2b',
          outline: 'none',
          marginTop: '3px',
          marginRight: '2px',
          backgroundColor:
            theme.headerColor !== '#fff' ? 'transparent' : 'initial',
          color: theme.headerColor !== '#fff' ? '#fff' : 'initial',
          width: '200px',
        }}
      />
      {theme.headerColor !== '#fff' ? (
        <img
          src='/assets/images/magnifier-white.png'
          alt=''
          onClick={() => onClickHandeler()}
          style={{
            width: '16px',
            position: 'relative',
            top: '-2px',
          }}
        />
      ) : (
        <img
          src='/assets/images/magnifier-green.png'
          alt=''
          onClick={() => onClickHandeler()}
          style={{
            width: '16px',
            position: 'relative',
            top: '-2px',
          }}
        />
      )}
    </form>
  );
};

export default CustomSearch;
