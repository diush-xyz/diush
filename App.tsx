import React from "react";
import { StatusBar } from "expo-status-bar";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { DarkTheme } from "./core/style/colors.style";
import Test from "./core/components/Test";
import { ThemeProvider } from "styled-components";
import AuthScreen from "./core/screens/auth/Auth.screen";
import * as Font from "expo-font";
import SplashScreen from "expo-splash-screen";
import KeyboardListener from "react-native-keyboard-listener";
import { useUtilStore } from "./core/state/Util.store";
import { useAuthStore } from "./core/state/auth/Auth.store";
import { AuthStatus, IUser } from "./core/@types/GlobalTypes";
import HomeScreen from "./core/screens/home/HomeBase/HomeBase.screen";
import { observer } from "mobx-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { useSignupStore } from "./core/state/auth/Signup.store";
import { fetchUserFromDb } from "./core/utils/user.utils";
import ScreenHandler from "./core/screens/ScreenHandler";
import {
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import CopiedIndicator from "./core/components/lib/MsgIndicator";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ControlCenter from "./core/components/home/ControlCenter";
import DefaultScreen from "./core/screens/Default.screen";
import BuyProductScreen from "./core/screens/buy/BuyProduct.screen";
import { useHomeStore } from "./core/state/auth/Home.store";

const App = () => {
    const [isAppReady, setIsAppReady] = React.useState<boolean>(false);
    const utilStore = useUtilStore();
    const authStore = useAuthStore();
    const signupStore = useSignupStore();
    const homeStore = useHomeStore();
    // const [fetchedUser, setFetchedUser] = React.useState<IUser>();

    //TODO: Add this back later (and prepare() function - view Font and SplashScreen docs from Expo)
    // if (!fontsLoaded) {
    //   return SplashScreen.preventAutoHideAsync();
    // }

    React.useEffect(() => {
        TimeAgo.addDefaultLocale(en);
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

        //HANDLE AUTH:
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                authStore.setAuthStatus(AuthStatus.AUTHENTICATED);
                signupStore.cancel();

                console.log("We have a user");

                fetchUserFromDb({
                    id: user.uid,
                    setUser: (fUser: IUser) => {
                        // setFetchedUser(fUser);
                        console.log("We have fetched the user");
                        authStore.setUser({
                            id: user.uid,
                            displayName: fUser.displayName,
                            email: fUser.email,
                            photoURL: fUser.photoURL,
                            location: fUser.location,
                            notifications: fUser.notifications,
                            //TODO: Add products and other fields later
                        });

                        authStore.setUserFetchLoading(false);
                        console.log("the user: ");
                        console.log(authStore.user);
                    },
                });
            } else {
                authStore.setAuthStatus(AuthStatus.SQUARE_ONE);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        // @ts-ignore
        <ThemeProvider theme={DarkTheme}>
            <View style={styles.container}>
                {/* <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        if (homeStore.controlCenterOptionsSelector) {
                            homeStore.setControlCenterOptionsSelector(
                                !homeStore.controlCenterOptionsSelector
                            );
                        } else {
                            null;
                        }
                    }}
                > */}
                <KeyboardListener
                    onWillShow={() => utilStore.setIsKeyboardOpen(true)}
                    onWillHide={() => utilStore.setIsKeyboardOpen(false)}
                />
                <DefaultScreen />
                {/* <BuyProductScreen /> */}
                <ControlCenter />
                {/* </TouchableOpacity> */}
                {/* <Test /> */}
                <StatusBar style="auto" />
            </View>
        </ThemeProvider>
    );
};

export default observer(App);

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
