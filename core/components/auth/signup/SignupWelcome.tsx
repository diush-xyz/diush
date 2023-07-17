import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import FlowTemplate from "../../lib/FlowTemplate";
import PopupHeader from "../../lib/PopupHeader";
import SignupOptionButton from "../SignupOptionbutton/SignupOptionButton";
import { observer } from "mobx-react";
import { useSignupStore } from "../../../state/auth/Signup.store";
import { AuthStatus, SignupMethod } from "../../../@types/GlobalTypes";
import { View } from "react-native";
import { useAuthStore } from "../../../state/auth/Auth.store";

const SignupWelcome = () => {
    const authStore = useAuthStore();
    const signupStore = useSignupStore();
    return (
        <View style={GLOBAL_STYLES.bottomSheetViewStyle}>
            <PopupHeader
                title="method"
                subtitle="signup"
                progressIndicator
                currentStep={1}
                totalSteps={5}
                backArrow
                backArrowOnPress={() => {
                    authStore.setAuthStatus(AuthStatus.SQUARE_ONE);
                    signupStore.cancel();
                }}
                marginTop={60}
            />
            <FlowTemplate
                circleEmoji="🪴"
                title="create an acc"
                desc={"we promise this will be quick (less than 2min)."}
            >
                <SignupOptionButton
                    text="continue with email"
                    icon="email"
                    onPress={() => {
                        signupStore.setMethod(SignupMethod.EMAIL);
                        signupStore.setCurrentStep(1);
                    }}
                    marginBottom={17}
                />
                <View style={{ opacity: 0.5 }}>
                    <SignupOptionButton
                        text="continue with phone"
                        icon="phone"
                        onPress={() => {
                            // signupStore.setMethod(SignupMethod.PHONE);
                            // signupStore.setCurrentStep(1);
                            null;
                        }}
                    />
                </View>
            </FlowTemplate>
        </View>
    );
};

export default observer(SignupWelcome);
