import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { MAX_WIDTH } from "../../../../utils/constants";
import CustomText from "../../../lib/CustomText";
import { useTheme } from "../../../../utils/useTheme.util";
import {
    IConversation,
    IOffer,
    IProduct,
    IUser,
} from "../../../../@types/GlobalTypes";
import { useAuthStore } from "../../../../state/auth/Auth.store";
import { observer } from "mobx-react";
import { fetchUserFromDb } from "../../../../utils/user.utils";
import {
    Timestamp,
    collection,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { db } from "../../../../../config/firebase";
import TimeAgo from "javascript-time-ago";
import { useConversationStore } from "../../../../state/auth/Conversation.store";
import { getInitials } from "../../../../utils/initials.util";
import ProfileImage from "../../../lib/ProfileImage";
import dayjs from "dayjs";

export enum CONVERSATION {
    INCOMING,
    TO_OTHERS,
}

interface IConversationInstance {
    type: CONVERSATION;
    data: IConversation;
    canFetch: boolean;
    onPress: () => void;
}

const ConversationInstance = (props: IConversationInstance) => {
    const conversationStore = useConversationStore();
    const theme = useTheme();
    const authStore = useAuthStore();
    const [otherUser, setOtherUser] = React.useState<IUser>(null);
    const [linkedProduct, setLinkedProduct] = React.useState(null);
    const [offers, setOffers] = React.useState([]);
    const [mostRecentOffer, setMostRecentOffer] = React.useState<IOffer>(null);
    const [mostRecentOfferTimeAgo, setMostRecentOfferTimeAgo] =
        React.useState<string>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [unreadOffersCount, setUnreadOffersCount] = React.useState<number>(0);
    const [executeCount, setExecuteCount] = React.useState<number>(0);

    const relativeTime = require("dayjs/plugin/relativeTime");
    dayjs.extend(relativeTime);

    const fetchOtherUser = () => {
        fetchUserFromDb({
            id:
                props.type == CONVERSATION.INCOMING
                    ? props.data.buyerUID
                    : props.data.sellerUID,
            setUser: (fUser: IUser) => {
                setOtherUser(fUser);
            },
        });
    };

    const fetchLinkedProduct = () => {
        const q = query(
            collection(db, "products"),
            where("id", "==", props.data.linkedProductID)
        );
        onSnapshot(q, querySnapshot => {
            querySnapshot.forEach(doc => {
                setLinkedProduct(doc.data());
            });
        });
    };

    const fetchOffers = () => {
        const q = query(
            collection(db, "offers"),
            where("linkedConversationID", "==", props.data.id)
        );

        onSnapshot(q, querySnapshot => {
            const fetched = [];
            setOffers([]);

            querySnapshot.forEach(documentSnapshot => {
                console.log(documentSnapshot.data().timestamp);
                setOffers(prev => [...prev, documentSnapshot.data()]);
            });
        });
    };

    //get the offer that is the most recent based on its timestamp property
    const getMostRecentOffer = () => {
        let mostRecentOffer = null;
        offers.forEach(offer => {
            if (mostRecentOffer == null) {
                mostRecentOffer = offer;
            } else {
                if (offer.timestamp > mostRecentOffer.timestamp) {
                    mostRecentOffer = offer;
                }
            }
        });
        const parsed = dayjs.unix(mostRecentOffer.timestamp.seconds);

        //TWO ACTIONS:
        setMostRecentOfferTimeAgo(
            //@ts-ignore
            dayjs(parsed).fromNow(true)
        );
        setMostRecentOffer(mostRecentOffer);
    };

    //get only the offers whose property isReadByRecipient is false
    const getUnreadOffers = () => {
        const unreadOffers = [];
        offers.forEach(offer => {
            if (!offer.isReadByRecipient) {
                unreadOffers.push(offer);
            }
        });
        setUnreadOffersCount(unreadOffers.length);
    };

    //sort through offers and determine if any have a status of accepted
    const hasAcceptedOffer = () => {
        let hasAccepted = false;
        offers.forEach(offer => {
            if (offer.status == "accepted") {
            }
        });
        return hasAccepted;
    };

    const execute = () => {
        fetchOtherUser();
        fetchLinkedProduct();
        fetchOffers();

        setExecuteCount(executeCount + 1);
    };

    React.useEffect(() => {
        if (props.canFetch && executeCount == 0) {
            execute();
        }
    }, [loading, props.canFetch]);

    React.useEffect(() => {
        if (offers.length > 0) {
            getMostRecentOffer();
            getUnreadOffers();
        }
    }, [offers]);

    React.useEffect(() => {
        if (otherUser == null || linkedProduct == null || offers.length == 0) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [otherUser, linkedProduct, offers]);

    if (loading && !props.canFetch) {
        return <></>;
    }

    return (
        <TouchableOpacity
            onPress={() => {
                props.onPress();
                conversationStore.setActiveConvoOtherUser(otherUser);
            }}
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: 25,
            }}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <ProfileImage
                    specificUser={otherUser}
                    size={35}
                    border
                    borderColor={
                        props.data.dealReached ? theme.success : theme.accent
                    } //TODO: fix, not working properly
                />
                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: 16,
                    }}
                >
                    <CustomText
                        font={unreadOffersCount > 0 ? "Heavy" : "Bold"}
                        success={props.data.dealReached}
                        fontSize={18}
                        style={{ marginBottom: 2 }}
                    >
                        {otherUser?.displayName}{" "}
                        <CustomText secondary>•</CustomText> $
                        {mostRecentOffer?.amount}
                    </CustomText>
                    {/* <CustomText
                fontSize={14}
                font="Medium"
                style={{ marginBottom: 2 }}
            >
                Would you be willing to lower...
            </CustomText> */}
                    <CustomText secondary fontSize={16}>
                        {mostRecentOffer?.placedByUID == authStore.user.id
                            ? "you sent an offer for "
                            : "new offer for "}
                        <CustomText
                            secondary
                            fontSize={16}
                            style={{ fontStyle: "italic" }}
                        >
                            '{linkedProduct?.title}'
                        </CustomText>
                    </CustomText>
                </View>
            </View>
            <View
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                }}
            >
                <CustomText secondary>{mostRecentOfferTimeAgo}</CustomText>
                <View
                    style={{
                        paddingVertical: 2,
                        paddingHorizontal: 8,
                        backgroundColor:
                            props.data.dealReached == true &&
                            props.data.dealReached !== null
                                ? theme.success
                                : theme.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 12,
                        marginTop: 4,
                        opacity: unreadOffersCount == 0 ? 0 : 1,
                    }}
                >
                    <CustomText fontSize={12} font="Semibold">
                        {unreadOffersCount?.toString()}
                    </CustomText>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default observer(ConversationInstance);
