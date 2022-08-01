import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import FlowTemplate from "../../lib/FlowTemplate";
import PopupHeader from "../../lib/PopupHeader";
import { observer } from "mobx-react";
import { useSignupStore } from "../../../state/auth/Signup.store";
import { CatalogStatus, SignupMethod } from "../../../@types/GlobalTypes";
import SignupOptionButton from "../../auth/SignupOptionbutton/SignupOptionButton";
import { Image, Platform, TouchableOpacity, View } from "react-native";
import { useCreateProductStore } from "../../../state/auth/CreateProduct.store";
import CustomTextInput from "../../lib/CustomTextInput";
import LargeButton from "../../lib/LargeButton";
import { useUtilStore } from "../../../state/Util.store";
import { useCatalogStore } from "../../../state/auth/Catalog.store";
import ScrollWrapper from "../../auth/ScrollWrapper/ScrollWrapper";
import * as ImagePicker from "expo-image-picker";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
    uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../../../config/firebase";
import CustomText from "../../lib/CustomText";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { useTheme } from "../../../utils/useTheme.util";
import UploadIcon from "../../../icons/catalog/Upload";

const ProductImage = () => {
    const theme = useTheme();
    const catalogStore = useCatalogStore();
    const createProductStore = useCreateProductStore();
    const utilStore = useUtilStore();

    // const pickImage = async () => {
    //     // No permissions request is necessary for launching the image library
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     console.log(result);

    //     if (!result.cancelled) {
    //         createProductStore.setProductId("hh");
    //         const storageRef = ref(
    //             storage,
    //             `/images/${createProductStore.productId}`
    //         );
    //         //@ts-ignore
    //         await uploadBytes(storageRef, result.uri);
    //     }
    // };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            const storage = getStorage();
            const storageRef = ref(
                storage,
                `productImages/${createProductStore.productId}/cover`
            );

            //@ts-ignore
            const img = await fetch(result.uri);
            const bytes = await img.blob();

            await uploadBytes(storageRef, bytes).then(() => {
                console.log("Uploaded a blob or file!");
                getDownloadURL(storageRef).then(url => {
                    createProductStore.setProductImageURL(url);
                });
            }); //upload images
        }
    };

    React.useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert(
                        "Sorry, we need camera roll permissions to make this work!"
                    );
                }
            }
        })();

        createProductStore.setProductId(uuid());
    }, []);

    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            <PopupHeader
                title="create listing"
                backArrow
                backArrowOnPress={() =>
                    createProductStore.setCurrentStep(
                        createProductStore.currentStep - 1
                    )
                }
                subtitle="my catalog"
                progressIndicator
                currentStep={4}
                totalSteps={7}
            />
            <ScrollWrapper>
                <FlowTemplate
                    circleEmoji="📸"
                    title="say cheese..."
                    desc={
                        "showcase your item with\n images. make sure they’re clear."
                    }
                    marginBottom={utilStore.isKeyboardOpen ? "200px" : null}
                >
                    <LargeButton title="Upload" onPress={() => pickImage()} />
                    {createProductStore.productImageURL !== "" ? (
                        <Image
                            style={{ height: 100, width: 100 }}
                            source={{ uri: createProductStore.productImageURL }}
                        />
                    ) : null}
                    <View
                        style={{
                            width: 300,
                            height: 200,
                            borderStyle: "dashed",
                            borderWidth: 1,
                            borderRadius: 12,
                            margin: 20,
                            borderColor: theme.secondary,
                        }}
                    >
                        {createProductStore.productImageURL !== "" ? (
                            <Image
                                style={{
                                    flex: 1,
                                    resizeMode: "cover",
                                    justifyContent: "center",
                                    borderRadius: 12,
                                }}
                                source={{
                                    uri: createProductStore.productImageURL,
                                }}
                            />
                        ) : (
                            <View
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <UploadIcon />
                                <CustomText secondary style={{ marginTop: 9 }}>
                                    upload an image
                                </CustomText>
                            </View>
                        )}
                    </View>
                    <CustomText>
                        {createProductStore.productImageURL}
                    </CustomText>
                    <LargeButton
                        title="continue"
                        onPress={() => {
                            if (createProductStore.condition !== null) {
                                createProductStore.setCurrentStep(
                                    createProductStore.currentStep + 1
                                );
                            }
                        }}
                        footer
                        // disabled={!allClear && !firstTime}
                        disabled={createProductStore.condition == null}
                        footerButtonTitle="cancel"
                        footerButtonOnPress={() =>
                            catalogStore.setStatus(CatalogStatus.ACTIVE_DASH)
                        }
                    />
                </FlowTemplate>
            </ScrollWrapper>
        </BottomSheetView>
    );
};

export default observer(ProductImage);
