import { DarkTheme, IColorStyles } from "../style/Colors.style";

/**
 * Fetch the RSS Feed from an URL.
 * @returns The current theme's object.
 * @see https://styled-components.com/docs/advanced
 *
 * @example ```ts
 * const theme = useTheme();
 * ```
 */
export const useTheme = (): IColorStyles => {
    //refactor this later (once multiple themes are implemented)
    return DarkTheme;
};
