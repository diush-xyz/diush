import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { DarkTheme } from "./core/style/colors.style";
import { ThemeProvider } from "styled-components";
import KeyboardListener from "react-native-keyboard-listener";
import { useUtilStore } from "./core/state/Util.store";
import { useAuthStore } from "./core/state/auth/Auth.store";
import { AuthStatus, IUser, LoggedInScreen } from "./core/@types/GlobalTypes";
import { observer } from "mobx-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { useSignupStore } from "./core/state/auth/Signup.store";
import { fetchUserFromDb } from "./core/utils/user.utils";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ControlCenter from "./core/components/home/ControlCenter";
import DefaultScreen from "./core/screens/Default.screen";
import { useHomeStore } from "./core/state/auth/Home.store";
import * as Linking from "expo-linking";
import { useBuyProductStore } from "./core/state/buy/BuyProduct.store";
import BuyProductScreen from "./core/screens/buy/BuyProduct.screen";

// SplashScreen.preventAutoHideAsync();

const App = () => {
    const buyProductStore = useBuyProductStore();
    const [isAppReady, setIsAppReady] = React.useState<boolean>(false);
    const utilStore = useUtilStore();
    const authStore = useAuthStore();
    const signupStore = useSignupStore();
    const homeStore = useHomeStore();
    const [data, setData] = React.useState(null);
    // const [fetchedUser, setFetchedUser] = React.useState<IUser>();

    //TODO: Add this back later (and prepare() function - view Font and SplashScreen docs from Expo)
    // if (!fontsLoaded) {
    //   return SplashScreen.preventAutoHideAsync();
    // }

    const getInitialURL = async () => {
        const initialURL = await Linking.getInitialURL();
        if (initialURL) setData(Linking.parse(initialURL));
    };

    const handleDeepLink = event => {
        let temp = Linking.parse(event.url);
        setData(temp);
    };

    // React.useEffect(() => {
    //     if (data) {
    //         if (data.queryParams.id) {
    //             buyProductStore.setIdFromLink(data.queryParams.id);
    //         } else {
    //             buyProductStore.setIdFromLink("");
    //         }

    //         if (data) {
    //             utilStore.setCurrentLoggedInScreen(LoggedInScreen.BUY);
    //         } else {
    //             utilStore.setCurrentLoggedInScreen(LoggedInScreen.HOME);
    //         }
    //     }
    // }, [data]);

    const generalRenderer = () => {
        switch (utilStore.currentLoggedInScreen) {
            case LoggedInScreen.HOME:
                return <DefaultScreen />;
            case LoggedInScreen.BUY:
                return <BuyProductScreen />;
        }
    };

    React.useEffect(() => {
        Linking.addEventListener("url", handleDeepLink);
        if (!data) {
            getInitialURL();
        }
        TimeAgo.addDefaultLocale(en);
        // async function prepare() {
        //     try {
        //         //TODO: come back later (reference: https://github.com/expo/expo/issues/8067)
        //         // await SplashScreen.preventAutoHideAsync();
        //         await Font.loadAsync({
        //             Black: require("./assets/fonts/SF-Pro-Rounded-Black.otf"),
        //             Bold: require("./assets/fonts/SF-Pro-Rounded-Bold.otf"),
        //             Heavy: require("./assets/fonts/SF-Pro-Rounded-Heavy.otf"),
        //             Light: require("./assets/fonts/SF-Pro-Rounded-Light.otf"),
        //             Medium: require("./assets/fonts/SF-Pro-Rounded-Medium.otf"),
        //             Regular: require("./assets/fonts/SF-Pro-Rounded-Regular.otf"),
        //             Semibold: require("./assets/fonts/SF-Pro-Rounded-Semibold.otf"),
        //             Thin: require("./assets/fonts/SF-Pro-Rounded-Thin.otf"),
        //             Ultralight: require("./assets/fonts/SF-Pro-Rounded-Ultralight.otf"),
        //         });
        //     } catch (e) {
        //         console.warn(e);
        //     } finally {
        //         setIsAppReady(true);
        //     }
        // }

        // prepare();

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

        return () => {
            unsubscribe();
        };
    }, []);

    // const [loaded, error] = useFonts({
    //     // prettier-ignore
    //     "Black": require("./assets/fonts/SF-Pro-Rounded-Black.otf"),
    //     // prettier-ignore
    //     "Bold": require("./assets/fonts/SF-Pro-Rounded-Bold.otf"),
    //     // prettier-ignore
    //     "Heavy": require("./assets/fonts/SF-Pro-Rounded-Heavy.otf"),
    //     // prettier-ignore
    //     "Light": require("./assets/fonts/SF-Pro-Rounded-Light.otf"),
    //     // prettier-ignore
    //     "Medium": require("./assets/fonts/SF-Pro-Rounded-Medium.otf"),
    //     // prettier-ignore
    //     "Regular": require("./assets/fonts/SF-Pro-Rounded-Regular.otf"),
    //     // prettier-ignore
    //     "Semibold": require("./assets/fonts/SF-Pro-Rounded-Semibold.otf"),
    //     // prettier-ignore
    //     "Thin": require("./assets/fonts/SF-Pro-Rounded-Thin.otf"),
    //     // prettier-ignore
    //     "Ultralight": require("./assets/fonts/SF-Pro-Rounded-Ultralight.otf"),
    //     //prettier-ignore
    //     // "Semibold": NotoSans_700Bold,
    // });

    // if (!loaded) {
    //     return <CustomText>We are loading up for you...</CustomText>;
    // }

    // React.useEffect(() => {
    //     if (error) {
    //         console.log("font issue: " + error);
    //     }
    // }, [error]);

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
                {/* <DefaultScreen /> */}
                {/* {generalRenderer()} */}
                <DefaultScreen />
                {/* <BuyProductScreen /> */}
                <ControlCenter />
                {/* </TouchableOpacity> */}
                {/* <Test /> */}
                <StatusBar style="light" />
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
