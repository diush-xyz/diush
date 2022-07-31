import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import FlowTemplate from "../../lib/FlowTemplate";
import PopupHeader from "../../lib/PopupHeader";
import { observer } from "mobx-react";
import { useSignupStore } from "../../../state/auth/Signup.store";
import { SignupMethod } from "../../../@types/GlobalTypes";
import SignupOptionButton from "../../auth/SignupOptionbutton/SignupOptionButton";
import { View } from "react-native";
import { useCreateProductStore } from "../../../state/auth/CreateProduct.store";

const SignupWelcome = () => {
    const createProductStore = useCreateProductStore();
    return (
        <View style={GLOBAL_STYLES.page}>
            <PopupHeader
                title="create listing"
                subtitle="catalog"
                progressIndicator
                currentStep={1}
                totalSteps={5}
            />
            <FlowTemplate
                circleEmoji="🪴"
                title="create an acc"
                desc={
                    "what’s most comfortable for you? we \n promise this will be quick (<2min)."
                }
            >
                <SignupOptionButton
                    text="continue with email"
                    icon="email"
                    onPress={() => {
                        // signupStore.setMethod(SignupMethod.EMAIL);
                        // signupStore.setCurrentStep(1);
                    }}
                    marginBottom={17}
                />
                <SignupOptionButton
                    text="continue with phone"
                    icon="phone"
                    onPress={() => {
                        // signupStore.setMethod(SignupMethod.PHONE);
                        // signupStore.setCurrentStep(1);
                    }}
                />
            </FlowTemplate>
        </View>
    );
};

export default observer(SignupWelcome);
