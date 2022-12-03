import { css } from "@emotion/css";

export type CSS = ReturnType<typeof css>;

export interface AppStyles {
  [key: string]: CSS;
}
