import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import FlowTemplate from "../../lib/FlowTemplate";
import PopupHeader from "../../lib/PopupHeader";
import SignupOptionButton from "../SignupOptionbutton/SignupOptionButton";
import { observer } from "mobx-react";
import { useSignupStore } from "../../../state/auth/Signup.store";
import { SignupMethod } from "../../../@types/GlobalTypes";
import { View } from "react-native";

const SignupWelcome = () => {
    const signupStore = useSignupStore();
    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            <PopupHeader
                title="method"
                subtitle="signup"
                progressIndicator
                currentStep={1}
                totalSteps={6}
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
        </BottomSheetView>
    );
};

export default observer(SignupWelcome);
