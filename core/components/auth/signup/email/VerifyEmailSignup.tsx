import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../../@types/GlobalStyles";
import FlowTemplate from "../../../lib/FlowTemplate";
import PopupHeader from "../../../lib/PopupHeader";
import { observer } from "mobx-react";
import { useSignupStore } from "../../../../state/auth/Signup.store";
import CustomText from "../../../lib/CustomText";
import LargeButton from "../../../lib/LargeButton";
import { TouchableOpacity, View } from "react-native";
import { MAX_WIDTH } from "../../../../utils/constants";
import OTPInputField from "../../OTPInputField/OTPInputField";
import { censorEmail } from "../../../../utils/censor.util";

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
                    position: "absolute",
                    top: 100,
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
                        we sent a 4-digit code to your email address so we know
                        it's yours.
                    </CustomText>
                </View>
                <OTPInputField />
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        padding: 8,
                        borderRadius: 8,
                        marginTop: 45,
                    }}
                >
                    <CustomText primary>
                        {censorEmail(signupStore.email)}
                    </CustomText>
                    <CustomText secondary>Resend code: 45 sec</CustomText>
                </View>
                <TouchableOpacity onPress={() => signupStore.cancel()}>
                    <CustomText
                        font="Heavy"
                        accent
                        style={{
                            alignSelf: "center",
                            marginTop: 25,
                        }}
                    >
                        cancel
                    </CustomText>
                </TouchableOpacity>
            </View>
        </BottomSheetView>
    );
};

export default observer(VerifyEmailSignup);
