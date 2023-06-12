import React from "react";
import CustomText from "../../../lib/CustomText";
import { View, TouchableOpacity } from "react-native";
import CarouselIcon from "../../../../icons/catalog/Carousel";
import ChevronRight from "../../../../icons/catalog/ChevronRight";
import RoundedMoreIcon from "../../../../icons/common/RoundedMore";
import ShareIcon from "../../../../icons/catalog/Share";
import TicketIcon from "../../../../icons/catalog/Ticket";
import { triggerProductSharePopup } from "../../../../utils/share.util";
import ActiveIndicator from "../ActiveIndicator";
import OfferButton from "../OfferButton";
import { BuyFlowStatus, IUser } from "../../../../@types/GlobalTypes";
import { fetchUserFromDb } from "../../../../utils/user.utils";
import { observer } from "mobx-react";
import { hapticFeedback } from "../../../../utils/haptics.util";
import { useAuthStore } from "../../../../state/auth/Auth.store";
import ProfileImage from "../../../lib/ProfileImage";
import CopyIcon from "../../../../icons/catalog/Copy";
import EditIcon from "../../../../icons/catalog/Edit";
import { copyToClipboard } from "../../../../utils/clipboard.util";
import { useUtilStore } from "../../../../state/Util.store";
import OptionsSelector, {
    IOptionsSelectorElement,
} from "../../../lib/OptionsSelector";
import { useScopeProductStore } from "../../../../state/buy/ScopeProduct.store";
import { useBuyProductStore } from "../../../../state/buy/BuyProduct.store";

const Header = () => {
    const buyProductStore = useBuyProductStore();
    const { user } = useAuthStore();
    const utilStore = useUtilStore();
    const scopeProductStore = useScopeProductStore();
    const [seller, setSeller] = React.useState<IUser>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    const fetchSellerUser = () => {
        fetchUserFromDb({
            id: scopeProductStore.fetchedActiveProduct.linkedUID,
            setUser: (fUser: IUser) => {
                setSeller(fUser);
                setLoading(false);
            },
        });
    };

    React.useEffect(() => {
        fetchSellerUser();
    }, []);

    const PRODUCT_OPTIONS_DATA: IOptionsSelectorElement[] = [
        {
            text: "Copy link",
            icon: <CopyIcon />,
            onClick: () => {
                copyToClipboard(`https://diush.xyz/hjdhj/hjdhj`);
                scopeProductStore.setProductOptionsPopup();
                utilStore.setMsgIndicator("Link copied!");
                setTimeout(() => {
                    utilStore.setMsgIndicator();
                }, 2500);
            },
        }, //TODO: Properly make this url link to something once the buyer flow is built out
        {
            text: "Edit listing",
            icon: <EditIcon />,
            onClick: () => {
                // catalogStore.setStatus(CatalogStatus.EDIT);
                scopeProductStore.setProductOptionsPopup();
            },
        },
        // {
        //     text: "Delete listing",
        //     icon: <TrashIcon />,
        //     onClick: () => scopeProductStore.setDeleteConfirmation(),
        // },
    ];

    return (
        <>
            {!loading && (
                <>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 14,
                        }}
                    >
                        <TouchableOpacity
                            style={{ display: "flex", flexDirection: "row" }}
                            onPress={() => {
                                scopeProductStore.setImageModal();
                                hapticFeedback();
                            }}
                        >
                            <CarouselIcon />
                            <CustomText
                                accent
                                font="Heavy"
                                fontSize={16}
                                style={{ marginLeft: 6 }}
                            >
                                view image
                            </CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ display: "flex", flexDirection: "row" }}
                            onPress={() => {
                                hapticFeedback();
                                triggerProductSharePopup("/hjfhj/hjdfhj");
                            }}
                        >
                            <ShareIcon />
                            <CustomText
                                accent
                                font="Heavy"
                                fontSize={16}
                                style={{ marginLeft: 6 }}
                            >
                                share
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <CustomText font="Heavy" fontSize={22}>
                            {scopeProductStore.fetchedActiveProduct.title}
                        </CustomText>
                        <TouchableOpacity
                            onPress={() => {
                                hapticFeedback();
                                scopeProductStore.setProductOptionsPopup();
                            }}
                        >
                            <RoundedMoreIcon />
                        </TouchableOpacity>
                        {scopeProductStore.productOptionsPopup && (
                            <OptionsSelector
                                visible={scopeProductStore.productOptionsPopup}
                                data={PRODUCT_OPTIONS_DATA}
                            />
                        )}
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: 10,
                            alignItems: "center",
                        }}
                    >
                        <ProfileImage specificUser={seller} size={20} />
                        <CustomText
                            fontSize={16}
                            style={{ marginLeft: 6 }}
                            font="Bold"
                        >
                            <CustomText font="Bold" style={{ opacity: 0.5 }}>
                                listed by
                            </CustomText>{" "}
                            {seller?.id === user.id
                                ? "me"
                                : seller?.displayName}
                        </CustomText>
                        <ChevronRight style={{ marginLeft: 7 }} />
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: 10,
                            alignItems: "center",
                        }}
                    >
                        <TicketIcon />
                        <CustomText
                            accent
                            font="Bold"
                            style={{ marginLeft: 2 }}
                        >
                            5 orders total
                        </CustomText>
                        <ActiveIndicator />
                        {/*TODO: Add shadow!!*/}
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <OfferButton
                            title="place offer"
                            onPress={() =>
                                buyProductStore.setStatus(
                                    BuyFlowStatus.PLACE_OFFER
                                )
                            }
                        />
                    </View>
                </>
            )}
        </>
    );
};

export default observer(Header);
