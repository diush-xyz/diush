import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../../@types/GlobalStyles";
import FlowTemplate from "../../../lib/FlowTemplate";
import PopupHeader from "../../../lib/PopupHeader";
import { observer } from "mobx-react";
import { useSignupStore } from "../../../../state/auth/Signup.store";
import CustomText from "../../../lib/CustomText";
import LargeButton from "../../../lib/LargeButton";
import { View } from "react-native";
import { MAX_WIDTH } from "../../../../utils/constants";

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
            <View
                style={{
                    alignItems: "flex-start",
                    width: "100%",
                    maxWidth: MAX_WIDTH,
                }}
            >
                <CustomText primary font="Bold">
                    Enter OTP
                </CustomText>
                <CustomText secondary style={{ marginTop: 6 }}>
                    we sent a 4-digit code to your email address.
                </CustomText>
            </View>
            <LargeButton
                title="continue"
                onPress={() => null}
                footer
                // disabled={!allClear && !firstTime}
                footerButtonTitle="cancel"
                footerButtonOnPress={() => signupStore.cancel()}
            />
        </BottomSheetView>
    );
};

export default observer(VerifyEmailSignup);
