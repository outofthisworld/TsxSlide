import React from "react";
import { Box } from "@mui/material";
import ReactTouchSlideStyles from "./ReactTouchSlide.Styles";
import { CSS } from "./interface";
import { useTransition, animated } from "react-spring";

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
  onReachThreshold = () => {},
  className,
}: ReactTouchSlideProps) {
  const childRef = React.useRef<HTMLElement | null>(null);
  const [state, setState] = React.useState<ReactTouchSlideState>({
    mousedown: false,
    pageX: 0,
    reachedThreshold: false,
  });
  const stateRef = React.useRef<ReactTouchSlideState>(state);

  const update = React.useCallback<
    (data: Partial<ReactTouchSlideState>) => void
  >(
    (data = {}) => {
      setState({ ...(stateRef?.current || {}), ...data });
    },
    [stateRef, setState]
  );

  const up = React.useCallback(() => {
    const { current } = stateRef;
    if (current.mousedown && !current.reachedThreshold) {
      update({ mousedown: false, pageX: 0, reachedThreshold: false });
    }
  }, [stateRef, childRef, update]);

  const down = React.useCallback<(e: any) => void>(
    (e) => {
      if (!stateRef.current.mousedown) {
        update({ mousedown: true, pageX: e.pageX, reachedThreshold: false });
      }
    },
    [stateRef, update]
  );

  const move = React.useCallback<(e: any) => void>(
    (e) => {
      if (!stateRef.current.mousedown || !childRef.current) return;

      const dx = Math.max(e.pageX - stateRef.current.pageX, 0);

      childRef.current.style.left = `${dx}px`;

      if (
        dx >= childRef.current.clientWidth * threshold &&
        !stateRef.current.reachedThreshold
      ) {
        update({ reachedThreshold: true });
      }
    },
    [stateRef, childRef, threshold, onReachThreshold, update]
  );

  const bindListeners = React.useCallback<(listen: boolean) => void>(
    (listen) => {
      if (listen) {
        window.addEventListener("mouseup", up);
      } else {
        window.removeEventListener("mouseup", up);
      }
    },
    [up]
  );

  React.useEffect(() => {
    stateRef.current = state;
  }, [state]);

  React.useEffect(() => {
    bindListeners(true);
    return () => bindListeners(false);
  }, [up, childRef]);

  return useTransition(state.reachedThreshold, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    onDestroyed: onReachThreshold,
    delay: 200,
  })((style: any, item: boolean) => (
    <Box className={[ReactTouchSlideStyles.root]}>
      {!item && (
        <AnimatedBox
          style={style}
          ref={childRef}
          onMouseDown={down}
          onMouseMove={move}
          onTouchStart={down}
          className={[
            "touch-slide-child",
            ReactTouchSlideStyles.children,
            className,
          ]}
        >
          {children}
        </AnimatedBox>
      )}
    </Box>
  ));
}

export default ReactTouchSlide;
