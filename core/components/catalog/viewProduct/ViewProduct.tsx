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
import RoundedMoreIcon from "../../../icons/catalog/RoundedMore";
import ActiveIndicator from "./ActiveIndicator";
import SnapshotBox from "./SnapshotBox";
import ProductViewScrollWrapper from "./ProductViewScrollWrapper";
import HorizontalLine from "./HorizontalLine";
import { deriveProductConditionFromDb } from "../../../utils/productCondition.util";
import WrittenInfoSection from "./WrittenInfoSection";
import { triggerProductSharePopup } from "../../../utils/share.util";
import Header from "./Header";
import ImageModal from "./ImageModal";
import { useSellerViewProductStore } from "../../../state/auth/SellerViewProductStore";
import DeleteConfirmation from "../../lib/Modals/DeleteConfirmation";
import CustomDeleteConfirmation from "./CustomDeleteConfirmation";
import styled from "styled-components/native";
import { MAX_WIDTH } from "../../../utils/constants";
import CopiedIndicator from "../../lib/CopiedIndicator";

const ViewProduct = () => {
    const catalogStore = useCatalogStore();
    const createProductStore = useCreateProductStore();
    const utilStore = useUtilStore();
    const authStore = useAuthStore();
    const sellerViewProductStore = useSellerViewProductStore();
    const [firstTime, setFirstTime] = React.useState<boolean>(true);
    const [allClear, setAllClear] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState<string>("");
    const [fetchedUser, setFetchedUser] = React.useState<IUser>();
    const theme = useTheme();

    React.useEffect(() => {
        //TODO: Come back later (two-letter domain extensions do not work, neither does .ed.cr,)
        // setIsReady(validateEmail(signupStore.email));
        fetchUserFromDb({
            id: auth.currentUser?.uid,
            setUser: (user: IUser) => {
                setFetchedUser(user);
            },
        });
    }, []);

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
                            highestOffer={90} //TODO: Backend integration
                            posted="14h" //TODO: Backend integration
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
