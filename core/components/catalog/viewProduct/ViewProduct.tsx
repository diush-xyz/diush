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
import { View } from "react-native";
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

const ViewProduct = () => {
    const catalogStore = useCatalogStore();
    const createProductStore = useCreateProductStore();
    const utilStore = useUtilStore();
    const [firstTime, setFirstTime] = React.useState<boolean>(true);
    const [allClear, setAllClear] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState<string>("");
    const authStore = useAuthStore();
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
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 14,
                        }}
                    >
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <CarouselIcon />
                            <CustomText
                                accent
                                font="Heavy"
                                fontSize={16}
                                style={{ marginLeft: 6 }}
                            >
                                view image
                            </CustomText>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <ShareIcon />
                            <CustomText
                                accent
                                font="Heavy"
                                fontSize={16}
                                style={{ marginLeft: 6 }}
                            >
                                share
                            </CustomText>
                        </View>
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
                        <RoundedMoreIcon />
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: 10,
                            alignItems: "center",
                        }}
                    >
                        <Image
                            borderRadius={10}
                            source={{
                                uri:
                                    fetchedUser?.photoURL ??
                                    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80",
                            }}
                            style={{
                                height: 20,
                                width: 20,
                            }}
                        />
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
                        <OfferButton title="view offers" onPress={() => null} />
                    </View>
                    <SnapshotBox
                        askingPrice={catalogStore.activeProduct.askingPrice}
                        highestOffer={90} //TODO: Backend integration
                        posted="14h" //TODO: Backend integration
                    />
                    <WrittenInfoSection />
                </View>
            </ProductViewScrollWrapper>
        </BottomSheetView>
    );
};

export default observer(ViewProduct);
