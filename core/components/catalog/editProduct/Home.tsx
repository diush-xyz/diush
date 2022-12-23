import { TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import { CatalogStatus } from "../../../@types/GlobalTypes";
import { useUtilStore } from "../../../state/Util.store";
import { useCatalogStore } from "../../../state/auth/Catalog.store";
import ScreenHeader from "../../lib/ScreenHeader";
import Switcher from "../Dashboard/Switcher";
import HorizontalLine from "../../lib/HorizontalLine";
import { MAX_WIDTH } from "../../../utils/constants";
import CustomText from "../../lib/CustomText";
import { useTheme } from "../../../utils/useTheme.util";
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

const EditProductHome = () => {
    const catalogStore = useCatalogStore();
    const utilStore = useUtilStore();
    const theme = useTheme();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const storage = getStorage();
            const storageRef = ref(
                storage,
                `productImages/${catalogStore.activeProduct.id}/cover`
            );

            //delete the file in the db before uploading a new one
            if (
                catalogStore.activeProduct.imageURL !== "" ||
                catalogStore.activeProduct.imageURL !== undefined ||
                catalogStore.activeProduct.imageURL !== null
            ) {
                // Delete the file
                deleteObject(storageRef)
                    .then(() => {
                        console.log("File deleted!");
                    })
                    .catch(error => {
                        console.log("Somehing went wrong.");
                    });
            }

            //@ts-ignore
            const img = await fetch(result.uri);
            const bytes = await img.blob();

            await uploadBytes(storageRef, bytes).then(() => {
                console.log("Uploaded a blob or file!");
                getDownloadURL(storageRef).then(url => {
                    catalogStore.setActiveProductImage(url);
                });
            }); //upload images
        }
    };

    return (
        <View
            style={{
                alignItems: "center",
                flex: 1,
                marginTop: 55,
                width: "100%",
            }}
        >
            <ScreenHeader
                backArrow
                backArrowOnPress={() =>
                    catalogStore.setStatus(CatalogStatus.VIEW)
                }
                title="edit listing"
                subtitle="my catalog"
                button
                buttonText="save"
                onButtonPress={() => null}
                buttonDisabled={false}
            />
            <View
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: MAX_WIDTH,
                }}
            >
                <HorizontalLine />
                <View style={{ display: "flex", flexDirection: "column" }}>
                    <CustomText fontSize={18}>image</CustomText>
                    <TouchableOpacity
                        onPress={() => pickImage()}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom:
                                catalogStore.activeProduct.imageURL == ""
                                    ? 40
                                    : null,
                        }}
                    >
                        <View
                            style={{
                                justifyContent:
                                    catalogStore.activeProduct.imageURL == ""
                                        ? "center"
                                        : null,
                                width: 300,
                                height: 200,
                                borderStyle: "dashed",
                                borderWidth: 1,
                                borderRadius: 12,
                                borderColor: theme.secondary,
                            }}
                        >
                            <Image
                                style={{
                                    flex: 1,
                                    resizeMode: "cover",
                                    justifyContent: "center",
                                    borderRadius: 12,
                                }}
                                source={{
                                    uri: catalogStore.activeProduct.imageURL,
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default observer(EditProductHome);
