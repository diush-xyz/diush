import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuthStore } from "../../../state/auth/Auth.store";
import { AuthStatus } from "../../../@types/GlobalTypes";
import CustomText from "../../../components/lib/CustomText";
import { observer } from "mobx-react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useTheme } from "../../../utils/useTheme.util";

const LoginFlow = () => {
    const authStore = useAuthStore();
    const theme = useTheme();

    return (
        <BottomSheetView
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.popupBackground,
            }}
        >
            <Text>LoginFlow</Text>
            <TouchableOpacity
                onPress={() => authStore.setAuthStatus(AuthStatus.SQUARE_ONE)}
            >
                <CustomText accent>Back</CustomText>
            </TouchableOpacity>
            {/* </View> */}
        </BottomSheetView>
    );
};

export default observer(LoginFlow);
