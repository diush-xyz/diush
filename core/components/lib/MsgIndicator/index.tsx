import React from "react";
import { Animated, View } from "react-native";
import CustomText from "../CustomText";
import { useTheme } from "../../../utils/useTheme.util";
import { useUtilStore } from "../../../state/Util.store";
import { observer } from "mobx-react";
import styled from "styled-components/native";
import { LoggedInScreen } from "../../../@types/GlobalTypes";

const MsgIndicator = () => {
    const utilStore = useUtilStore();
    const scaleValue = React.useRef(new Animated.Value(0)).current;

    const Wrapper = styled(Animated.View)`
        box-shadow: 0px 0px 5px #202226;
        transition: 0.5s delay;
    `;

    React.useEffect(() => {
        if (utilStore.msgIndicator) {
            Animated.spring(scaleValue, {
                toValue: 1,
                //@ts-ignore
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    });

    return (
        <Wrapper
            style={[
                {
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 5000,
                },
                { transform: [{ scale: scaleValue }] },
            ]}
        >
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                    top:
                        utilStore.currentLoggedInScreen == LoggedInScreen.BUY
                            ? -350
                            : 50, // this is shit code, but I srly wanna launch this now
                    zIndex: 1000,
                    backgroundColor: "#202226",
                    borderRadius: 15,
                }}
            >
                <CustomText font="Bold">
                    {utilStore.msgIndicatorText}
                </CustomText>
            </View>
        </Wrapper>
    );
};

export default observer(MsgIndicator);
