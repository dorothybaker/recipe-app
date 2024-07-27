import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";

const RecipeCard = ({ index, navigation, item }) => {
  return (
    <View>
      <Pressable
        style={[styles.card, { paddingRight: index % 2 == 0 ? 8 : 0 }]}
        onPress={() => navigation.navigate("RECIPE", { ...item })}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={[styles.image, { height: index % 3 == 0 ? hp(24) : hp(32) }]}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <Text numberOfLines={1} style={styles.text}>
          {item.strMeal}
        </Text>
      </Pressable>
    </View>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    justifyContent: "center",
    gap: 5,
    marginBottom: 8,
  },
  image: {
    width: "100%",
    borderRadius: 35,
    backgroundColor: "black",
    position: "relative",
    objectFit: "cover",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: hp(20),
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  text: {
    fontSize: hp(2.2),
    position: "absolute",
    bottom: 20,
    left: 10,
    maxWidth: "88%",
    fontFamily: "Sancreek",
    color: "white",
  },
});
