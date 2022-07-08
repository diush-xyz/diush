import { View, Text } from "react-native";
import React from "react";
import CustomText from "../../../lib/CustomText";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../../@types/GlobalStyles";
import PopupHeader from "../../../lib/PopupHeader";
import { useSignupStore } from "../../../../state/auth/Signup.store";
import { observer } from "mobx-react";

const PasswordSignup = () => {
    const signupStore = useSignupStore();
    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            <PopupHeader
                backArrow
                backArrowOnPress={() =>
                    signupStore.setCurrentStep(signupStore.currentStep - 1)
                }
                title="password"
                subtitle="signup"
                progressIndicator
                currentStep={3}
                totalSteps={6}
            />
        </BottomSheetView>
    );
};

export default observer(PasswordSignup);
