import { View, Text } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import { useAuthStore } from "../../state/auth/Auth.store";
import CustomText from "../../components/lib/CustomText";
import LargeButton from "../../components/lib/LargeButton";
import { auth } from "../../../config/firebase";
import { fetchUserFromDb } from "../../utils/user.utils";
import { IUser } from "../../@types/GlobalTypes";

const HomeScreen = () => {
    const authStore = useAuthStore();
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
            <LargeButton title="Log out" onPress={() => auth.signOut()} />
        </View>
    );
};

export default observer(HomeScreen);
