import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { DarkTheme } from "./core/style/Colors.style";
import Test from "./core/components/Test";
import { ThemeProvider } from "styled-components";
import AuthScreen from "./core/screens/auth/Auth.screen";
import * as Font from "expo-font";
import SplashScreen from "expo-splash-screen";
import KeyboardListener from "react-native-keyboard-listener";
import { useUtilStore } from "./core/state/Util.store";

export default function App() {
    const [isAppReady, setIsAppReady] = React.useState<boolean>(false);
    const utilStore = useUtilStore();

    //TODO: Add this back later (and prepare() function - view Font and SplashScreen docs from Expo)
    // if (!fontsLoaded) {
    //   return SplashScreen.preventAutoHideAsync();
    // }

    React.useEffect(() => {
        async function prepare() {
            try {
                //TODO: come back later (reference: https://github.com/expo/expo/issues/8067)
                // await SplashScreen.preventAutoHideAsync();
                await Font.loadAsync({
                    Black: require("./assets/fonts/SF-Pro-Rounded-Black.otf"),
                    Bold: require("./assets/fonts/SF-Pro-Rounded-Bold.otf"),
                    Heavy: require("./assets/fonts/SF-Pro-Rounded-Heavy.otf"),
                    Light: require("./assets/fonts/SF-Pro-Rounded-Light.otf"),
                    Medium: require("./assets/fonts/SF-Pro-Rounded-Medium.otf"),
                    Regular: require("./assets/fonts/SF-Pro-Rounded-Regular.otf"),
                    Semibold: require("./assets/fonts/SF-Pro-Rounded-Semibold.otf"),
                    Thin: require("./assets/fonts/SF-Pro-Rounded-Thin.otf"),
                    Ultralight: require("./assets/fonts/SF-Pro-Rounded-Ultralight.otf"),
                });
            } catch (e) {
                console.warn(e);
            } finally {
                setIsAppReady(true);
            }
        }

        prepare();
    }, []);

    return (
        // @ts-ignore
        <ThemeProvider theme={DarkTheme}>
            <View style={styles.container}>
                <KeyboardListener
                    onWillShow={() => utilStore.setIsKeyboardOpen(true)}
                    onWillHide={() => utilStore.setIsKeyboardOpen(false)}
                />
                <AuthScreen />
                {/* <Test /> */}
                <StatusBar style="auto" />
            </View>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DarkTheme.background,
        //TODO: Watch this:
        alignItems: "center",
        color: DarkTheme.primaryText,
        //TODO: Watch this:
        justifyContent: "center",
    },
});
