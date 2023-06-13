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
import {
    IOffer,
    IProduct,
    IUser,
    OfferStatus,
} from "../../../@types/GlobalTypes";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { useAuthStore } from "../../../state/auth/Auth.store";

//TODO: Must add proper gradient background to button (not working, blank for now)

interface ICustomChildOfferCard {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    isOfferAccepted: boolean;
}

/**
 * Same as Large Button (only no provided child with props). Fully custom.
 */
export const CustomChildOfferCard = (props: ICustomChildOfferCard) => {
    const theme = useTheme();
    const BORDER_COLORS = ["#C897F9", "#FF3F70"];
    const ACCEPTED_BORDER_COLORS = [theme.success, theme.success];

    return (
        <>
            {/*@ts-ignore*/}
            <LinearGradient
                colors={
                    props.isOfferAccepted
                        ? ACCEPTED_BORDER_COLORS
                        : BORDER_COLORS
                }
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 1.0 }}
                style={{
                    height: 180,
                    width: 281,
                    justifyContent: "center",
                    alignSelf: "center",
                    borderRadius: 22,
                    padding: 2,
                    maxWidth: MAX_WIDTH,
                }}
            >
                <View style={props.style}>
                    {/*@ts-ignore*/}
                    {props.children}
                </View>
            </LinearGradient>
        </>
    );
};

interface IOfferCard {
    specificUser: IUser;
    offer: IOffer;
    product: IProduct;
    onReviewPress: () => void;
}

/**
 * Large button component with props (child provided for mos common use case.
 * @see CustomChildOfferCard for more options
 */
const OfferCard = (props: IOfferCard) => {
    const theme = useTheme();
    const { user } = useAuthStore();

    const getStatusTextColor = () => {
        switch (props.offer.status) {
            case OfferStatus.ACCEPTED:
                return theme.success;
            case OfferStatus.PENDING:
                return theme.primaryText;
            case OfferStatus.DECLINED:
                return theme.accent;
        }
    };

    const updateReadStatus = async () => {
        const offerRef = doc(db, "offers", props.offer.id);

        await updateDoc(offerRef, {
            isReadByRecipient: true,
        });
    };

    const getButtonText = () => {
        switch (props.offer.status) {
            case OfferStatus.ACCEPTED:
                return "view details";
            case OfferStatus.DECLINED:
                return "view details";
            case OfferStatus.PENDING:
                return "review offer";
        }
    };

    React.useEffect(() => {
        updateReadStatus();
    }, []);

    return (
        <View style={{ display: "flex", width: "100%" }}>
            <CustomChildOfferCard
                isOfferAccepted={props.offer.status === OfferStatus.ACCEPTED}
                style={{
                    flex: 1.0,
                    paddingVertical: 15,
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
                        justifyContent: "space-between",
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            source={{
                                uri: "https://i.dailymail.co.uk/1s/2022/09/15/20/62457065-0-image-a-16_1663270200100.jpg",
                            }}
                            style={{ height: 29, width: 41, borderRadius: 5 }}
                        />
                        <View style={{ display: "flex", marginLeft: 11 }}>
                            <CustomText
                                primary
                                font="Heavy"
                                fontSize={16}
                                style={{
                                    alignSelf: "flex-start",
                                }}
                            >
                                {props.product?.title}
                            </CustomText>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginTop: 5,
                                }}
                            >
                                <ProfileImage
                                    specificUser={props.specificUser}
                                    size={14}
                                />
                                <CustomText
                                    font="Bold"
                                    secondary
                                    fontSize={14}
                                    style={{ marginLeft: 5 }}
                                >
                                    {props.specificUser?.displayName} •{" "}
                                    <CustomText
                                        fontSize={14}
                                        style={{
                                            color:
                                                props.offer.status ==
                                                OfferStatus.ACCEPTED
                                                    ? theme.success
                                                    : theme.accent,
                                        }}
                                    >
                                        ${props.offer?.amount}
                                    </CustomText>
                                </CustomText>
                            </View>
                        </View>
                    </View>
                    <View style={{ display: "flex" }}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <CustomText>original asking price:</CustomText>
                            <CustomText>
                                ${props.product?.askingPrice}
                            </CustomText>
                        </View>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 5,
                            }}
                        >
                            <CustomText>status</CustomText>
                            <CustomText
                                style={{
                                    color: getStatusTextColor(),
                                    opacity:
                                        props.offer.status ==
                                        OfferStatus.PENDING
                                            ? 0.5
                                            : 1,
                                }}
                            >
                                {props.offer.status?.toLowerCase()}
                            </CustomText>
                        </View>
                    </View>
                    <LargeButton
                        title={
                            props.offer.placedByUID == user.id
                                ? "view my offer"
                                : getButtonText()
                        }
                        onPress={() => props.onReviewPress()}
                        isSuccessButton={
                            props.offer.status == OfferStatus.ACCEPTED
                        }
                    />
                </View>
            </CustomChildOfferCard>
        </View>
    );
};

export default OfferCard;
