import Home from './pages/home/Home';
import './App.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './layout/Layout';
import News from './pages/news/News';
import About from './pages/about/About';
import Partners from './pages/partners/Partners';
import PersonOfInterest from './pages/personofInterest/PersonOfInterest';
import Author from './pages/author/Author';
import SearchResult from './pages/searchResult/SearchResult';
import AuthLayout from './layout/AuthLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Posts from './pages/posts/Posts';
import UsersPage from './pages/usersPage/UsersPage';
import LoginPage from './pages/loginPage/LoginPage';
import HeaderItems from './pages/header/HeaderItems';
import FooterItems from './pages/footer/FooterItems';
import CreateEditUser from './pages/createEditUser/CreateEditUser';
import transformPath from './utils/transformPath';
import { useRouteContext } from './context/route/RouteProvider';
import ProtectedRoute from './routes/ProtectedRoute';
import CreateEditPost from './pages/createEditPost/CreateEditPost';
import SingleNews from './pages/singleNews/SingleNews';
import SortPersons from './pages/sortPersons/SortPersons';
import PersonEditPage from './pages/personEditPage/PersonEditPage';
import IpVisitorPage from './pages/ipVisitorPage/IpVisitorPage';
import { PreviewState } from './context/previewContext/PreviewState';
import PreviewAuthor from './pages/previewAuthor/PreviewAuthor';
import PreviewNewsAndPage from './pages/previewNewsAndPage/PreviewNewsAndPage';
import { ThemeContext } from './context/theme/ThemeContext';
import React, { useContext } from 'react';
import MaintenancePage from './pages/maintenancePage/MaintenancePage';
import NotFound from './pages/notFound/NotFound';
import BackupPage from './pages/backupPage/BackupPage';
import SearchInfo from './pages/searchInfo/SearchInfo';

function App() {
  const { state } = useRouteContext();
  const { maintenance } = useContext(ThemeContext);
  const { headersData } = state;
  const { routes } = headersData;
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  if (maintenance === 0 && !isAdminRoute) {
    return <MaintenancePage />;
  } else
    return (
      <PreviewState>
        <Routes>
          <Route path={'*'} element={<NotFound />} />
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />

            <Route
              path={transformPath(routes.person)}
              element={<PersonOfInterest />}
            />
            <Route path={transformPath(routes.news)} element={<News />} />
            <Route path={transformPath(routes.about)} element={<About />} />
            <Route
              path={transformPath(`${routes.news}/:slug`)}
              element={<SingleNews />}
            />
            <Route
              path={transformPath(routes.partners)}
              element={<Partners />}
            />
            <Route path='/search' element={<SearchResult />} />
            <Route path='/search/info' element={<SearchInfo />} />
            <Route path='/person-of-interest/:id' element={<Author />} />
            <Route path='/person-of-interest/:id/:title' element={<Author />} />
          </Route>

          <Route path={`/admin`} element={<LoginPage />} />
          <Route path={'/admin'} element={<AuthLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='posts' element={<Posts />} />
              <Route path='users' element={<UsersPage />} />
              <Route path='sort-person' element={<SortPersons />} />
              <Route path='header-items' element={<HeaderItems />} />
              <Route path='footer-items' element={<FooterItems />} />
              <Route path='ip-visitors' element={<IpVisitorPage />} />
              <Route path='post/preview' element={<PreviewAuthor />} />
              <Route path='backup' element={<BackupPage />} />
              <Route
                path='news-page/preview'
                element={<PreviewNewsAndPage />}
              />
              <Route path='users/create-edit' element={<CreateEditUser />} />
              <Route path='posts/create-edit' element={<CreateEditPost />} />
              <Route
                path='posts/person-edit/:id'
                element={<PersonEditPage />}
              />
              <Route
                path='users/create-edit/:id'
                element={<CreateEditUser />}
              />
              <Route
                path='posts/create-edit/:category/:id'
                element={<CreateEditPost />}
              />
            </Route>
          </Route>
        </Routes>
      </PreviewState>
    );
}
export default App;
