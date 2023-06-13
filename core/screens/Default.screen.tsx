import React from "react";
import { useAuthStore } from "../state/auth/Auth.store";
import { AuthStatus } from "../@types/GlobalTypes";
import { useUtilStore } from "../state/Util.store";
import CopiedIndicator from "../components/lib/MsgIndicator";
import ScreenHandler from "./ScreenHandler";
import AuthScreen from "./auth/Auth.screen";
import { View } from "react-native";
import { observer } from "mobx-react";

const DefaultScreen = () => {
    const authStore = useAuthStore();
    const utilStore = useUtilStore();

    return (
        <>
            {authStore.authStatus == AuthStatus.AUTHENTICATED ? (
                <>
                    {utilStore.msgIndicator && <CopiedIndicator />}
                    <ScreenHandler />
                </>
            ) : (
                <AuthScreen />
            )}
        </>
    );
};

export default observer(DefaultScreen);
