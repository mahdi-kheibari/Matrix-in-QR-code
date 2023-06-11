import { HashRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <HashRouter>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </HashRouter>
    </HelmetProvider>
  );
}
