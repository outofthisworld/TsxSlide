import { AppStyles } from "./interface";
import { css } from "@emotion/css";

const ReactTouchSlideStyles: AppStyles = {
  root: css`
    overflow: hidden;
  `,
  children: css`
    overflow: hidden;
    position: relative;
    transition: all 0.5s linear;
  `
};

export default ReactTouchSlideStyles;
