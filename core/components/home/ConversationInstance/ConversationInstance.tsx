import React from "react";
import { View, Image } from "react-native";
import { MAX_WIDTH } from "../../../utils/constants";
import CustomText from "../../lib/CustomText";
import { useTheme } from "../../../utils/useTheme.util";
import { IConversation, IProduct, IUser } from "../../../@types/GlobalTypes";
import { useAuthStore } from "../../../state/auth/Auth.store";
import { observer } from "mobx-react";
import { fetchUserFromDb } from "../../../utils/user.utils";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../../config/firebase";

export enum CONVERSATION {
    INCOMING,
    TO_OTHERS,
}

interface IConversationInstance {
    type: CONVERSATION;
    data: IConversation;
}

const ConversationInstance = (props: IConversationInstance) => {
    const theme = useTheme();
    const authStore = useAuthStore();
    const [otherUser, setOtherUser] = React.useState<IUser>(null);
    const [linkedProduct, setLinkedProduct] = React.useState(null);

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

    React.useEffect(() => {
        fetchOtherUser();
        fetchLinkedProduct();
    }, []);

    return (
        <View
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
                        <CustomText secondary>•</CustomText> $95
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
                <CustomText secondary>3:56pm</CustomText>
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
                        3
                    </CustomText>
                </View>
            </View>
        </View>
    );
};

export default observer(ConversationInstance);
