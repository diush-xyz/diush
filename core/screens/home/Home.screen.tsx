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

const HomeScreen = () => {
    const signupStore = useSignupStore();
    const loginStore = useLoginStore();
    const authStore = useAuthStore();
    const utilStore = useUtilStore();

    const [fetchedUser, setFetchedUser] = React.useState<IUser | null>(null);

    React.useEffect(() => {
        // run this if there is a user:
        if (auth.currentUser) {
            fetchUserFromDb({
                id: auth.currentUser?.uid,
                setUser: (user: IUser) => {
                    setFetchedUser(user);
                },
            });
        }
    });
    return (
        <View style={{ width: "100%" }}>
            <CustomText primary textAlign="center">
                Welcome, {fetchedUser?.displayName}.
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
