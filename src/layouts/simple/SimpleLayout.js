import { Outlet, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// css
import '../../assets/css/transition.css'

// ----------------------------------------------------------------------

export default function SimpleLayout() {
  const transitionKey = useLocation()

  return (
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
  );
}
