import React from "react";
import { Text as RNText, TextProps, TextStyle } from "react-native";
import Colors from "@/constants/Colors"

export default function Text({ style, ...props }: TextProps) {
  let fontFamily = "DMSans-Regular";

  const flattened = Array.isArray(style) ? Object.assign({}, ...style) : style;
  const fontWeight = (flattened as TextStyle)?.fontWeight;

  if (fontWeight === "500" || fontWeight === "medium") {
    fontFamily = "DMSans-Medium";
  } else if (
    fontWeight === "600" ||
    fontWeight === "700" ||
    fontWeight === "bold"
  ) {
    fontFamily = "DMSans-Bold";
  }

  return <RNText {...props} style={[{ fontFamily, color: Colors.font }, style]} />;
}