import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuthStore } from "../../../state/auth/Auth.store";
import { AuthStatus, SignupMethods } from "../../../@types/GlobalTypes";
import CustomText from "../../../components/lib/CustomText";
import { observer } from "mobx-react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import PopupHeader from "../../../components/lib/PopupHeader";
import CustomGradientCircle from "../../../components/auth/CustomGradientCircle";
import FlowTemplate from "../../../components/lib/FlowTemplate/FlowTemplate.ui";
import LargeButton from "../../../components/lib/LargeButton";
import EmailIcon from "../../../icons/auth/Email";
import SignupOptionButton from "../../../components/auth/SignupOptionbutton/SignupOptionButton";
import { useSignupStore } from "../../../state/auth/Signup.store";
import SignupWelcome from "../../../components/auth/signup/SignupWelcome";
import EmailSignup from "../../../components/auth/signup/email/EmailSignup";
import VerifyEmailSignup from "../../../components/auth/signup/email/VerifyEmailSignup";
import PasswordSignup from "../../../components/auth/signup/email/PasswordSignup";

const SignupFlow = () => {
    const authStore = useAuthStore();
    const signupStore = useSignupStore();

    const populateEmailContent = () => {
        switch (signupStore.currentStep) {
            case 0:
                return <SignupWelcome />;
            case 1:
                return <EmailSignup />;
            case 2:
                return <VerifyEmailSignup />;
            case 3:
                return <PasswordSignup />;
        }
    };

    return <>{populateEmailContent()}</>;
};

export default observer(SignupFlow);
