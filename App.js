import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import { useState } from "react/cjs/react.development";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function HomeScreen({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [foodItem, setFoodItem] = useState("");
  const [foodPriceItem, setFoodPriceItem] = useState("");

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  const storeData = async (foodItem, foodPriceItem) => {
    try {
      if (foodItem) {
        await AsyncStorage.setItem("Name", foodItem);
      }
      if (foodPriceItem) {
        await AsyncStorage.setItem("Price", foodPriceItem);
      }

      alert("Data Added");
    } catch (e) {
      // saving error
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={toggleBottomNavigationView}
      >
        <Text style={styles.buttonText}>Add Food Items</Text>
      </TouchableOpacity>
      {/* ----------------------------------------------------------------------------------------- */}
      <View style={styles.bottomEnd}>
        <TouchableOpacity
          style={styles.buttonFinal}
          onPress={() => navigation.navigate("Final Food List")}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>
            Final Food List
          </Text>
        </TouchableOpacity>
      </View>

      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
        //Toggling the visibility state on the clicking out side of the sheet
      >
        {/*Bottom Sheet inner View*/}
        <View style={styles.bottomNavigationView}>
          <Text
            style={{
              textAlign: "justify",
              padding: 20,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Add Items
          </Text>
          <Text style={styles.bottomText}>Food Name</Text>
          <TextInput
            style={styles.textInput}
            value={foodItem}
            onChangeText={(value) => setFoodItem(value)}
          />

          <Text style={{ marginTop: 15, marginLeft: 20 }}>Food Price</Text>
          <TextInput
            style={styles.textInput}
            value={foodPriceItem}
            onChangeText={(value) => setFoodPriceItem(value)}
          />

          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() => storeData()}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Add Food Items
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}

function ListScreen() {
  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    ></View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Food List">
        <Stack.Screen name="Food List" component={HomeScreen} />
        <Stack.Screen name="Final Food List" component={ListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    alignItems: "center",

    flexDirection: "column",
  },
  header: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
    alignItems: "center",
    width: "95%",
    backgroundColor: "#cafcdc",
    borderColor: "#148c40",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomNavigationView: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "#fff",
    width: "100%",
    height: 300,
  },
  bottomText: {
    marginLeft: 20,
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    marginHorizontal: 19,
    marginTop: 4,
    paddingHorizontal: 6,
    paddingVertical: 6,
    fontSize: 14,
  },
  buttonAdd: {
    height: 42,
    marginRight: 17,
    marginLeft: 17,
    marginTop: 25,
    borderRadius: 5,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3ab524",

    padding: 5,
  },
  buttonFinal: {
    minWidth: "95%",
    minHeight: 40,
    marginTop: 20,
    alignItems: "center",
    maxWidth: "95%",
    backgroundColor: "#3ab524",

    padding: 10,
    borderRadius: 10,
  },
  bottomEnd: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});
