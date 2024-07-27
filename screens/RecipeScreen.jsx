import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../constants/color";

const RecipeScreen = (props) => {
  let item = props.route.params;
  const navigation = useNavigation();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const getMealData = async (id) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      if (response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];

    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  //   let videoId;
  //   if (!loading) {
  //     videoId = meal.strYoutube.slice(meal.strYoutube.indexOf("=") + 1);
  //   }

  return (
    <ScrollView
      style={{ flex: 1, paddingBottom: 10 }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle={"light-content"} />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator
            size={"large"}
            style={{ marginTop: windowHeight / 2 }}
          />
        </View>
      ) : (
        <>
          <View>
            <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
          </View>

          <View style={styles.icons}>
            <TouchableOpacity
              style={styles.back}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={21} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.back}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <AntDesign
                name={isFavorite ? "heart" : "hearto"}
                size={23}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View
              style={{
                paddingHorizontal: 10,
                flexDirection: "column",
                rowGap: 3,
              }}
            >
              <Text
                style={[styles.text, { fontSize: hp(3) }]}
                numberOfLines={4}
              >
                {meal.strMeal}{" "}
                <Text style={{ fontSize: hp(2.2), color: "#666" }}>
                  ({meal.strCategory})
                </Text>
              </Text>
              <Text style={[styles.text, { fontSize: hp(2.3), color: "#555" }]}>
                {meal.strArea}
              </Text>
            </View>

            <View style={{ flexDirection: "column", rowGap: 5 }}>
              <Text style={[styles.text, { fontSize: hp(2.5) }]}>
                Ingredients
              </Text>
              <View style={{ flexDirection: "column", rowGap: 8 }}>
                {ingredientsIndexes(meal).map((i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <View style={styles.dot} />
                    <Text
                      style={[
                        styles.text,
                        { fontSize: hp(2.2), color: "#444" },
                      ]}
                    >
                      {meal["strIngredient" + i]} ({meal["strMeasure" + i]})
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={{ flexDirection: "column", rowGap: 5 }}>
              <Text style={[styles.text, { fontSize: hp(2.5) }]}>
                Instructions
              </Text>
              {meal.strSource && (
                <Text
                  style={[
                    styles.text,
                    { fontSize: hp(2.2), color: "#222", lineHeight: 25.5 },
                  ]}
                >
                  Source:{" "}
                  <Text style={{ color: "lightblue" }}>{meal.strSource}</Text>
                </Text>
              )}
              <Text
                style={[
                  styles.text,
                  { fontSize: hp(2.3), color: "#222", lineHeight: 27 },
                ]}
              >
                {meal.strInstructions}
              </Text>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  image: {
    width: wp(100),
    height: hp(45),
    objectFit: "cover",
  },
  back: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
  icons: {
    position: "absolute",
    top: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    marginTop: -60,
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    paddingTop: 25,
    flexDirection: "column",
    rowGap: 15,
  },
  text: { fontFamily: "Sancreek" },
  dot: {
    backgroundColor: Colors.primary,
    width: 7,
    height: 7,
    borderRadius: 99,
  },
});
