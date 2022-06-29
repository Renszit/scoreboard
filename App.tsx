import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Button from "./Button";
import StartScreen, { PlayerObject } from "./StartScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [playersEntered, setPlayersEntered] = useState(false);

  const [score, setScore] = useState(0);
  const [winner, setWinner] = useState("");
  const [showScorePopUp, setShowScorePopUp] = useState(false);
  const [players, setPlayers] = useState<PlayerObject[]>([]);

  const addScoreToPLayer = (player: string) => {
    const newPlayers = [...players];
    newPlayers.find((p) => p.name === player).score += parseInt(score);
    setPlayers(newPlayers);
    setScore(0);
    setShowScorePopUp(false);
  };

  const letTheGamesBegin = (players: String[]) => {
    if (players.length > 0) {
      setPlayers(players);
      setPlayersEntered(true);
    }
  };

  const checkForWinner = () => {
    for (let i = 0; i < players.length; i++) {
      if (players[i].score >= 1000) {
        setWinner(players[i].name);
      }
    }
  };

  useEffect(() => {
    checkForWinner();
  }, [players]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.personItem}>
        <Text>{item.name}</Text>
        <Text>Score: {item.score}</Text>
      </View>
    );
  };

  const ScorePopup = () => {
    return (
      <>
        <View style={styles.scorePopup}>
          <Text>Whose score is this?</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {players.map((player, index) => {
              return (
                <Button
                  onPress={() => {
                    addScoreToPLayer(player.name);
                  }}
                  text={player.name}
                  key={index}
                />
              );
            })}
          </View>
        </View>
      </>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        {!playersEntered && (
          <StartScreen
            letTheGamesBegin={(arr: String[]) => letTheGamesBegin(arr)}
          />
        )}
        {playersEntered && (
          <>
            <View style={styles.container}>
              <StatusBar style="auto" />
              <FlatList
                keyExtractor={(item, index) => item + index.toString()}
                data={players}
                renderItem={renderItem}
              />
            </View>

            <View style={{ flex: 1 }}>
              <TextInput
                onChangeText={(text) => setScore(text)}
                value={score.toString()}
                style={styles.textInputStyle}
              />
            </View>
            {showScorePopUp && <ScorePopup />}

            <View
              style={{
                flexDirection: "row",
                flex: 2,
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Button
                onPress={() => setShowScorePopUp(true)}
                text={"Submit score"}
              />
            </View>
            <Button
              onPress={() => {
                setPlayers([]);
                setPlayersEntered(false);
                setWinner("");
              }}
              color={"#ECA400"}
              text={"reset"}
            />
            {winner != "" && (
              <Text
                style={{
                  fontSize: 30,
                  width: "100%",
                  backgroundColor: "green",
                  alignItems: "center",
                  textAlign: "center",
                  padding: 10,
                  justifyContent: "center",
                }}
              >
                {winner} Won!
              </Text>
            )}
          </>
        )}
      </>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  numberStyle: {
    fontSize: 30,
  },
  textInputStyle: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    margin: 20,
    flex: 1,
    fontSize: 50,
    borderColor: "olive",
    borderWidth: 2,
    borderRadius: 20,
  },
  personItem: {
    margin: 20,
    flex: 1,
  },
  scorePopup: {
    paddingVertical: 20,
    flex: 1,
    flexWrap: "wrap",
    zIndex: 1,
    borderRadius: 20,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    left: Dimensions.get("window").width / 2 - 150,
    top: Dimensions.get("window").height / 2 - 150,
    backgroundColor: "#EAF8BF",
  },
});
