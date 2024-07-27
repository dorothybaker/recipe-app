import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LottieView from "lottie-react-native";
import { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/color";

const WelcomeScreen = () => {
  const animation = useRef(null);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://github.com/joestackss/Recipe-Food-App-React-Native/blob/master/assets/images/background.png?raw=true",
        }}
        style={styles.image}
      />

      <View>
        <LottieView
          ref={animation}
          autoPlay
          style={styles.lottie}
          source={require("../assets/lottie/food.json")}
        />
      </View>

      <View style={{ flexDirection: "column", gap: 4 }}>
        <Text
          style={[
            styles.text,
            { color: "white", fontSize: hp(5.5), textAlign: "center" },
          ]}
        >
          Culinary Realm
        </Text>
        <Text
          style={[
            styles.text,
            { fontSize: hp(2.5), color: "white", textAlign: "center" },
          ]}
        >
          Explore your favorite and delicious food!
        </Text>
      </View>

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("HOME")}
        >
          <Text
            style={[
              styles.text,
              {
                fontSize: 18,
                color: Colors.primary,
                textTransform: "uppercase",
              },
            ]}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 40,
    position: "relative",
    flexDirection: "column",
  },
  image: { position: "absolute", width: wp(100), height: hp(100) },
  lottie: { width: 300, height: 300 },
  text: { fontFamily: "Sancreek" },
  button: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(10),
    backgroundColor: "white",
    borderRadius: hp(1),
  },
});

export default WelcomeScreen;
