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
import EmailIcon from "../../../icons/auth/Email";
import SignupOptionButton from "../../../components/auth/SignupOptionbutton/SignupOptionButton";

const SignupFlow = () => {
    const authStore = useAuthStore();

    return (
        <>
            <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
                <PopupHeader
                    backArrow
                    title="metho"
                    subtitle="signup"
                    progressIndicator
                    currentStep={2}
                    totalSteps={8}
                />
                <FlowTemplate
                    circleEmoji="🪴"
                    title="create an acc"
                    desc={
                        "what’s most comfortable for you? we \n promise this will be quick (<2min)."
                    }
                >
                    <SignupOptionButton
                        text="continue with email"
                        icon="email"
                        onPress={() => null}
                        marginBottom={17}
                    />
                    <SignupOptionButton
                        text="continue with phone"
                        icon="phone"
                        onPress={() => null}
                    />
                </FlowTemplate>
            </BottomSheetView>
        </>
    );
};

export default observer(SignupFlow);
