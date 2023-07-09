import React from "react";
import CustomText from "../../../../../../components/lib/CustomText";
import { observer } from "mobx-react";
import ScreenHeader from "../../../../../../components/lib/ScreenHeader";
import { Animated, Dimensions, Easing, View } from "react-native";
import { useOfferStore } from "../../../../../../state/auth/Offer.store";
import { useConversationStore } from "../../../../../../state/auth/Conversation.store";
import RoundedMoreIcon from "../../../../../../icons/common/RoundedMore";
import { MAX_WIDTH } from "../../../../../../utils/constants";
import ProfileImage from "../../../../../../components/lib/ProfileImage";
import { useAuthStore } from "../../../../../../state/auth/Auth.store";
import ChevronRight from "../../../../../../icons/catalog/ChevronRight";
import InfoSection from "../../../../../../components/home/Conversation/ReviewOfferScreen/InfoSection";
import LeftArrowIcon from "../../../../../../icons/common/leftArrow";
import { useTheme } from "../../../../../../utils/useTheme.util";
import ChevronUpIcon from "../../../../../../icons/home/conversation/ChevronUp";
import styled from "styled-components/native";
import GestureRecognizer from "react-native-swipe-detect";
import WarningConfirmation from "../../../../../../components/lib/Modals/WarningConfirmation";
import CompactIcon from "../../../../../../components/catalog/viewProduct/CustomDeleteConfirmation/CompactIcon";
import MoneyCompactIcon from "../../../../../../icons/home/conversation/MoneyCompactIcon";
import {
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { auth, db } from "../../../../../../../config/firebase";
import {
    CatalogStatus,
    OfferStatus,
} from "../../../../../../@types/GlobalTypes";
import askingPrice from "../../../../../../components/catalog/editProduct/askingPrice";
import { deriveProductConditionFromDb } from "../../../../../../utils/productCondition.util";
import WarningIcon from "../../../../../../icons/common/warning";
import { createOfferInDb } from "../../../../../../utils/offers.util";
import { v4 as uuidv4 } from "uuid";
import {
    HAPTIC_OPTIONS,
    hapticFeedback,
} from "../../../../../../utils/haptics.util";
import WaitIcon from "../../../../../../components/catalog/viewProduct/CustomDeleteConfirmation/WaitIcon";

const ReviewOfferHome = () => {
    const offerStore = useOfferStore();
    const conversationStore = useConversationStore();
    const { user } = useAuthStore();
    const theme = useTheme();
    const [swipeStarted, setSwipeStarted] = React.useState<boolean>(false);
    const [
        offerAcceptanceConfirmationModal,
        setOfferAcceptanceConfirmationModal,
    ] = React.useState<boolean>(false);
    const [undoConfirmationModal, setUndoConfirmationModal] =
        React.useState<boolean>(false);
    const [count, setCount] = React.useState<number>(0);
    const [isOfferMine, setIsOfferMine] = React.useState<boolean>(null);
    const [isProductMine, setIsProductMine] = React.useState<boolean>(null);
    const [buyOrSellText, setBuyOrSellText] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const [sellerConversations, setSellerConversations] = React.useState([]);
    const [tapped, setTapped] = React.useState<boolean>(false);
    const [alreadyAcceptedWarningModal, setAlreadyAcceptedWarningModal] =
        React.useState<boolean>(false);

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

    const fetchSellerConversations = async () => {
        try {
            const q = query(
                collection(db, "conversations"),
                where(
                    "linkedProductID",
                    "==",
                    conversationStore.activeConversationProduct.id
                )
            );

            const querySnapshot = await getDocs(q);
            const fetched = [];

            querySnapshot.forEach(documentSnapshot => {
                fetched.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });

            setSellerConversations(fetched);
        } catch (error) {
            console.error(
                "An error occurred fetching all of the seller's conversations:",
                error
            );
        }
    };

    const onAcceptOffer = async () => {
        const offerRef = doc(db, "offers", offerStore.offerBeingReviewed.id);
        const productRef = doc(
            db,
            "products",
            conversationStore.activeConversation.linkedProductID
        );

        const conversationRef = doc(
            db,
            "conversations",
            conversationStore.activeConversation.id
        );

        await updateDoc(offerRef, {
            status: OfferStatus.ACCEPTED,
        }).then(() => {
            offerStore.setOfferBeingReviewed(null);
        });

        await updateDoc(conversationRef, {
            dealReached: true,
        }).then(() => {
            conversationStore.setActiveConversation({
                ...conversationStore.activeConversation,
                dealReached: true,
            });
        });

        await updateDoc(productRef, {
            dealReached: true,
        });
    };

    const onUndoDeal = async () => {
        const offerRef = doc(db, "offers", offerStore.offerBeingReviewed.id);
        const productRef = doc(
            db,
            "products",
            conversationStore.activeConversation.linkedProductID
        );
        const conversationRef = doc(
            db,
            "conversations",
            conversationStore.activeConversation.id
        );

        await updateDoc(offerRef, {
            status: OfferStatus.PENDING,
        }).then(() => {
            offerStore.setOfferBeingReviewed(null);
        });

        await updateDoc(conversationRef, {
            dealReached: false,
        }).then(() => {
            conversationStore.setActiveConversation({
                ...conversationStore.activeConversation,
                dealReached: false,
            });
        });

        await updateDoc(productRef, {
            dealReached: false,
        });
    };

    React.useEffect(() => {
        if (swipeStarted) {
            offerStore.offerBeingReviewed.status == OfferStatus.ACCEPTED
                ? setUndoConfirmationModal(true)
                : setOfferAcceptanceConfirmationModal(true);
        }
    }, [swipeStarted]);

    React.useEffect(() => {
        if (offerStore.offerBeingReviewed.placedByUID == user.id) {
            setIsOfferMine(true);
        } else {
            setIsOfferMine(false);
        }

        if (conversationStore.activeConversation.sellerUID == user.id) {
            setIsProductMine(true);
        } else {
            setIsProductMine(false);
        }
    }, []);

    React.useEffect(() => {
        if (isProductMine !== null && isOfferMine !== null) {
            setBuyOrSellText(isProductMine ? "sell" : "buy");
            setLoading(false);
        }
    }, [isProductMine, isOfferMine]);

    React.useEffect(() => {
        const hasDealReached = sellerConversations.some(
            conversation => conversation.dealReached
        );

        if (tapped) {
            if (!hasDealReached) {
                onAcceptOffer();
            } else {
                hapticFeedback(HAPTIC_OPTIONS.ERROR);
                setSwipeStarted(false);
                //necessary
                setCount(0);
                setSwipeStarted(false);
                setOfferAcceptanceConfirmationModal(false);
                //warn the user
                setAlreadyAcceptedWarningModal(true);
            }
        }
    }, [sellerConversations]);

    if (loading) {
        return <CustomText accent>loading...</CustomText>;
    }

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
                    button={
                        !(
                            offerStore.offerBeingReviewed.placedByUID == user.id
                        ) &&
                        !(
                            offerStore.offerBeingReviewed.status ==
                            OfferStatus.ACCEPTED
                        )
                    }
                    buttonText="counter"
                    onButtonPress={() =>
                        offerStore.setIsOfferBeingCountered(true)
                    }
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
                                        ?.title
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
                            {/* <RoundedMoreIcon /> */}
                            {/*TODO: Add this back later, maybe??*/}
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
                        <ProfileImage
                            specificUser={
                                isProductMine
                                    ? user
                                    : conversationStore.activeConvoOtherUser
                            }
                            size={20}
                        />
                        <CustomText
                            fontSize={16}
                            style={{ marginLeft: 6 }}
                            font="Bold"
                        >
                            <CustomText font="Bold" style={{ opacity: 0.5 }}>
                                listed by
                            </CustomText>{" "}
                            {conversationStore.activeConversation.sellerUID ==
                            user.id
                                ? "me"
                                : conversationStore.activeConvoOtherUser
                                      .displayName}
                        </CustomText>
                        {/*TODO: Come back to this*/}
                        <ChevronRight style={{ marginLeft: 7 }} />
                    </View>
                    <InfoSection />
                    <View style={{ marginTop: 45 }}>
                        <CustomText font="Heavy" fontSize={18}>
                            offer summary & agreement
                        </CustomText>
                        <CustomText
                            secondary
                            style={{
                                marginTop: 6,
                                textDecorationLine:
                                    offerStore.offerBeingReviewed.status ==
                                    OfferStatus.DECLINED
                                        ? "line-through"
                                        : "none",
                            }}
                        >
                            {offerStore.offerBeingReviewed.status ==
                            OfferStatus.ACCEPTED
                                ? `when you ${
                                      isProductMine ? "accepted" : "sent"
                                  } this offer, you agreed to ${buyOrSellText}`
                                : isOfferMine
                                ? `if this offer you sent is accepted, you agree to ${buyOrSellText}`
                                : `by accepting this offer, you agree to ${buyOrSellText}`}{" "}
                            <CustomText secondary font="Black">
                                one
                            </CustomText>{" "}
                            item’s worth of {isProductMine ? "your" : "the"}{" "}
                            product,{" "}
                            <CustomText secondary font="Black">
                                '
                                {
                                    conversationStore.activeConversationProduct
                                        ?.title
                                }
                                '
                            </CustomText>{" "}
                            {isProductMine ? "to" : "from"}{" "}
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
                        {offerStore.offerBeingReviewed.status ==
                            OfferStatus.DECLINED && (
                            <CustomText secondary style={{ marginTop: 6 }}>
                                Given the fact this offer has been declined, its
                                terms{" "}
                                <CustomText secondary font="Black">
                                    no longer stand.
                                </CustomText>
                            </CustomText>
                        )}
                    </View>
                </View>
            </View>
            {/*TODO: Going to have to update this logic when dealing with outgoing conversations*/}
            {!(offerStore.offerBeingReviewed.placedByUID == user.id) &&
                !(
                    offerStore.offerBeingReviewed.status == OfferStatus.DECLINED
                ) && (
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
                            backgroundColor:
                                offerStore.offerBeingReviewed.status ==
                                OfferStatus.ACCEPTED
                                    ? theme.accent
                                    : theme.success,
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
                            <CustomText font="Heavy">
                                {offerStore.offerBeingReviewed.status ==
                                OfferStatus.ACCEPTED
                                    ? "swipe up to undo acceptance"
                                    : "swipe up to accept"}
                            </CustomText>
                        </View>
                    </GestureRecognizer>
                )}
            <WarningConfirmation
                icon={
                    alreadyAcceptedWarningModal ? (
                        <WaitIcon />
                    ) : (
                        <MoneyCompactIcon />
                    )
                }
                title={
                    alreadyAcceptedWarningModal
                        ? "anddd... you can't accept it!"
                        : "accept offer"
                }
                desc={
                    alreadyAcceptedWarningModal
                        ? `a deal has already been reached in another\n conversation involving this product.`
                        : `once you agree to sell to ${conversationStore.activeConvoOtherUser.displayName}, you agree to our Seller Terms.`
                }
                buttonText={
                    alreadyAcceptedWarningModal ? "back to home" : "let's do it"
                }
                buttonOnClick={() => {
                    if (alreadyAcceptedWarningModal) {
                        offerStore.setOfferBeingReviewed(null);
                        conversationStore.setActiveConversation(null);
                    } else {
                        setTapped(true);
                        fetchSellerConversations();
                    }
                }}
                footerText={
                    alreadyAcceptedWarningModal ? "close" : "nope, cancel"
                }
                onFooterClick={() => {
                    if (alreadyAcceptedWarningModal) {
                        offerStore.setOfferBeingReviewed(null);
                    } else {
                        setCount(0);
                        setSwipeStarted(false);
                        setOfferAcceptanceConfirmationModal(false);
                    }
                }}
                visible={
                    alreadyAcceptedWarningModal
                        ? alreadyAcceptedWarningModal
                        : offerAcceptanceConfirmationModal
                }
                isSuccessButton={!alreadyAcceptedWarningModal}
            />
            <WarningConfirmation
                icon={<CompactIcon />}
                title="undo acceptance"
                desc={`be careful! are you sure you want to\n reverse your previous acceptance of\n this offer by ${conversationStore.activeConvoOtherUser.displayName}?`}
                buttonText="yes, i'm sure"
                buttonOnClick={() => {
                    onUndoDeal();
                }}
                footerText="my bad, cancel"
                onFooterClick={() => {
                    setCount(0);
                    setSwipeStarted(false);
                    setUndoConfirmationModal(false);
                }}
                visible={undoConfirmationModal}
            />
        </>
    );
};

export default observer(ReviewOfferHome);
