import { View, Text } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import { useAuthStore } from "../../state/auth/Auth.store";
import CustomText from "../../components/lib/CustomText";
import LargeButton from "../../components/lib/LargeButton";
import { auth } from "../../../config/firebase";

const HomeScreen = () => {
    const authStore = useAuthStore();
    return (
        <View style={{ width: "100%" }}>
            <CustomText primary textAlign="center">
                Welcome, {authStore?.user?.displayName}
            </CustomText>
            <LargeButton title="Log out" onPress={() => auth.signOut()} />
        </View>
    );
};

export default observer(HomeScreen);
