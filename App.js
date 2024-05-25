import {
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from "react-native";

import React from "react";
import axios from "axios";
import CustomSelectList from "./components/selectList";


export default function App() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [number, setChangeNumber] = React.useState(1);

  async function fetchData() {
    await axios
      .get("https://open.er-api.com/v6/latest/USD")
      .then((response) => {
        let elements = [];
        let newArray = Object.keys(response.data.rates);
        for (let index = 0; index < newArray.length; index++) {
          elements[index] = { key: index + 1, value: newArray[index] };
        }
        setData(elements);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={number}
        onChangeText={(number) => {
          if (number === "") {
            setChangeNumber(1);
          } else {
            setChangeNumber(number);
          }
          console.log(number);
        }}
        style={styles.input}
        placeholder="Type here to translate!"
        keyboardType="numeric"
      />
      <CustomSelectList data={data} value={number} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181a23",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    padding: 10,
    width: Dimensions.get("window").width - 50,
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 5,
    color: "#fff",
  },
});
