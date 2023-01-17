import React from "react";
import CustomText from "../../components/lib/CustomText";
import { TouchableOpacity, View } from "react-native";
import ScreenHeader from "../../components/lib/ScreenHeader";
import { useAuthStore } from "../../state/auth/Auth.store";
import { useHomeStore } from "../../state/auth/Home.store";
import CustomTextInput from "../../components/lib/CustomTextInput";
import HorizontalLine from "../../components/lib/HorizontalLine";
import { MAX_WIDTH } from "../../utils/constants";
import ChevronRight from "../../icons/catalog/ChevronRight";

const SettingsScreen = () => {
    const authStore = useAuthStore();
    const homeStore = useHomeStore();

    const PREFERENCES_SETTINGS_DATA = [
        {
            text: "my account",
            onClick: () => null,
        },
        {
            text: "privacy & safety",
            onClick: () => null,
        },
        {
            text: "payments",
            onClick: () => null,
        },
        {
            text: "notifications",
            onClick: () => null,
        },
    ];

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
            <View
                style={{
                    display: "flex",
                    width: MAX_WIDTH,
                }}
            >
                <CustomText
                    secondary
                    font="Heavy"
                    fontSize={14}
                    style={{ marginTop: 22 }}
                >
                    PREFERENCES
                </CustomText>
                <HorizontalLine marginVertical={8} />
                {PREFERENCES_SETTINGS_DATA.map((elem, idx) => {
                    return (
                        <>
                            <TouchableOpacity
                                onPress={elem.onClick}
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginTop: idx == 0 && 8,
                                }}
                            >
                                <CustomText>{elem.text}</CustomText>
                                <ChevronRight />
                            </TouchableOpacity>
                            <HorizontalLine marginVertical={16} />
                        </>
                    );
                })}
            </View>
            <View
                style={{
                    display: "flex",
                    width: MAX_WIDTH,
                }}
            >
                <CustomText
                    secondary
                    font="Heavy"
                    fontSize={14}
                    style={{ marginTop: 22 }}
                >
                    CONNECT
                </CustomText>
                <HorizontalLine marginVertical={8} />
                {PREFERENCES_SETTINGS_DATA.map((elem, idx) => {
                    return (
                        <>
                            <TouchableOpacity
                                onPress={elem.onClick}
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginTop: idx == 0 && 8,
                                }}
                            >
                                <CustomText>{elem.text}</CustomText>
                                <ChevronRight />
                            </TouchableOpacity>
                            <HorizontalLine marginVertical={16} />
                        </>
                    );
                })}
            </View>
        </View>
    );
};

export default SettingsScreen;
