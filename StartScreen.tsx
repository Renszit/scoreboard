import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "./Button";

export type PlayerObject = {
  name: string;
  score: number;
};

const StartScreen = (props) => {
  const { letTheGamesBegin } = props;
  const [names, setNames] = useState<PlayerObject[]>([]);
  const [name, setName] = useState("");
  const storeNames = async (value: string) => {
    try {
      await AsyncStorage.setItem("@player_names", value);
    } catch (e) {
      // saving error (show toast)
    }
  };
  return (
    <View style={styles.container}>
      <Text>Hi! Welcome to the scoreboard</Text>
      <Text>Who are playing today?</Text>
      <TextInput
        autoComplete="off"
        autoCapitalize="none"
        onSubmitEditing={() => {
          setNames([...names, { name: name.toLowerCase(), score: 0 }]);
          setName("");
        }}
        onChangeText={(text) => setName(text)}
        style={styles.textInputStyle}
        value={name}
      />
      {names.map((name, index) => (
        <Text key={name + index.toString()}>{name.name}</Text>
      ))}
      <Button
        onPress={() => {
          if (name != "") {
            setNames([...names, { name: name.toLowerCase(), score: 0 }]);
            setName("");
          }
        }}
        text={"Submit"}
      />
      <Button onPress={() => setNames([])} text={"Clear"} />
      <Button onPress={() => letTheGamesBegin(names)} text={"Play"} />
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  textInputStyle: {
    width: 300,
    height: 40,
    borderRadius: 5,
    margin: 20,
    borderColor: "black",
    borderWidth: 1,
  },
  title: {
    fontSize: 15,
    margin: 20,
  },
});
