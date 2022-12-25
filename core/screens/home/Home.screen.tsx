import { View, Image } from "react-native";
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
import Sidebar from "../../components/home/ControlCenter/ControlCenterContent";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../@types/GlobalStyles";
import {
    MAX_WIDTH,
    PRODUCT_BOTTOM_SHEET_SNAP_POINTS,
} from "../../utils/constants";
import { useCatalogStore } from "../../state/auth/Catalog.store";
import { useHomeStore } from "../../state/auth/Home.store";
import ControlCenter from "../../components/home/ControlCenter";
import ScreenHeader from "../../components/lib/ScreenHeader";
import Switcher from "../../components/catalog/Dashboard/Switcher";
import CustomTextInput from "../../components/lib/CustomTextInput";

const HomeScreen = () => {
    const signupStore = useSignupStore();
    const loginStore = useLoginStore();
    const authStore = useAuthStore();
    const utilStore = useUtilStore();
    const theme = useTheme();
    const homeStore = useHomeStore();

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
                    title="home base"
                />
                <Switcher
                    text1="incoming"
                    text2="to others"
                    is1Active={homeStore.isIncomingChatsActive}
                    set1Active={(status: boolean) =>
                        homeStore.setIsIncomingChatsActive(status)
                    }
                    is2Active={homeStore.isOutboundChatsActive}
                    set2Active={(status: boolean) =>
                        homeStore.setIsOutboundChatsActive(status)
                    }
                />
                <CustomTextInput
                    placeholder="search chats"
                    onChangeText={() => null}
                    isSearch
                />
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        maxWidth: MAX_WIDTH,
                    }}
                >
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <Image
                            borderRadius={15.5} //TODO: Find a way to make this a string and just make this 50% without using styled-components/native
                            source={{
                                uri: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80",
                            }}
                            style={{
                                height: 31,
                                width: 31,
                            }}
                        />
                        <View
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <CustomText>Jessica O'Malley</CustomText>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "column" }}>
                        <CustomText secondary>3:56pm</CustomText>
                        <CustomText>3</CustomText>
                    </View>
                </View>
            </View>
            <ControlCenter />
        </>
    );
};

export default observer(HomeScreen);
