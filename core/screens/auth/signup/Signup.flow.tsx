import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuthStore } from "../../../state/auth/Auth.store";
import { AuthStatus } from "../../../@types/GlobalTypes";
import CustomText from "../../../components/lib/CustomText";
import { observer } from "mobx-react";
import { BottomSheetView } from "@gorhom/bottom-sheet";

const SignupFlow = () => {
    const authStore = useAuthStore();

    return (
        <BottomSheetView
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text>SignupFlow</Text>
            <TouchableOpacity
                onPress={() => authStore.setAuthStatus(AuthStatus.SQUARE_ONE)}
            >
                <CustomText primary>Back</CustomText>
            </TouchableOpacity>
        </BottomSheetView>
    );
};

export default observer(SignupFlow);
