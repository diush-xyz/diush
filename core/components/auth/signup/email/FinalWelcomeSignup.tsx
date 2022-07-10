import { View, Text } from "react-native";
import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../../@types/GlobalStyles";
import FlowTemplate from "../../../lib/FlowTemplate";
import PopupHeader from "../../../lib/PopupHeader";
import { useSignupStore } from "../../../../state/auth/Signup.store";
import { observer } from "mobx-react";
import CustomText from "../../../lib/CustomText";
import WelcomeIcon from "../../../../icons/auth/Welcome";

const FinalWelcomeSignup = () => {
    const signupStore = useSignupStore();
    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            <WelcomeIcon />
            <CustomText
                primary
                font="Bold"
                fontSize={24}
                style={{ marginTop: 24, marginBottom: 12 }}
            >
                welcome to diush, {signupStore.displayName}!
            </CustomText>
            <CustomText
                secondary
                font="Semibold"
                fontSize={16}
                textAlign="center"
                style={{ marginBottom: 40 }}
            >
                we are thrilled to have you as the newest member of the diush
                community.
            </CustomText>
        </BottomSheetView>
    );
};

export default observer(FinalWelcomeSignup);
