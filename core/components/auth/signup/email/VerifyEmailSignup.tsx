import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../../@types/GlobalStyles";
import FlowTemplate from "../../../lib/FlowTemplate";
import PopupHeader from "../../../lib/PopupHeader";
import { observer } from "mobx-react";
import { useSignupStore } from "../../../../state/auth/Signup.store";

const VerifyEmailSignup = () => {
    const signupStore = useSignupStore();

    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            <PopupHeader
                backArrow
                backArrowOnPress={() =>
                    signupStore.setCurrentStep(signupStore.currentStep - 1)
                }
                title="email"
                subtitle="signup"
                progressIndicator
                currentStep={2}
                totalSteps={6}
            />
            <FlowTemplate
                circleEmoji="✉️"
                title="verify"
                desc={"please enter your email address below."}
            >
                {/* <CustomTextInput
                    placeholder="my email"
                    onChangeText={text => signupStore.setEmail(text)}
                    marginBottom={32}
                />
//TODO: Add disabled validation with text field
                <LargeButton
                    title="continue"
                    onPress={() => null}
                    footer
                    disabled={isReady}
                    footerButtonTitle="cancel"
                    footerButtonOnPress={() => {
                        signupStore.setCurrentStep(0);
                        //TODO: Clear all fields respective to the signup process (once implemented) here
                    }}
                /> */}
            </FlowTemplate>
        </BottomSheetView>
    );
};

export default observer(VerifyEmailSignup);
