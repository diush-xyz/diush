import { IColorStyles } from '../style/colors.style';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends IColorStyles {}
}
