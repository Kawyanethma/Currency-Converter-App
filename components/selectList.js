import React from "react";
import axios from "axios";
import { SelectList } from "react-native-dropdown-select-list";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCaretDown,
  faMagnifyingGlass,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const CustomSelectList = ({ data, value }) => {
  const [selected, setSelected] = React.useState("");
  const [basedCurrency, setBasedCurrency] = React.useState("USD");
  const [answer, setAnswer] = React.useState(0.0);
  const [loading, setLoading] = React.useState(false);

  async function getAnswer(params) {
    setLoading(true);
    await axios
      .get(`https://open.er-api.com/v6/latest/${basedCurrency}`)
      .then((response) => {
        setAnswer(response.data.rates[params]);
      })
      .catch((e) => {
        console.log(e);
      });
    setLoading(false);
  }

  return (
    <View style={styles.container}>

      <SelectList
        placeholder="USD"
        save="value"
        onSelect={() => {
          if (selected !== "") {
            getAnswer(selected);
          }
        }}
        setSelected={setBasedCurrency}
        fontFamily="lato"
        data={data}
        arrowicon={
          <FontAwesomeIcon icon={faCaretDown} size={16} color={"white"} />
        }
        searchicon={
          <FontAwesomeIcon icon={faMagnifyingGlass} color={"white"} />
        }
        closeicon={<FontAwesomeIcon icon={faCircleXmark} color={"white"} />}
        boxStyles={styles.dropdown}
        dropdownTextStyles={{ color: "#fff" }}
        inputStyles={{ color: "#fff" }}
      />

      <SelectList
        save="value"
        onSelect={() => {
          getAnswer(selected);
        }}
        setSelected={setSelected}
        fontFamily="lato"
        data={data}
        arrowicon={
          <FontAwesomeIcon icon={faCaretDown} size={16} color={"white"} />
        }
        searchicon={
          <FontAwesomeIcon icon={faMagnifyingGlass} color={"white"} />
        }
        closeicon={<FontAwesomeIcon icon={faCircleXmark} color={"white"} />}
        boxStyles={styles.dropdown}
        dropdownTextStyles={{ color: "#fff" }}
        inputStyles={{ color: "#fff" }}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        answer * value != 0 ?  <Text style={{ fontSize: "20", color: "#fff"}}>
        {value} {basedCurrency} = {answer * value} {selected}
      </Text> : <Text style={{ fontSize: "20", color: "#fff" }}>Select Currency</Text>
      )}
    </View>
  );
};

export default CustomSelectList;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  dropdown: {
    backgroundColor: "#21232c",
    borderColor: "#21232c",
    borderRadius: 8,
    margin: 10,
    width: Dimensions.get("window").width - 50,
  },
});
