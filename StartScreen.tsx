import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "./Button";
import { colors } from "./styles";
import PlayerItem from "./playerItem";

export type PlayerObject = {
  name: string;
  score: number;
};

const StartScreen = (props) => {
  const { letTheGamesBegin } = props;
  const [names, setNames] = useState<PlayerObject[]>([]);

  const renderItem = ({ item }) => {
    return <PlayerItem player={item} />;
  };

  const renderHeader = () => {
    const [name, setName] = useState("");
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Who are playing today?</Text>
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
        <View style={styles.buttonContainer}>
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
      </View>
    );
  };

  return (
    <FlatList
      data={names}
      keyExtractor={({ name }) => name}
      renderItem={renderItem}
      ListFooterComponent={renderHeader}
    />
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Background,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    marginTop: 40,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  textInputStyle: {
    color: colors.Quaternary,
    width: 300,
    height: 40,
    borderRadius: 5,
    textAlign: "center",
    margin: 20,
    borderColor: colors.Secondary,
    borderWidth: 1,
  },
  title: {
    color: colors.Quaternary,
    fontSize: 15,
  },
});
