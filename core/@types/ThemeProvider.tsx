// Autocomplete for themes:  https://github.com/styled-components/styled-components/issues/1589#issuecomment-456641381

type PossibleTheme = "dark" | "light";

export interface ITheme {
    readonly themeName: PossibleTheme;
    background: string;
    popupBackground: string;
}

// Light Mode (default):
export const LightTheme: ITheme = {
    themeName: "light",
    background: "#ffffff",
    popupBackground: "red",
};

// Dark Mode:
export const DarkTheme: ITheme = {
    themeName: "dark",
    background: "#171717",
    popupBackground: "#13052F",
};
