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

const ViewProduct = () => {
    const catalogStore = useCatalogStore();
    const createProductStore = useCreateProductStore();
    const utilStore = useUtilStore();
    const [firstTime, setFirstTime] = React.useState<boolean>(true);
    const [allClear, setAllClear] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState<string>("");
    const authStore = useAuthStore();
    const [fetchedUser, setFetchedUser] = React.useState<IUser>();

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
                            view carousel
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
                <CustomText font="Heavy" fontSize={22}>
                    {catalogStore.activeProduct.title}
                </CustomText>
                <Image
                    source={{ uri: fetchedUser?.photoURL }}
                    style={{ height: 20, width: 20 }}
                />
            </View>
        </BottomSheetView>
    );
};

export default observer(ViewProduct);
