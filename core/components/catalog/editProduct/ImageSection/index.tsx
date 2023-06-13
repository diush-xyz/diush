import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import CustomText from "../../../lib/CustomText";
import { useCatalogStore } from "../../../../state/auth/Catalog.store";
import { useTheme } from "../../../../utils/useTheme.util";
import * as ImagePicker from "expo-image-picker";
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
} from "firebase/storage";
import { observer } from "mobx-react";

interface IImageSection {
    imageURL: string;
    setImageURL: React.Dispatch<React.SetStateAction<string>>;
}

const ImageSection = (props: IImageSection) => {
    const theme = useTheme();
    const catalogStore = useCatalogStore();

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
                props.imageURL !== "" ||
                props.imageURL !== undefined ||
                props.imageURL !== null
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
            const img = await fetch(result.assets[0].uri);
            const bytes = await img.blob();

            await uploadBytes(storageRef, bytes).then(() => {
                getDownloadURL(storageRef).then(url => {
                    props.setImageURL(url);
                });
            }); //upload images
        }
    };

    return (
        <View
            style={{ display: "flex", flexDirection: "column", marginTop: 16 }}
        >
            <CustomText fontSize={18} font="Bold" style={{ marginBottom: 12 }}>
                image
            </CustomText>
            <TouchableOpacity
                onPress={() => pickImage()}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom:
                        catalogStore.activeProduct.imageURL == "" ? 40 : null,
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
                            uri: props.imageURL,
                        }}
                    />
                </View>
            </TouchableOpacity>
            <CustomText secondary style={{ marginTop: 12 }} textAlign="center">
                tap to replace
            </CustomText>
        </View>
    );
};

export default observer(ImageSection);
