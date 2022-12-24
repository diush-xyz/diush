import { View, Text } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import AuthStore, { useAuthStore } from "../../state/auth/Auth.store";
import CustomText from "../../components/lib/CustomText";
import LargeButton from "../../components/lib/LargeButton";
import { auth } from "../../../config/firebase";
import { fetchUserFromDb } from "../../utils/user.utils";
import { CatalogStatus, IUser, LoggedInScreen } from "../../@types/GlobalTypes";
import SignupStore, { useSignupStore } from "../../state/auth/Signup.store";
import { useLoginStore } from "../../state/auth/Login.store";
import { useUtilStore } from "../../state/Util.store";
import { useTheme } from "../../utils/useTheme.util";
import Sidebar from "../../components/home/Sidebar";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../@types/GlobalStyles";
import { PRODUCT_BOTTOM_SHEET_SNAP_POINTS } from "../../utils/constants";
import { useCatalogStore } from "../../state/auth/Catalog.store";
import { useHomeStore } from "../../state/auth/Home.store";

const HomeScreen = () => {
    const signupStore = useSignupStore();
    const loginStore = useLoginStore();
    const authStore = useAuthStore();
    const utilStore = useUtilStore();
    const theme = useTheme();
    const homeStore = useHomeStore();

    const sheetRef = React.useRef<BottomSheet>(null);

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
        <>
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CustomText primary textAlign="center">
                    Welcome, {authStore.user?.displayName}.
                </CustomText>
                <LargeButton
                    title="Open sidebar"
                    onPress={() => homeStore.setIsSidebarOpen(true)}
                />
                <LargeButton
                    title="My catalog"
                    onPress={() =>
                        utilStore.setCurrentLoggedInScreen(
                            LoggedInScreen.CATALOG
                        )
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
            {homeStore.isSidebarOpen && (
                <BottomSheet
                    handleIndicatorStyle={GLOBAL_STYLES.handleIndicatorStyle}
                    handleStyle={GLOBAL_STYLES.handleStyle}
                    ref={sheetRef}
                    snapPoints={["44%"]}
                    enablePanDownToClose={true}
                    onClose={() => homeStore.setIsSidebarOpen(false)}
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 12,
                        },
                        shadowOpacity: 0.58,
                        shadowRadius: 16.0,

                        elevation: 24,
                    }}
                >
                    <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
                        <Sidebar />
                    </BottomSheetView>
                </BottomSheet>
            )}
        </>
    );
};

export default observer(HomeScreen);
