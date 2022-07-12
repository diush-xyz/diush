import React from "react";
import { useAuthStore } from "../../../state/auth/Auth.store";
import { observer } from "mobx-react";
import { useSignupStore } from "../../../state/auth/Signup.store";
import SignupWelcome from "../../../components/auth/signup/SignupWelcome";
import EmailSignup from "../../../components/auth/signup/email/EmailSignup";
import PasswordSignup from "../../../components/auth/signup/email/PasswordSignup";
import PermissionsSignup from "../../../components/auth/signup/email/PermissionsSignup";
import DisplayNameSignup from "../../../components/auth/signup/email/DisplayNameSignup";
import FinalWelcomeSignup from "../../../components/auth/signup/email/FinalWelcomeSignup";

const SignupFlow = () => {
    const authStore = useAuthStore();
    const signupStore = useSignupStore();

    const populateEmailContent = () => {
        switch (signupStore.currentStep) {
            case 0:
                return <SignupWelcome />;
            case 1:
                return <EmailSignup />;
            // case 2:
            //     return <VerifyEmailSignup />;
            case 2:
                return <PasswordSignup />;
            case 3:
                return <PermissionsSignup />;
            case 4:
                return <DisplayNameSignup />;
            case 5:
                return <FinalWelcomeSignup />;
        }
    };

    return <>{populateEmailContent()}</>;
};

export default observer(SignupFlow);
