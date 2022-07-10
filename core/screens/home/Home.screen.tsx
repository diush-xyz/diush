import { View, Text } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import { useAuthStore } from "../../state/auth/Auth.store";
import CustomText from "../../components/lib/CustomText";

const HomeScreen = () => {
    const authStore = useAuthStore();
    return (
        <View>
            <CustomText primary>
                Welcome, {authStore?.user?.displayName}
            </CustomText>
        </View>
    );
};

export default observer(HomeScreen);
