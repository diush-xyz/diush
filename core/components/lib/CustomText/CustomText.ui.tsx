import { View, Text } from 'react-native';
import React from 'react';
import { useTheme } from '../../../utils/useTheme.util';

interface ICustomText {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  accent?: boolean;
  customColor?: string;
  fontSize?: number;
}

/**
 * Diush's very own custom, all-in-one text component.
 * @param props Basic information for the text component to function; reference the ICustomText interface
 *
 * @example ```ts
 * <CustomText primary>this is a snippet of text</CustomText>
 * ```
 */
const CustomText = (props: ICustomText) => {
  const theme = useTheme();

  const populateColorStyle = (): string | undefined => {
    //TODO: fix this logic later, very inefficient, just for testing
    if (props.primary) {
      return theme.primaryText;
    } else if (props.secondary) {
      return theme.secondary;
    } else if (props.accent) {
      return theme.accent;
    } else if (props.customColor) {
      return props.customColor;
    }

    // if not argument is provided:
    return theme.primaryText;
  };

  return (
    <View>
      <Text
        style={{
          color: populateColorStyle(),
          fontSize: props.fontSize ?? 16,
        }}
      >
        {props.children}
      </Text>
    </View>
  );
};

export default CustomText;
