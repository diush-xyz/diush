import { View } from "react-native";
import React from "react";
import CustomText from "../../components/lib/CustomText/CustomText.ui";
import NoBackgroundLogo from "../../icons/auth/NoBackgroundLogo";
import { useAuthStore } from "../../state/auth/Auth.store";
import { observer } from "mobx-react";
import { GLOBAL_STYLES } from "../../@types/GlobalStyles";
import LargeButton from "../../components/lib/LargeButton";
import { AuthStatus } from "../../@types/GlobalTypes";
import BottomSheet from "@gorhom/bottom-sheet";
import SignupFlow from "./signup";
import LoginFlow from "./login";
import { BOTTOM_SHEET_SNAP_POINTS } from "../../utils/constants";
import { useTheme } from "../../utils/useTheme.util";

const AuthScreen = () => {
    const authStore = useAuthStore();

    const theme = useTheme();

    const sheetRef = React.useRef<BottomSheet>(null);

    const handleSnapPress = React.useCallback(index => {
        sheetRef.current?.snapToIndex(index);
        authStore.setIsSheetOpen(true);
    }, []);

    return (
        <>
            <View style={GLOBAL_STYLES.page}>
                <NoBackgroundLogo fill="#ffffff" />
                <CustomText
                    primary
                    font="Bold"
                    fontSize={24}
                    style={{ marginTop: 24, marginBottom: 12 }}
                >
                    hey there!
                </CustomText>
                <CustomText
                    secondary
                    font="Semibold"
                    fontSize={16}
                    textAlign="center"
                    style={{ marginBottom: 80 }}
                >
                    welcome to an easy way to sell
                    {"\n"} items to your friends and network.
                </CustomText>
                <LargeButton
                    title="get started"
                    onPress={() => {
                        authStore.setAuthStatus(AuthStatus.SIGNUP);
                        handleSnapPress(0);
                    }}
                    footer
                    footerButtonPrimary
                    footerButtonTitle="i already have an account"
                    footerButtonOnPress={() => {
                        authStore.setAuthStatus(AuthStatus.LOGIN);
                        handleSnapPress(0);
                    }}
                />
            </View>
            <View style={{ position: "absolute", bottom: 70 }}>
                <CustomText secondary font="Bold" textAlign="center">
                    made with ❤️ by Filippo Fonseca{"\n"} and the diush
                    contributors.
                </CustomText>
            </View>
            {authStore.isSheetOpen ? (
                <BottomSheet
                    handleIndicatorStyle={GLOBAL_STYLES.handleIndicatorStyle}
                    handleStyle={GLOBAL_STYLES.handleStyle}
                    ref={sheetRef}
                    snapPoints={BOTTOM_SHEET_SNAP_POINTS}
                    enablePanDownToClose={true}
                    onClose={() => authStore.setIsSheetOpen(false)}
                >
                    {() => {
                        switch (authStore.authStatus) {
                            case AuthStatus.SIGNUP:
                                return <SignupFlow />;
                            case AuthStatus.LOGIN:
                                return <LoginFlow />;
                        }
                    }}
                </BottomSheet>
            ) : null}
        </>
    );
};

export default observer(AuthScreen);
