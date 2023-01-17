import React from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "../../../components/lib/CustomText";
import { observer } from "mobx-react";
import LargeButton from "../../../components/lib/LargeButton";
import { useSettingsStore } from "../../../state/auth/Settings.store";
import { SettingsStatus } from "../../../@types/GlobalTypes";
import ScreenHeader from "../../../components/lib/ScreenHeader";
import { useAuthStore } from "../../../state/auth/Auth.store";
import HorizontalLine from "../../../components/lib/HorizontalLine";
import ChevronRight from "../../../icons/catalog/ChevronRight";
import { ISettingsData } from "../home/SettingsHome.screen";
import { MAX_WIDTH } from "../../../utils/constants";

const SettingsMyAccount = () => {
    const settingsStore = useSettingsStore();
    const { user } = useAuthStore();

    const SETTINGS_MY_ACCOUNT_DATA: ISettingsData[] = [
        {
            text: "account details",
            onClick: () => null,
        },
        {
            text: "deactivate 💔",
            onClick: () => null,
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
                {SETTINGS_MY_ACCOUNT_DATA.map((elem, idx) => {
                    return (
                        <>
                            <TouchableOpacity
                                onPress={() => elem.onClick()}
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginTop: idx == 0 && 8,
                                }}
                            >
                                <CustomText>{elem.text}</CustomText>
                                {elem.isToggle ? (
                                    <CustomText>tg</CustomText>
                                ) : (
                                    <ChevronRight />
                                )}
                            </TouchableOpacity>
                            <HorizontalLine marginVertical={16} />
                        </>
                    );
                })}
            </View>
        </View>
    );
};

export default observer(SettingsMyAccount);
