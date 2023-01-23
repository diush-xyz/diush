import React from "react";
import { Switch, TouchableOpacity, View } from "react-native";
import SettingsChevronRight from "../../../icons/settings/chevronRight";
import CustomText from "../../lib/CustomText";
import HorizontalLine from "../../lib/HorizontalLine";
import { ISettingsData } from "../../../screens/settings/home/SettingsHome.screen";
import { useTheme } from "../../../utils/useTheme.util";
import styled from "styled-components";
import SettingsAccentChevronRight from "../../../icons/settings/chevronRight/AccentChevronRight";

interface IMenuElem extends ISettingsData {
    idx: number;
}

const MenuElem = (props: IMenuElem) => {
    const theme = useTheme();
    const [isOn, setIsOn] = React.useState<boolean>(props.toggleValue);

    React.useEffect(() => {
        props.isToggle && props.onToggleChange(isOn);
    }, [isOn]);

    return (
        <>
            <TouchableOpacity
                onPress={() => props.onClick()}
                activeOpacity={props.isNotPressable ? 1 : 0.5}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: props.idx == 0 && 8,
                    opacity: props.isComingSoon ? 0.5 : 1,
                }}
            >
                <CustomText>{props.text}</CustomText>
                {!props.isRightSideEmpty && (
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {props.isComingSoon && (
                            <View
                                style={{
                                    backgroundColor: "#ffffff0d",
                                    padding: 5,
                                    borderRadius: 6,
                                    marginRight: 8,
                                }}
                            >
                                <CustomText fontSize={14}>SOON</CustomText>
                            </View>
                        )}
                        {props.rightText && (
                            <CustomText
                                secondary={!props.cta}
                                accent={props.cta}
                                style={{ marginRight: 9 }}
                            >
                                {props.rightText}
                            </CustomText>
                        )}
                        {props.isToggle ? (
                            <Switch
                                value={isOn}
                                onValueChange={(value: boolean) =>
                                    setIsOn(value)
                                }
                                trackColor={{ true: theme.accent }}
                                style={{
                                    transform: [
                                        { scaleX: 0.8 },
                                        { scaleY: 0.8 },
                                    ],
                                }}
                            />
                        ) : props.cta ? (
                            <SettingsAccentChevronRight />
                        ) : (
                            <SettingsChevronRight />
                        )}
                    </View>
                )}
            </TouchableOpacity>
            <HorizontalLine marginVertical={16} />
        </>
    );
};

export default MenuElem;
