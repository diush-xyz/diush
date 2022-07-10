import { View, Text } from "react-native";
import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../../@types/GlobalStyles";
import FlowTemplate from "../../../lib/FlowTemplate";
import PopupHeader from "../../../lib/PopupHeader";
import { useSignupStore } from "../../../../state/auth/Signup.store";
import { observer } from "mobx-react";

const FinalWelcomeSignup = () => {
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
                totalSteps={5}
            />
        </BottomSheetView>
    );
};

export default observer(FinalWelcomeSignup);
