import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const VICTORY = "Victory!";
const DEFEAT = "Defeat!";
const TIE = "Tie.";

const CHOICES = [
  {
    name: ROCK,
    uri: require("./assets/stone.png"),
  },
  {
    name: PAPER,
    uri: require("./assets/paper.png"),
  },
  {
    name: SCISSORS,
    uri: require("./assets/scissors.png"),
  },
];
class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => this.props.onPress(this.props.name)}
      >
        <Text style={styles.buttonText}>
          {this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}
        </Text>
      </TouchableOpacity>
    );
  }
}
class TotalGame extends React.Component {
  render() {
    return (
      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text>Win rounds: {this.props.wins} </Text>
            <Text>Win rate: {this.props.winRate}</Text>
          </View>
          <View style={{ marginHorizontal: 5 }}></View>
          <View>
            <Text>Lose rounds: {this.props.loses} </Text>
            <Text>Lose rate: {this.props.loseRate}</Text>
            <View style={{ marginTop: 2 }}></View>
            <Text style={{ fontWeight: "bold" }}>
              Total rounds: {this.props.total}
            </Text>
          </View>
          <View style={{ marginHorizontal: 5 }}></View>
          <View>
            <Text>Tie rounds: {this.props.ties}</Text>
            <Text>Tie rate: {this.props.tieRate}</Text>
          </View>
        </View>
        <Text></Text>
      </View>
    );
  }
}
const ChoiceCard = ({ player, choice: { uri, name } }) => {
  const title = name && name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <View style={styles.choiceContainer}>
      <Text style={styles.choiceDescription}>{player}</Text>
      <Image source={uri} resizeMode="contain" style={styles.choiceImage} />
      <Text style={styles.choiceCardTitle}>{title}</Text>
    </View>
  );
};
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gamePrompt: "Choose your choice!",
      userChoice: {},
      computerChoice: {},
      totalRounds: 0,
      winRounds: 0,
      loseRounds: 0,
      tieRounds: 0,
      winRate: "0%",
      loseRate: "0%",
      tieRate: "0%",
    };
  }
  onPress = (playerChoice) => {
    const [result, computerChoice] = this.getRoundResult(playerChoice);
    const newUserChoice = CHOICES.find(
      (choice) => choice.name === playerChoice
    );
    const newComputerChoice = CHOICES.find(
      (choice) => choice.name === computerChoice
    );
    this.setState((prevState) => {
      return {
        gamePrompt: result,
        userChoice: newUserChoice,
        computerChoice: newComputerChoice,
        totalRounds: prevState.totalRounds + 1,
        winRounds:
          result === VICTORY ? prevState.winRounds + 1 : prevState.winRounds,
        loseRounds:
          result === DEFEAT ? prevState.loseRounds + 1 : prevState.loseRounds,
        tieRounds:
          result === TIE ? prevState.tieRounds + 1 : prevState.tieRounds,
        winRate:
          result === VICTORY
            ? (
                ((prevState.winRounds + 1) / (prevState.totalRounds + 1)) *
                100
              ).toFixed(2) + "%"
            : (
                (prevState.winRounds / (prevState.totalRounds + 1)) *
                100
              ).toFixed(2) + "%",
        loseRate:
          result === DEFEAT
            ? (
                ((prevState.loseRounds + 1) / (prevState.totalRounds + 1)) *
                100
              ).toFixed(2) + "%"
            : (
                (prevState.loseRounds / (prevState.totalRounds + 1)) *
                100
              ).toFixed(2) + "%",
        tieRate:
          result === TIE
            ? (
                ((prevState.tieRounds + 1) / (prevState.totalRounds + 1)) *
                100
              ).toFixed(2) + "%"
            : (
                (prevState.tieRounds / (prevState.totalRounds + 1)) *
                100
              ).toFixed(2) + "%",
      };
    });
  };

  randomComputerChoice = () =>
    CHOICES[Math.floor(Math.random() * CHOICES.length)];

  getRoundResult = (userChoice) => {
    const computerChoice = this.randomComputerChoice().name;
    let result;
    switch (userChoice) {
      case ROCK:
        result = computerChoice === SCISSORS ? VICTORY : DEFEAT;
        break;
      case PAPER:
        result = computerChoice === ROCK ? VICTORY : DEFEAT;
        break;
      case SCISSORS:
        result = computerChoice === PAPER ? VICTORY : DEFEAT;
        break;
    }
    if (userChoice === computerChoice) result = TIE;
    return [result, computerChoice];
  };

  getResultColor = () => {
    if (this.state.gamePrompt === VICTORY) return "green";
    if (this.state.gamePrompt === DEFEAT) return "red";
    if (this.state.gamePrompt === TIE) return "grey";
    return "black";
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 35, color: this.getResultColor() }}>
            {this.state.gamePrompt}
          </Text>
          <TotalGame
            total={this.state.totalRounds}
            wins={this.state.winRounds}
            loses={this.state.loseRounds}
            ties={this.state.tieRounds}
            winRate={this.state.winRate}
            loseRate={this.state.loseRate}
            tieRate={this.state.tieRate}
          />
        </View>
        <View style={styles.choicesContainer}>
          <ChoiceCard player="Player" choice={this.state.userChoice} />
          <Text style={styles.vsText}>vs</Text>
          <ChoiceCard player="Computer" choice={this.state.computerChoice} />
        </View>
        {CHOICES.map((choice) => {
          return (
            <Button
              key={choice.name}
              name={choice.name}
              onPress={this.onPress}
            />
          );
        })}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e9ebee",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    width: 200,
    margin: 10,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#640D14",
  },
  buttonText: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  vsText: { color: "#250902" },
  choicesContainer: {
    margin: 10,
    borderWidth: 2,
    paddingTop: 100,
    shadowRadius: 5,
    paddingBottom: 100,
    paddingHorizontal: 10,
    width: 400,
    height: 350,
    borderColor: "grey",
    shadowOpacity: 0.9,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-around",
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: { height: 5, width: 5 },
  },
  choiceContainer: {
    flex: 1,
    alignItems: "center",
  },
  choiceDescription: {
    fontSize: 20,
    color: "#250902",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  choiceCardTitle: {
    fontSize: 30,
    color: "#250902",
  },
  choiceImage: {
    width: 150,
    height: 150,
    padding: 10,
  },
});
