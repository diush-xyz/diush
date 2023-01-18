import React from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "../../../../components/lib/CustomText";
import { observer } from "mobx-react";
import LargeButton from "../../../../components/lib/LargeButton";
import { useSettingsStore } from "../../../../state/auth/Settings.store";
import {
    MyAccountSettingsStatus,
    SettingsStatus,
} from "../../../../@types/GlobalTypes";
import ScreenHeader from "../../../../components/lib/ScreenHeader";
import { useAuthStore } from "../../../../state/auth/Auth.store";
import HorizontalLine from "../../../../components/lib/HorizontalLine";
import { ISettingsData } from "../../home/SettingsHome.screen";
import { MAX_WIDTH } from "../../../../utils/constants";
import SettingsChevronRight from "../../../../icons/settings/chevronRight";
import MenuElem from "../../../../components/settings/MenuElem";

const MyAccountHome = () => {
    const settingsStore = useSettingsStore();
    const { user } = useAuthStore();

    const SETTINGS_MY_ACCOUNT_DATA: ISettingsData[] = [
        {
            text: "account details",
            onClick: () =>
                settingsStore.setMyAccountSettingsStatus(
                    MyAccountSettingsStatus.ACCOUNT_DETAILS
                ),
        },
        {
            text: "deactivate 💔",
            onClick: () =>
                settingsStore.setMyAccountSettingsStatus(
                    MyAccountSettingsStatus.DEACTIVATE
                ),
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
                    settingsStore.setSettingsStatus(SettingsStatus.HOME)
                }
                title="my account"
                subtitle={user.displayName}
            />
            <View
                style={{
                    display: "flex",
                    width: MAX_WIDTH,
                    marginTop: 22,
                }}
            >
                <HorizontalLine marginVertical={8} />
                {SETTINGS_MY_ACCOUNT_DATA.map(
                    (elem: ISettingsData, idx: number) => {
                        return (
                            <MenuElem
                                key={idx}
                                idx={idx}
                                text={elem.text}
                                onClick={elem.onClick}
                            />
                        );
                    }
                )}
            </View>
        </View>
    );
};

export default observer(MyAccountHome);
