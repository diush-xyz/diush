import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import FlowTemplate from "../../lib/FlowTemplate";
import PopupHeader from "../../lib/PopupHeader";
import { observer } from "mobx-react";
import { useSignupStore } from "../../../state/auth/Signup.store";
import {
    CatalogStatus,
    IUser,
    SignupMethod,
} from "../../../@types/GlobalTypes";
import SignupOptionButton from "../../auth/SignupOptionbutton/SignupOptionButton";
import { Button, Share, TouchableOpacity, View } from "react-native";
import { useCreateProductStore } from "../../../state/auth/CreateProduct.store";
import CustomTextInput from "../../lib/CustomTextInput";
import LargeButton from "../../lib/LargeButton";
import { useUtilStore } from "../../../state/Util.store";
import { useCatalogStore } from "../../../state/auth/Catalog.store";
import ScrollWrapper from "../../auth/ScrollWrapper/ScrollWrapper";
import CustomText from "../../lib/CustomText";
import { Image } from "react-native";
import ImageOverlay from "./ImageOverlay";
import CarouselIcon from "../../../icons/catalog/Carousel";
import ShareIcon from "../../../icons/catalog/Share";
import { useAuthStore } from "../../../state/auth/Auth.store";
import { fetchUserFromDb } from "../../../utils/user.utils";
import { auth } from "../../../../config/firebase";
import ChevronRight from "../../../icons/catalog/ChevronRight";
import TicketIcon from "../../../icons/catalog/Ticket";
import { useTheme } from "../../../utils/useTheme.util";
import OfferButton from "./OfferButton";
import RoundedMoreIcon from "../../../icons/common/RoundedMore";
import ActiveIndicator from "./ActiveIndicator";
import SnapshotBox from "./SnapshotBox";
import ProductViewScrollWrapper from "./ProductViewScrollWrapper";
import HorizontalLine from "../../lib/HorizontalLine";
import { deriveProductConditionFromDb } from "../../../utils/productCondition.util";
import WrittenInfoSection from "./WrittenInfoSection";
import { triggerProductSharePopup } from "../../../utils/share.util";
import Header from "./Header";
import ImageModal from "./ImageModal";
import { useSellerViewProductStore } from "../../../state/auth/SellerViewProductStore";
import DeleteConfirmation from "../../lib/Modals/WarningConfirmation";
import CustomDeleteConfirmation from "./CustomDeleteConfirmation";
import styled from "styled-components/native";
import { MAX_WIDTH } from "../../../utils/constants";
import CopiedIndicator from "../../lib/MsgIndicator";
import dayjs from "dayjs";

const ViewProduct = () => {
    const catalogStore = useCatalogStore();
    const sellerViewProductStore = useSellerViewProductStore();

    const [timeAgo, setTimeAgo] = React.useState<string>("");

    React.useEffect(() => {
        // @ts-ignore
        const parsed = dayjs.unix(catalogStore.activeProduct.createdAt.seconds);
        //@ts-ignore
        const offerTimestamp = dayjs(parsed).fromNow(true);
        setTimeAgo(offerTimestamp);
    });

    return (
        <BottomSheetView style={GLOBAL_STYLES.viewProductSheetViewStyle}>
            <ProductViewScrollWrapper>
                <TouchableOpacity
                    style={{
                        flex: 1,
                    }}
                    activeOpacity={1}
                    onPress={() => {
                        if (sellerViewProductStore.productOptionsPopup) {
                            sellerViewProductStore.setProductOptionsPopup();
                        } else {
                            null;
                        }
                    }}
                >
                    <Image
                        style={{
                            height: 471,
                            width: "100%",
                            resizeMode: "cover",
                        }}
                        source={{
                            uri: catalogStore.activeProduct.imageURL,
                        }}
                    />
                    <ImageOverlay style={{ position: "absolute", top: 0 }} />
                    <View style={{ marginTop: -185, paddingHorizontal: 22 }}>
                        {sellerViewProductStore.imageModal && <ImageModal />}
                        {sellerViewProductStore.deleteConfirmation && (
                            <CustomDeleteConfirmation />
                        )}
                        <Header />
                        <SnapshotBox
                            askingPrice={catalogStore.activeProduct.askingPrice}
                            highestOffer={
                                sellerViewProductStore.highestOfferAmount ??
                                null
                            } //TODO: Backend integration
                            posted={timeAgo} //TODO: Backend integration
                        />
                        <WrittenInfoSection />
                        <View style={{ marginBottom: 60 }} />
                    </View>
                </TouchableOpacity>
            </ProductViewScrollWrapper>
        </BottomSheetView>
    );
};

export default observer(ViewProduct);
