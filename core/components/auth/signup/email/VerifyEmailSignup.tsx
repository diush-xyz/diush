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
import { useTheme } from "../../../../utils/useTheme.util";

//NOTE: THIS IS NOT ACTIVE. Will prob implement later

const VerifyEmailSignup = () => {
    const signupStore = useSignupStore();
    const theme = useTheme();

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
                    top: signupStore.isVerifyError ? 50 : 100,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {signupStore.isVerifyError && (
                    <View
                        style={{
                            display: "flex",
                            backgroundColor: theme.accent,
                            paddingHorizontal: 10,
                            paddingVertical: 12,
                            width: "100%",
                            marginBottom: 50,
                        }}
                    >
                        <CustomText primary fontSize={12} font="Bold">
                            wrong code! try again. prompt a resend below if you
                            need it.
                        </CustomText>
                    </View>
                )}
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
                        maxWidth: MAX_WIDTH,
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
