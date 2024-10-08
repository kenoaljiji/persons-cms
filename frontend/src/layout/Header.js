import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import { useLocation } from 'react-router-dom';
import './style/header.scss';
import CustomSearch from '../components/CustomSearch';
import { useRouteContext } from '../context/route/RouteProvider';
import HeaderTextComponent from '../components/headerTextComponent/HeaderTextComponent';
import { ThemeContext } from '../context/theme/ThemeContext';

const Header = ({ handleClick, isActive }) => {
  const { state } = useRouteContext();
  const { theme } = useContext(ThemeContext);
  const { headersData } = state;

  const { routes, buttons, logoImgPath } = headersData;
  const location = useLocation(); // This hook provides access to the location object
  const { pathname } = location;

  const moveLeftOnActive = {
    left: isActive ? '10px' : '-6px',
  };

  const CustomLink = ({ to, children }) => {
    return (
      <Link to={to} onClick={handleClick}>
        {children}
      </Link>
    );
  };

  const headerClass = pathname === '/' ? 'margin-reduce' : '';

  return (
    <div className={`header-container ${headerClass}`}>
      <header
        className='header'
        style={{
          borderBottom: pathname !== '/' && logoImgPath && '1px solid #dedede',
          background: theme.headerColor,
        }}
      >
        {logoImgPath && (
          <div className='d-flex justify-content-between'>
            <div className='col-sm d-flex'>
              <div
                className={`hamburger-menu`}
                style={moveLeftOnActive}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
              >
                <span className={`bar bar-top ${isActive ? 'animate0' : ''}`} />
                <span className={`bar bar-middle ${isActive ? 'hide' : ''}`} />
                <span
                  className={`bar bar-bottom ${isActive ? 'animate2' : ''}`}
                />
              </div>
              {logoImgPath && (
                <>
                  <Link to={'/'}>
                    <img
                      src={logoImgPath ? logoImgPath : null}
                      alt='Logo'
                      className='d-inline-block align-top mt-1 logo'
                    />
                  </Link>
                  <Navbar />
                </>
              )}
            </div>

            {pathname !== '/' ? <CustomSearch type={'custom-search'} /> : null}

            <div className='row align-items-center justify-content-end'>
              <div className='col-sm d-flex'>
                <div className='cta-buttons d-flex'>
                  <button
                    style={{ color: theme.headerTextColor }}
                    type='button'
                    className=''
                    onClick={() =>
                      (window.location.href = '/' + routes?.shop.toLowerCase())
                    }
                  >
                    {routes?.shop}
                  </button>
                  <button
                    type='button'
                    className='button1'
                    onClick={() =>
                      (window.location.href =
                        '/' + buttons?.button1.toLowerCase())
                    }
                  >
                    {buttons?.button1}
                  </button>
                  <button
                    type='button'
                    className='button2 btn-last'
                    onClick={() =>
                      (window.location.href =
                        '/' + buttons?.button2.toLowerCase())
                    }
                  >
                    {buttons?.button2}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      <HeaderTextComponent />
    </div>
  );
};

export default Header;
