import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import DeleteIcon from "../../../icons/catalog/Delete";
import CustomText from "../CustomText";

interface IPriceInput {
    price: string;
    setPrice: React.Dispatch<React.SetStateAction<string>>;
}

const PriceInput = (props: IPriceInput) => {
    const NUM_PAD_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "del"];

    return (
        <>
            <CustomText font="Heavy" fontSize={56} style={{ marginBottom: 45 }}>
                ${props.price}
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
                            if (item === "del") {
                                props.setPrice(props.price.slice(0, -1));
                            } else if (item === ".") {
                                if (!props.price.includes(".")) {
                                    props.setPrice(props.price + ".");
                                }
                            } else if (item === 0) {
                                if (props.price !== "0") {
                                    props.setPrice(props.price + "0");
                                }
                            } else {
                                if (props.price === "0") {
                                    props.setPrice(item.toString());
                                } else {
                                    props.setPrice(
                                        props.price + item.toString()
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

export default PriceInput;
