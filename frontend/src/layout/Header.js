import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import { useLocation } from 'react-router-dom';
import './style/header.scss';
import CustomSearch from '../components/CustomSearch';
import { useRouteContext } from '../context/route/RouteProvider';
import { ThemeContext } from '../context/theme/ThemeContext';

const Header = ({ handleClick, isActive }) => {
  const { state } = useRouteContext();
  const { theme } = useContext(ThemeContext);
  const { headersData } = state;

  const { logoImgPath } = headersData;
  const location = useLocation(); // This hook provides access to the location object
  const { pathname } = location;

  const moveLeftOnActive = {
    left: isActive ? '10px' : '-6px',
  };

  const headerClass = pathname === '/' ? 'margin-reduce' : '';

  return (
    <div className={`header-container ${headerClass}`}>
      <header
        className='header'
        style={{
          borderBottom: logoImgPath && '1px solid #dedede',
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
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
