import React from "react";
import { Box } from "@mui/material";
import ReactTouchSlideStyles from "./ReactTouchSlide.Styles";
import { CSS } from "./interface";

interface ReactTouchSlideProps {
  children: any;
  threshold?: number;
  onReachThreshold?: (...args: any[]) => any;
  className?: string | CSS | string[] | CSS[];
}

interface ReactTouchSlideState {
  mousedown: boolean;
  pageX: number;
}

function ReactTouchSlide({
  children,
  threshold = 0.5,
  onReachThreshold = () => {},
  className
}: ReactTouchSlideProps) {
  const childRef = React.useRef<HTMLElement | null>(null);
  const stateRef = React.useRef<ReactTouchSlideState | null>(null);
  const [state, setState] = React.useState<ReactTouchSlideState>({
    mousedown: false,
    pageX: 0
  });

  React.useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const down = React.useCallback(
    (e) => {
      if (!stateRef.current?.mousedown) {
        console.log("setting miuse down");
        setState({ ...state, mousedown: true, pageX: e.pageX });
      }
    },
    [stateRef, state, setState]
  );

  const move = React.useCallback(
    (e) => {
      if (!stateRef.current || !stateRef.current.mousedown || !childRef.current)
        return;
      const dx = e.pageX - stateRef.current.pageX;
      childRef.current.style.left = `${dx}px`;
      if (dx >= childRef.current.clientWidth * threshold) {
        onReachThreshold();
      }
    },
    [stateRef, childRef, threshold, onReachThreshold]
  );

  const up = React.useCallback(
    (e) => {
      if (stateRef.current?.mousedown) {
        if (childRef.current) childRef.current.style.left = `0px`;
        setState({ ...state, mousedown: false, pageX: 0 });
      }
    },
    [stateRef, state, childRef, setState]
  );

  React.useEffect(() => {
    const childRefCp = childRef.current;
    window.addEventListener("mouseup", up);
    window.addEventListener("mousemove", move);
    childRef.current?.addEventListener("mousedown", down);

    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mousemove", move);
      childRefCp?.removeEventListener("mousedown", down);
    };
  }, [up, down, move, childRef]);

  return (
    <Box className={[ReactTouchSlideStyles.root]}>
      <Box
        ref={childRef}
        className={[
          "touch-slide-child",
          ReactTouchSlideStyles.children,
          className
        ]}
      >
        {children}
      </Box>
    </Box>
  );
}

export default ReactTouchSlide;
