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
import OTPInputField from "../../OTPInputField/OTPInputField";

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
                    marginBottom: 200,
                    width: "100%",
                    maxWidth: MAX_WIDTH,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <View
                    style={{
                        alignItems: "flex-start",
                        width: "100%",
                    }}
                >
                    <CustomText primary font="Bold">
                        Enter OTP
                    </CustomText>
                    <CustomText secondary style={{ marginTop: 6 }}>
                        we sent a 4-digit code to your email address.
                    </CustomText>
                </View>
                <OTPInputField />
                <LargeButton
                    title="continue"
                    onPress={() => null}
                    footer
                    // disabled={!allClear && !firstTime}
                    footerButtonTitle="cancel"
                    footerButtonOnPress={() => signupStore.cancel()}
                />
            </View>
        </BottomSheetView>
    );
};

export default observer(VerifyEmailSignup);
