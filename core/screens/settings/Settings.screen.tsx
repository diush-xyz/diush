import React from "react";
import CustomText from "../../components/lib/CustomText";
import { View } from "react-native";
import ScreenHeader from "../../components/lib/ScreenHeader";
import { useAuthStore } from "../../state/auth/Auth.store";
import { useHomeStore } from "../../state/auth/Home.store";
import CustomTextInput from "../../components/lib/CustomTextInput";

const SettingsScreen = () => {
    const authStore = useAuthStore();
    const homeStore = useHomeStore();

    return (
        <View
            style={{
                alignItems: "center",
                flex: 1,
                marginTop: 55,
                width: "100%",
            }}
        >
            <ScreenHeader
                pfp
                photoURL={
                    authStore.user.photoURL ??
                    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                }
                onPfpPress={() => homeStore.setControlCenter(true)}
                // backArrow
                // backArrowOnPress={() =>
                //     utilStore.setCurrentLoggedInScreen(LoggedInScreen.HOME)
                // }
                title="settings"
            />
            <View style={{ marginTop: 22 }}>
                <CustomTextInput
                    placeholder="search settings"
                    onChangeText={text => null}
                    isSearch
                />
            </View>
        </View>
    );
};

export default SettingsScreen;
