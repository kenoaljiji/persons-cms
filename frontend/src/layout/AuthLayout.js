import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthHeader from './AuthHeader';
import './style/auth.scss';

function AuthLayout() {
  return (
    <div className='admin'>
      <AuthHeader />
      <Outlet />
    </div>
  );
}

export default AuthLayout;
