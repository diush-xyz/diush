import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { setPersistence } from "firebase/auth";
import { observer } from "mobx-react";
import CustomText from "../../../lib/CustomText/CustomText.ui";
import { usePlaceOfferStore } from "../../../../state/buy/PlaceOffer.store";
import { useScopeProductStore } from "../../../../state/buy/ScopeProduct.store";
import DeleteIcon from "../../../../icons/catalog/Delete";
import PriceInput from "../../../lib/PriceInput";

const OfferInput = () => {
    const NUM_PAD_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "del"];
    const [tapCount, setTapCount] = React.useState<number>(0);
    const placeOfferStore = usePlaceOfferStore();
    const scopeProductStore = useScopeProductStore();
    const [price, setPrice] = React.useState<string>(
        scopeProductStore.fetchedActiveProduct.askingPrice.toString()
    );

    React.useEffect(() => {
        const parsedPrice = Number(price);
        if (parsedPrice > 0) {
            placeOfferStore.setOfferAmount(parsedPrice);
        }
    }, [price]);

    return (
        <>
            <CustomText font="Heavy" fontSize={56} style={{ marginBottom: 45 }}>
                ${price}
            </CustomText>
            <FlatList
                data={NUM_PAD_DATA}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    marginBottom: 15,
                }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => {
                            //append the value of item to price
                            //if item is del, remove the last character of price
                            //if item is ., add a . if there is not already one
                            //if item is 0, add a 0 if there is not already one
                            //if item is 1-9, add the number
                            setTapCount(tapCount + 1);
                            if (item === "del") {
                                setPrice(price.slice(0, -1));
                            } else if (item === ".") {
                                if (!price.includes(".")) {
                                    setPrice(price + ".");
                                }
                            } else if (item === 0) {
                                if (price !== "0") {
                                    setPrice(price + "0");
                                }
                            } else {
                                if (price === "0") {
                                    setPrice(item.toString());
                                } else {
                                    setPrice(
                                        tapCount == 0
                                            ? item.toString()
                                            : price + item.toString()
                                    );
                                }
                            }
                        }}
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: 40,
                            width: 40,
                        }}
                    >
                        {item === "del" ? (
                            <DeleteIcon onPress={() => null} />
                        ) : (
                            <CustomText
                                secondary
                                fontSize={22}
                                textAlign="center"
                            >
                                {item}
                            </CustomText>
                        )}
                    </TouchableOpacity>
                )}
                style={{ width: "100%", maxWidth: 247 }}
            />
        </>
    );
};

export default observer(OfferInput);
