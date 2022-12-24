import { View, Text } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import AuthStore, { useAuthStore } from "../../state/auth/Auth.store";
import CustomText from "../../components/lib/CustomText";
import LargeButton from "../../components/lib/LargeButton";
import { auth } from "../../../config/firebase";
import { fetchUserFromDb } from "../../utils/user.utils";
import { IUser, LoggedInScreen } from "../../@types/GlobalTypes";
import SignupStore, { useSignupStore } from "../../state/auth/Signup.store";
import { useLoginStore } from "../../state/auth/Login.store";
import { useUtilStore } from "../../state/Util.store";
import { useTheme } from "../../utils/useTheme.util";
import Sidebar from "../../components/home/Sidebar";

const HomeScreen = () => {
    const signupStore = useSignupStore();
    const loginStore = useLoginStore();
    const authStore = useAuthStore();
    const utilStore = useUtilStore();
    const theme = useTheme();

    React.useEffect(() => {
        console.log("the user from the home screen: ");
        console.log(authStore.user);
    }, []);

    if (authStore.userFetchLoading) {
        return (
            <>
                <CustomText accent>Loading...</CustomText>
            </>
        );
    }

    return (
        <View
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Sidebar />
            <CustomText primary textAlign="center">
                Welcome, {authStore.user?.displayName}.
            </CustomText>
            <LargeButton
                title="My catalog"
                onPress={() =>
                    utilStore.setCurrentLoggedInScreen(LoggedInScreen.CATALOG)
                }
            />
            <LargeButton
                title="Log out"
                onPress={() => {
                    auth.signOut();
                    authStore.setIsSheetOpen(false);
                    loginStore.cancel();
                    signupStore.cancel();
                }}
            />
        </View>
    );
};

export default observer(HomeScreen);
