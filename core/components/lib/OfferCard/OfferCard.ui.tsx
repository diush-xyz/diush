import React from "react";
import {
    Image,
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
import ProfileImage from "../ProfileImage";
import { IOffer, IProduct, IUser } from "../../../@types/GlobalTypes";

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
    specificUser: IUser;
    offer: IOffer;
    product: IProduct;
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
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <Image
                            source={{
                                uri: "https://i.dailymail.co.uk/1s/2022/09/15/20/62457065-0-image-a-16_1663270200100.jpg",
                            }}
                            style={{ height: 29, width: 41 }}
                        />
                        <View style={{ display: "flex" }}>
                            <CustomText
                                primary
                                font="Heavy"
                                fontSize={16}
                                style={{
                                    alignSelf: "flex-start",
                                }}
                            >
                                {props.product.title}
                            </CustomText>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <ProfileImage
                                    specificUser={props.specificUser}
                                    size={14}
                                />
                                <CustomText secondary style={{ marginLeft: 5 }}>
                                    {props.specificUser.displayName} • $
                                    {props.offer?.amount}
                                </CustomText>
                            </View>
                        </View>
                    </View>
                    <LargeButton title="review offer" onPress={() => null} />
                </View>
            </CustomChildOfferCard>
        </View>
    );
};

export default OfferCard;