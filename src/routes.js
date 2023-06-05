import { Navigate, useRoutes } from 'react-router-dom';
//
import SimpleLayout from './layouts/simple/SimpleLayout';
import Page404 from './pages/Page404';
import QRPage from './pages/QRPage';
import ScanPage from './pages/ScanPage';
import GeneratePage from './pages/GeneratePage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/QR',
      element: <QRPage />,
    },
    {
      path: '/QR/generate',
      element: <GeneratePage />,
    },
    {
      path: '/QR/scan',
      element: <ScanPage />,
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
