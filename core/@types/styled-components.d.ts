import { ITheme } from "./ThemeProvider";

declare module "styled-components" {
    //TODO: Might have to add /native prop
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends ITheme {}
}
