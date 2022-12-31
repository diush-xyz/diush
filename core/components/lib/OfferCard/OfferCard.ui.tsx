import React from "react";
import {
    NativeSyntheticEvent,
    NativeTouchEvent,
    StyleProp,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import CustomText from "../CustomText";
import { useTheme } from "../../../utils/useTheme.util";
import { MAX_WIDTH } from "../../../utils/constants";
import LargeButton from "../LargeButton";
import SmallButton from "../SmallButton";

//TODO: Must add proper gradient background to button (not working, blank for now)

interface ICustomChildOfferCard {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

const BORDER_COLORS = ["#C897F9", "#FF3F70"];

/**
 * Same as Large Button (only no provided child with props). Fully custom.
 */
export const CustomChildOfferCard = (props: ICustomChildOfferCard) => {
    const theme = useTheme();
    return (
        <>
            {/*@ts-ignore*/}
            <LinearGradient
                colors={BORDER_COLORS}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 1.0 }}
                style={{
                    height: 180,
                    width: "100%",
                    justifyContent: "center",
                    alignSelf: "center",
                    borderRadius: 22,
                    padding: 2,
                    maxWidth: MAX_WIDTH,
                }}
            >
                <TouchableOpacity style={props.style}>
                    {/*@ts-ignore*/}
                    {props.children}
                </TouchableOpacity>
            </LinearGradient>
        </>
    );
};

interface IOfferCard {
    title: string;
}

/**
 * Large button component with props (child provided for mos common use case.
 * @see CustomChildOfferCard for more options
 */
const OfferCard = (props: IOfferCard) => {
    const theme = useTheme();
    return (
        <View style={{ display: "flex", width: "100%" }}>
            <CustomChildOfferCard
                style={{
                    flex: 1.0,
                    paddingVertical: 15,
                    alignSelf: "center",
                    justifyContent: "center",
                    width: "100%",
                    backgroundColor: theme.background,
                    borderRadius: 22,
                    paddingHorizontal: 10,
                }}
            >
                <View
                    style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <CustomText
                        primary
                        font="Bold"
                        style={{
                            alignSelf: "center",
                        }}
                    >
                        {props.title}
                    </CustomText>
                    <LargeButton title="review offer" onPress={() => null} />
                </View>
            </CustomChildOfferCard>
        </View>
    );
};

export default OfferCard;
