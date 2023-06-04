import { Navigate, useRoutes } from 'react-router-dom';
//
import SimpleLayout from './layouts/simple/SimpleLayout';
import Page404 from './pages/Page404';
import QRPage from './pages/QRPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/QR',
      element: <QRPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/QR" />, index: true },
        { path: '*', element: <Page404 /> },
      ],
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ]);

  return routes;
}
