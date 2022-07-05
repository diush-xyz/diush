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
import FlowTemplate from "../../../components/lib/FlowTemplate/FlowTemplate.ui";
import LargeButton from "../../../components/lib/LargeButton";

const SignupFlow = () => {
    const authStore = useAuthStore();

    return (
        <>
            <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
                <PopupHeader />
                <FlowTemplate
                    circleEmoji="🪴"
                    title="create an acc"
                    desc={
                        "what’s most comfortable for you? we \n promise this will be quick (<2min)."
                    }
                >
                    <TouchableOpacity
                        style={{
                            height: 44,
                            width: 330,
                            display: "flex",
                            justifyContent: "center",
                            alignSelf: "center",
                            borderRadius: 22,
                            padding: 2,
                            // make the background have 5% opacity from white
                            backgroundColor: "rgba(255,255,255,0.05)",
                        }}
                    >
                        <View
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <CustomText primary>continue with email</CustomText>
                        </View>
                    </TouchableOpacity>
                </FlowTemplate>
            </BottomSheetView>
        </>
    );
};

export default observer(SignupFlow);
