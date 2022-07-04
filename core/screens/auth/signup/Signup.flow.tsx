import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuthStore } from "../../../state/auth/Auth.store";
import { AuthStatus } from "../../../@types/GlobalTypes";
import CustomText from "../../../components/lib/CustomText";
import { observer } from "mobx-react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import PopupHeader from "../../../components/lib/PopupHeader";
import CustomGradientCircle from "../../../components/auth/CustomGradientCircle";

const SignupFlow = () => {
    const authStore = useAuthStore();

    return (
        <>
            <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
                <PopupHeader />
                {/*@ts-ignore*/}
                <CustomGradientCircle emoji="🌳" />
                <CustomText
                    primary
                    font="Bold"
                    fontSize={24}
                    style={{ marginTop: 24, marginBottom: 12 }}
                >
                    create an account.
                </CustomText>
                <CustomText
                    secondary
                    font="Semibold"
                    fontSize={16}
                    textAlign="center"
                    style={{ marginBottom: 80 }}
                >
                    what’s most comfortable for you? we {"\n"} promise this will
                    be quick {"(<2min)"}.
                </CustomText>
                <TouchableOpacity
                    onPress={() =>
                        authStore.setAuthStatus(AuthStatus.SQUARE_ONE)
                    }
                >
                    <CustomText primary>Back</CustomText>
                </TouchableOpacity>
            </BottomSheetView>
        </>
    );
};

export default observer(SignupFlow);
