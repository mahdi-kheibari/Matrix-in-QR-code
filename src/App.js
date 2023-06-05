import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// context
import Context from './store';
// animate css
import 'animate.css';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Context>
          <ThemeProvider>
              <Router />
          </ThemeProvider>
        </Context>
      </BrowserRouter>
    </HelmetProvider>
  );
}
