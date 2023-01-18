import React from "react";
import CustomText from "../../../../components/lib/CustomText";
import { observer } from "mobx-react";
import { View } from "react-native";
import ScreenHeader from "../../../../components/lib/ScreenHeader";
import { useSettingsStore } from "../../../../state/auth/Settings.store";
import { MyAccountSettingsStatus } from "../../../../@types/GlobalTypes";
import { MAX_WIDTH } from "../../../../utils/constants";
import HorizontalLine from "../../../../components/lib/HorizontalLine";
import { ISettingsData } from "../../home/SettingsHome.screen";
import MenuElem from "../../../../components/settings/MenuElem";
import { useAuthStore } from "../../../../state/auth/Auth.store";

const AccountDetails = () => {
    const settingsStore = useSettingsStore();
    const { user } = useAuthStore();

    const SETTINGS_MYACCOUNT_DETAILS_DATA: ISettingsData[] = [
        {
            text: "full name",
            onClick: () =>
                settingsStore.setMyAccountSettingsStatus(
                    MyAccountSettingsStatus.ACCOUNT_DETAILS
                ),
            rightText: user.displayName,
        },
        {
            text: "email",
            onClick: () =>
                settingsStore.setMyAccountSettingsStatus(
                    MyAccountSettingsStatus.DEACTIVATE
                ),
            rightText: user.email,
        },
        {
            text: "profile picture",
            onClick: () =>
                settingsStore.setMyAccountSettingsStatus(
                    MyAccountSettingsStatus.DEACTIVATE
                ),
            cta: true,
            rightText: user.photoURL ? "change" : "add",
        },
    ];

    return (
        <View
            style={{
                alignItems: "center",
                flex: 1,
                marginTop: 55,
                width: "100%",
            }}
        >
            <ScreenHeader
                backArrow
                backArrowOnPress={() =>
                    settingsStore.setMyAccountSettingsStatus(
                        MyAccountSettingsStatus.HOME
                    )
                }
                title="account details"
                subtitle="my account"
            />
            <View
                style={{
                    display: "flex",
                    width: MAX_WIDTH,
                    marginTop: 22,
                }}
            >
                <HorizontalLine marginVertical={8} />
                {SETTINGS_MYACCOUNT_DETAILS_DATA.map(
                    (elem: ISettingsData, idx: number) => {
                        return <MenuElem key={idx} idx={idx} {...elem} />;
                    }
                )}
            </View>
        </View>
    );
};

export default observer(AccountDetails);
