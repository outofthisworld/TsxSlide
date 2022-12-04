import { AppStyles } from "./interface";
import { css } from "@emotion/css";

const ReactTouchSlideStyles: AppStyles = {
  root: css`
    overflow: hidden;
  `,
  children: css`
    overflow: hidden;
    position: relative;
  `
};

export default ReactTouchSlideStyles;
