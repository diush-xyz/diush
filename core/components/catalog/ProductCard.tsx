import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { truncate } from "../../utils/truncate.util";
import CustomText from "../lib/CustomText";
import { LinearGradient } from "expo-linear-gradient";

const ProductCard = () => {
    return (
        <>
            {/*@ts-ignore*/}
            <ImageBackground
                source={{ uri: "https://reactjs.org/logo-og.png" }}
                borderRadius={8}
                style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: 232,
                    width: 164,
                    borderRadius: 8,
                    //DO NOT REMOVE: this property is required for the borderRaduis to be visible. For reference, see: https://reactnative.dev/docs/view-style-props#borderradius
                    overflow: "hidden",
                    paddingTop: 10,
                    paddingHorizontal: 6,
                }}
            >
                {/* make a LinearGradient that overlays the entire background with the following properties: linear-gradient(180deg, #000000 -29.74%, rgba(26, 26, 26, 0.5) 50.32%, #000000 134.48%);*/}
                <LinearGradient
                    colors={["#000000", "rgba(26, 26, 26, 0.5)", "#000000"]}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 8,
                    }}
                />
                <View
                    style={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                    }}
                >
                    <View>
                        <CustomText primary fontSize={10} font="Heavy">
                            asking price
                        </CustomText>
                        <CustomText accent font="Black" fontSize={18}>
                            $90
                        </CustomText>
                    </View>
                    <View>
                        <CustomText primary fontSize={10} font="Heavy">
                            highest offer
                        </CustomText>
                        <CustomText
                            accent
                            font="Black"
                            fontSize={18}
                            textAlign="right"
                        >
                            $2
                        </CustomText>
                    </View>
                </View>
                <View
                    style={{
                        width: "100%",
                        marginBottom: 19,
                    }}
                >
                    <CustomText primary fontSize={18} font="Black">
                        Jordan Jersey
                    </CustomText>
                    <CustomText primary font="Bold">
                        {truncate("Jordan Jersey is a great product", 23)}
                    </CustomText>
                </View>
            </ImageBackground>
        </>
    );
};

export default ProductCard;
