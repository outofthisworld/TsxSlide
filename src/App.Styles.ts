import { AppStyles } from "./interface";
import { css } from "@emotion/css";

const styles: AppStyles = {
  root: css``,
  item: css`
    background: #facaed;
    border:5px solid #fff;
    border-radius:5px;
    margin-top: 5px;
    padding: 20px;
    color: #e00da7;
    font-weight:900;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  `
};

export default styles;
