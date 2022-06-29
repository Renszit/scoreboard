import {
  View,
  Text,
  Pressable,
  StyleSheet,
  PressableProps,
} from "react-native";
import React from "react";
import { colors } from "./styles";

type Props = PressableProps & {
  text: string | String;
  color?: string | String;
};

const Button = (props: Props) => {
  const { text, color } = props;
  return (
    <Pressable
      {...props}
      style={[
        styles.button,
        { backgroundColor: color ? color : colors.Secondary },
      ]}
    >
      <Text style={styles.textStyle}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 40,
    borderRadius: 4,

    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  textStyle: {
    fontWeight: "bold",
    color: colors.Background,
  },
});

export default Button;
