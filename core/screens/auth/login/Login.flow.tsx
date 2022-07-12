import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuthStore } from "../../../state/auth/Auth.store";
import { AuthStatus } from "../../../@types/GlobalTypes";
import CustomText from "../../../components/lib/CustomText";
import { observer } from "mobx-react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useTheme } from "../../../utils/useTheme.util";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import { useLoginStore } from "../../../state/auth/Login.store";
import EmailLogin from "../../../components/auth/login/EmailLogin";
import PasswordLogin from "../../../components/auth/login/PasswordLogin";

const LoginFlow = () => {
    const authStore = useAuthStore();
    const loginStore = useLoginStore();

    const populateEmailContent = () => {
        switch (loginStore.currentStep) {
            case 0:
                return <EmailLogin />;
            case 1:
                return <PasswordLogin />;
        }
    };
    return <>{populateEmailContent()}</>;
};

export default observer(LoginFlow);
