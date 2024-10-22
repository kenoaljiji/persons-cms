import React from 'react';
import GridItems from '../../components/GridItems';
import Search from '../../components/Search';
import { useRouteContext } from '../../context/route/RouteProvider';

const Home = () => {
  const { state } = useRouteContext();
  const { headersData } = state;

  const { logoImgPath } = headersData;

  const url = new URL(window.location.origin);

  return (
    <div>
      <Search />
      <GridItems />
    </div>
  );
};
export default Home;
