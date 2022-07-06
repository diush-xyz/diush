import { View, Text, TextInput } from "react-native";
import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../../@types/GlobalStyles";
import FlowTemplate from "../../../lib/FlowTemplate";
import PopupHeader from "../../../lib/PopupHeader";
import SignupOptionButton from "../../SignupOptionbutton/SignupOptionButton";
import LargeButton from "../../../lib/LargeButton";
import { observer } from "mobx-react";
import { useSignupStore } from "../../../../state/auth/Signup.store";
import { useTheme } from "../../../../utils/useTheme.util";

const EmailSignup = () => {
    const signupStore = useSignupStore();
    const theme = useTheme();
    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            {/* <View
                style={{
                    marginBottom: 60,
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            > */}
            <PopupHeader
                backArrow
                backArrowOnPress={() => signupStore.setCurrentStep(0)}
                title="email"
                subtitle="signup"
                progressIndicator
                currentStep={2}
                totalSteps={6}
            />
            <FlowTemplate
                circleEmoji="✉️"
                title="email"
                desc={"please enter your email address below."}
            >
                <TextInput
                    style={{
                        backgroundColor: "rgba(255,255,255,0.05)",
                        height: 45,
                        paddingHorizontal: 10,
                        paddingVertical: 14,
                        width: "100%",
                        fontSize: 14,
                        fontWeight: "bold",
                        borderRadius: 12,
                        //TODO: remove this in extraction
                        marginBottom: 32,
                    }}
                    placeholderTextColor={theme.secondary}
                    placeholder="your email"
                />
                <LargeButton title="continue" onPress={() => null} />
            </FlowTemplate>
            {/* </View> */}
        </BottomSheetView>
    );
};

export default observer(EmailSignup);
