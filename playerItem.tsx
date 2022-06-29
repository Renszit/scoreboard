import { View, Text } from "react-native";
import React from "react";
import { PlayerObject } from "./StartScreen";
import { colors } from "./styles";

type Props = {
  player: PlayerObject;
};

export default function PlayerItem(props: Props) {
  const { player } = props;
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: colors.Quaternary,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        margin: 10,
      }}
    >
      <Text>{player.name}</Text>
      <Text>{player.score}</Text>
    </View>
  );
}
