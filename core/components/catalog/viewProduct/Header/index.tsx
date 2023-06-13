import React from "react";
import CustomText from "../../../lib/CustomText";
import { View, TouchableOpacity, Image } from "react-native";
import CarouselIcon from "../../../../icons/catalog/Carousel";
import ChevronRight from "../../../../icons/catalog/ChevronRight";
import RoundedMoreIcon from "../../../../icons/common/RoundedMore";
import ShareIcon from "../../../../icons/catalog/Share";
import TicketIcon from "../../../../icons/catalog/Ticket";
import { triggerProductSharePopup } from "../../../../utils/share.util";
import ActiveIndicator from "../ActiveIndicator";
import OfferButton from "../OfferButton";
import { useCatalogStore } from "../../../../state/auth/Catalog.store";
import { auth } from "../../../../../config/firebase";
import { CatalogStatus, IUser } from "../../../../@types/GlobalTypes";
import { fetchUserFromDb } from "../../../../utils/user.utils";
import { observer } from "mobx-react";
import { useSellerViewProductStore } from "../../../../state/auth/SellerViewProductStore";
import * as Haptics from "expo-haptics";
import { hapticFeedback } from "../../../../utils/haptics.util";
import { useAuthStore } from "../../../../state/auth/Auth.store";
import ProfileImage from "../../../lib/ProfileImage";
import CopyIcon from "../../../../icons/catalog/Copy";
import EditIcon from "../../../../icons/catalog/Edit";
import TrashIcon from "../../../../icons/catalog/Trash";
import { copyToClipboard } from "../../../../utils/clipboard.util";
import { useUtilStore } from "../../../../state/Util.store";
import OptionsSelector, {
    IOptionsSelectorElement,
} from "../../../lib/OptionsSelector";

const Header = () => {
    const catalogStore = useCatalogStore();
    const sellerViewProductStore = useSellerViewProductStore();
    const { user } = useAuthStore();
    const utilStore = useUtilStore();

    const PRODUCT_OPTIONS_DATA: IOptionsSelectorElement[] = [
        {
            text: "Copy link",
            icon: <CopyIcon />,
            onClick: () => {
                copyToClipboard(`https://diush.xyz/hjdhj/hjdhj`);
                sellerViewProductStore.setProductOptionsPopup();
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
                catalogStore.setStatus(CatalogStatus.EDIT);
                sellerViewProductStore.setProductOptionsPopup();
            },
        },
        {
            text: "Delete listing",
            icon: <TrashIcon />,
            onClick: () => sellerViewProductStore.setDeleteConfirmation(),
        },
    ];

    return (
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
                        sellerViewProductStore.setImageModal();
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
                    {catalogStore.activeProduct.title}
                </CustomText>
                <TouchableOpacity
                    onPress={() => {
                        hapticFeedback();
                        sellerViewProductStore.setProductOptionsPopup();
                    }}
                >
                    <RoundedMoreIcon />
                </TouchableOpacity>
                {sellerViewProductStore.productOptionsPopup && (
                    <OptionsSelector
                        visible={sellerViewProductStore.productOptionsPopup}
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
                <ProfileImage specificUser={user} size={20} />
                <CustomText fontSize={16} style={{ marginLeft: 6 }} font="Bold">
                    <CustomText font="Bold" style={{ opacity: 0.5 }}>
                        listed by
                    </CustomText>{" "}
                    me
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
                <CustomText accent font="Bold" style={{ marginLeft: 2 }}>
                    5 offers total
                </CustomText>
                <ActiveIndicator />
                {/*TODO: Add shadow!!*/}
            </View>
            <View style={{ marginTop: 20 }}>
                <OfferButton title="view offers" onPress={() => null} />
            </View>
        </>
    );
};

export default observer(Header);
