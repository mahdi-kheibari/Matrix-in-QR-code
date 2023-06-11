import { Outlet, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Box } from '@mui/material';
// css
import '../../assets/css/transition.css'
// footer
import AppFooter from '../footer/AppFooter';

// ----------------------------------------------------------------------

export default function SimpleLayout() {
  const transitionKey = useLocation()

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100%", overflow: "hidden" }}>
      <Box component={'main'} sx={{ flexGrow: 1 }}>
        <TransitionGroup component={null} exit={false}>
          <CSSTransition
            key={transitionKey.pathname}
            classNames="transition"
            addEndListener={(node, done) =>
              node.addEventListener("transitionend", done, false)
            }
            unmountOnExit
          >
            <Outlet />
          </CSSTransition>
        </TransitionGroup>
      </Box>
      <AppFooter />
    </Box>
  );
}
