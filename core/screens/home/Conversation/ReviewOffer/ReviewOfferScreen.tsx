import React from "react";
import CustomText from "../../../../components/lib/CustomText";
import { observer } from "mobx-react";
import ScreenHeader from "../../../../components/lib/ScreenHeader";
import { Animated, Dimensions, Easing, View } from "react-native";
import { useOfferStore } from "../../../../state/auth/Offer.store";
import { useConversationStore } from "../../../../state/auth/Conversation.store";
import RoundedMoreIcon from "../../../../icons/common/RoundedMore";
import { MAX_WIDTH } from "../../../../utils/constants";
import ProfileImage from "../../../../components/lib/ProfileImage";
import { useAuthStore } from "../../../../state/auth/Auth.store";
import ChevronRight from "../../../../icons/catalog/ChevronRight";
import InfoSection from "../../../../components/home/Conversation/ReviewOfferScreen/InfoSection";
import LeftArrowIcon from "../../../../icons/common/leftArrow";
import { useTheme } from "../../../../utils/useTheme.util";
import ChevronUpIcon from "../../../../icons/home/conversation/ChevronUp";
import styled from "styled-components/native";
import GestureRecognizer from "react-native-swipe-detect";
import WarningConfirmation from "../../../../components/lib/Modals/WarningConfirmation";
import CompactIcon from "../../../../components/catalog/viewProduct/CustomDeleteConfirmation/CompactIcon";
import MoneyCompactIcon from "../../../../icons/home/conversation/MoneyCompactIcon";

const ReviewOfferScreen = () => {
    const offerStore = useOfferStore();
    const conversationStore = useConversationStore();
    const { user } = useAuthStore();
    const theme = useTheme();
    const [swipeStarted, setSwipeStarted] = React.useState<boolean>(false);
    const [isWarningModalOpen, setIsWarningModalOpen] =
        React.useState<boolean>(false);
    const [count, setCount] = React.useState<number>(0);

    const ChevronUpWrapper = styled(View)`
        box-shadow: 0px 0px 5px ${theme.primaryText};
    `;

    const animatedValue = React.useRef(new Animated.Value(0)).current;
    const [isTop, setIsTop] = React.useState(true);

    const startAnimation = toValue => {
        Animated.timing(animatedValue, {
            toValue,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            setIsTop(!isTop);
        });
    };

    React.useEffect(() => {
        startAnimation(isTop ? 1 : 0);
    }, [isTop]);

    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 10],
        extrapolate: "clamp",
    });

    const scale = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1.3, 0.9],
        extrapolate: "clamp",
    });

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
    };

    React.useEffect(() => {
        if (swipeStarted) {
            setIsWarningModalOpen(true);
        }
    }, [swipeStarted]);

    return (
        <>
            <View
                style={{
                    alignItems: "center",
                    flex: 1,
                    marginTop: 55,
                    width: "100%",
                }}
            >
                {/* <View
                style={{
                    position: "absolute",
                    backgroundColor: "black",
                    opacity: 0.5,
                    width: Dimensions.get("window").width,
                    height: Dimensions.get("window").height,
                }}
            /> */}
                <ScreenHeader
                    backArrow
                    backArrowOnPress={() =>
                        offerStore.setOfferBeingReviewed(null)
                    }
                    title="offer review"
                    button
                    buttonText="counter"
                    // onButtonPress={() => save()}
                    // buttonDisabled={!hasChanged}
                    paddingBottom={16}
                />
                <View
                    style={{ display: "flex", width: MAX_WIDTH, marginTop: 16 }}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <View>
                            <CustomText font="Heavy" fontSize={22}>
                                {
                                    conversationStore.activeConversationProduct
                                        .title
                                }{" "}
                                <CustomText
                                    secondary
                                    font="Heavy"
                                    fontSize={22}
                                >
                                    •
                                </CustomText>{" "}
                                <CustomText accent font="Heavy" fontSize={22}>
                                    ${offerStore.offerBeingReviewed.amount}
                                </CustomText>
                            </CustomText>
                        </View>
                        <View>
                            <RoundedMoreIcon />
                        </View>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: 10,
                            alignItems: "center",
                        }}
                    >
                        <ProfileImage specificUser={user} size={20} />
                        <CustomText
                            fontSize={16}
                            style={{ marginLeft: 6 }}
                            font="Bold"
                        >
                            <CustomText font="Bold" style={{ opacity: 0.5 }}>
                                listed by
                            </CustomText>{" "}
                            me
                        </CustomText>
                        {/*TODO: Come back to this*/}
                        <ChevronRight style={{ marginLeft: 7 }} />
                    </View>
                    <InfoSection />
                    <View style={{ marginTop: 45 }}>
                        <CustomText font="Heavy" fontSize={18}>
                            offer summary
                        </CustomText>
                        <CustomText secondary style={{ marginTop: 6 }}>
                            by accepting this offer, you agree to sell{" "}
                            <CustomText secondary font="Black">
                                one
                            </CustomText>{" "}
                            item’s worth of your product,{" "}
                            <CustomText secondary font="Black">
                                {
                                    conversationStore.activeConversationProduct
                                        .title
                                }
                            </CustomText>{" "}
                            to{" "}
                            <CustomText secondary font="Black">
                                {
                                    conversationStore.activeConvoOtherUser
                                        .displayName
                                }
                            </CustomText>{" "}
                            for{" "}
                            <CustomText secondary font="Black">
                                ${offerStore.offerBeingReviewed.amount}
                            </CustomText>
                            .
                        </CustomText>
                    </View>
                </View>
            </View>
            <GestureRecognizer
                onSwipeUp={() => {
                    if (count === 0 && !swipeStarted) {
                        setCount(count + 1);
                        setSwipeStarted(true);
                    }
                }}
                config={config}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    backgroundColor: theme.success,
                    height: 130,
                    borderRadius: -20,
                }}
            >
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 20,
                    }}
                >
                    <Animated.View
                        style={{
                            transform: [{ translateY }, { scale }],
                            marginBottom: 15,
                        }}
                    >
                        <ChevronUpIcon />
                    </Animated.View>
                    <CustomText font="Heavy">swipe up to accept</CustomText>
                </View>
            </GestureRecognizer>
            <WarningConfirmation
                icon={<MoneyCompactIcon />}
                title="accept offer"
                desc={`once you agree to sell to ${conversationStore.activeConvoOtherUser.displayName}, you agree to our Seller Terms.`}
                buttonText="let's do it"
                buttonOnClick={() => {
                    console.log("tuki");
                }}
                footerText="nope, cancel"
                onFooterClick={() => {
                    setCount(0);
                    setSwipeStarted(false);
                    setIsWarningModalOpen(false);
                }}
                visible={isWarningModalOpen}
                isSuccessButton
            />
        </>
    );
};

export default observer(ReviewOfferScreen);
