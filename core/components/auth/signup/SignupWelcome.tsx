import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import FlowTemplate from "../../lib/FlowTemplate";
import PopupHeader from "../../lib/PopupHeader";
import SignupOptionButton from "../SignupOptionbutton/SignupOptionButton";
import { observer } from "mobx-react";
import { useSignupStore } from "../../../state/auth/Signup.store";
import { SignupMethods } from "../../../@types/GlobalTypes";

const SignupWelcome = () => {
    const signupStore = useSignupStore();
    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            <PopupHeader
                title="method"
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
                    onPress={() => {
                        signupStore.setMethod(SignupMethods.EMAIL);
                        signupStore.setCurrentStep(1);
                    }}
                    marginBottom={17}
                />
                <SignupOptionButton
                    text="continue with phone"
                    icon="phone"
                    onPress={() => {
                        signupStore.setMethod(SignupMethods.PHONE);
                        signupStore.setCurrentStep(1);
                    }}
                />
            </FlowTemplate>
        </BottomSheetView>
    );
};

export default observer(SignupWelcome);
