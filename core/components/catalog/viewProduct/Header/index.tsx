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
import { IUser } from "../../../../@types/GlobalTypes";
import { fetchUserFromDb } from "../../../../utils/user.utils";
import { observer } from "mobx-react";
import { useSellerViewProductStore } from "../../../../state/auth/SellerViewProductStore";
import ProductOptions from "../ProductOptions";
import * as Haptics from "expo-haptics";
import { hapticFeedback } from "../../../../utils/haptics.util";
import { useAuthStore } from "../../../../state/auth/Auth.store";
import ProfileImage from "../../../lib/ProfileImage";

const Header = () => {
    const catalogStore = useCatalogStore();
    const sellerViewProductStore = useSellerViewProductStore();
    const { user } = useAuthStore();

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
                    <ProductOptions />
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
                    5 orders total
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
