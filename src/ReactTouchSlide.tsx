import React from "react";
import { Box } from "@mui/material";
import ReactTouchSlideStyles from "./ReactTouchSlide.Styles";
import { CSS } from "./interface";
import { useTransition, animated } from 'react-spring'

interface ReactTouchSlideProps {
  children: any;
  threshold?: number;
  onReachThreshold?: (...args: any[]) => any;
  className?: string | CSS | string[] | CSS[];
}

interface ReactTouchSlideState {
  mousedown: boolean;
  pageX: number;
  reachedThreshold: boolean;
}

const AnimatedBox = animated(Box);

function ReactTouchSlide({
  children,
  threshold = 0.35,
  onReachThreshold = () => { },
  className
}: ReactTouchSlideProps) {
  const childRef = React.useRef<HTMLElement | null>(null);
  const stateRef = React.useRef<ReactTouchSlideState | null>(null);
  const [state, setState] = React.useState<ReactTouchSlideState>({
    mousedown: false,
    pageX: 0,
    reachedThreshold: false
  });

  React.useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const down = React.useCallback(
    (e: MouseEvent) => {
      if (!stateRef.current?.mousedown) {
        setState({ ...childRef.current, mousedown: true, pageX: e.pageX, reachedThreshold: false });
      }
    },
    [stateRef, setState]
  );

  const move = React.useCallback(
    (e: MouseEvent) => {
      if (!stateRef.current?.mousedown || !childRef.current)
        return;

      const dx = Math.max(e.pageX - stateRef.current.pageX, 0);

      childRef.current.style.left = `${dx}px`;

      if ((dx >= childRef.current.clientWidth * threshold) && !stateRef.current?.reachedThreshold) {
        setState({ ...stateRef.current, reachedThreshold: true });
      }
    },
    [stateRef, childRef, setState, threshold, onReachThreshold]
  );

  const up = React.useCallback(
    () => {
      if (stateRef.current?.mousedown && !stateRef.current?.reachedThreshold) {
        setState({ ...childRef.current, mousedown: false, pageX: 0, reachedThreshold: false });
      }
    },
    [stateRef, childRef, setState]
  );

  React.useEffect(() => {
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mouseup", up);
    };
  }, [up, childRef]);

  const transitions = useTransition(state.reachedThreshold, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    onDestroyed: onReachThreshold,
    delay: 200,
  });

  return transitions((style: any, item: boolean) => (
    <Box className={[ReactTouchSlideStyles.root]}>
      {!item && <AnimatedBox
        style={style}
        ref={childRef}
        onMouseDown={down}
        onMouseMove={move}
        className={[
          "touch-slide-child",
          ReactTouchSlideStyles.children,
          className
        ]}
      >
        {item ? 'item...' : '!item'}
        {children}
      </AnimatedBox>}
    </Box >
  ));
}

export default ReactTouchSlide;
