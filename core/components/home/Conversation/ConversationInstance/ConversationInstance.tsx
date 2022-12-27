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

    function toDateTime(secs) {
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(secs);
        return t;
    }

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

        // const dateObj = toDateTime(mostRecentOffer.timestamp.seconds);

        // console.log("tuki: ");
        // console.log(dateObj);

        // //@ts-ignore
        // setMostRecentOfferTimeAgo(timeSince(new Date(Date.now() - dateObj)));
        // Create formatter (English).
        const tAgo = new TimeAgo("en-US");
        console.log("recap: ");
        console.log(Date.now());
        console.log(mostRecentOffer.timestamp.seconds);
        const ms = mostRecentOffer.timestamp.seconds;
        const offerTimeAgo = tAgo.format(
            Date.now() - mostRecentOffer.timestamp.seconds * 1000,
            "mini-now"
        ); //TODO: Fix (erroneous reading provided)
        setMostRecentOfferTimeAgo(offerTimeAgo);
        console.log(offerTimeAgo);
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
            onPress={() => props.onPress()}
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
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
                    borderRadius={17.5} //TODO: Find a way to make this a string and just make this 50% without using styled-components/native
                    source={{
                        uri: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-suliman-sallehi-1704488.jpg&fm=jpg",
                    }}
                    style={{
                        height: 35,
                        width: 35,
                        borderColor: theme.accent,
                        borderWidth: 2,
                    }}
                />
                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: 16,
                    }}
                >
                    <CustomText
                        font="Bold"
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
                        {linkedProduct?.title}
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
                        backgroundColor: theme.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 12,
                        marginTop: 4,
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
