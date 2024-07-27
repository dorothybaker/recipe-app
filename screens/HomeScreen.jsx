import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Colors } from "../constants/color";
import Categories from "../components/Categories";
import { useEffect, useState } from "react";
import axios from "axios";
import Recipes from "../components/Recipes";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );

      if (response.data) {
        setCategories(response.data.categories);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );

      if (response.data) {
        setMeals(response.data.meals);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleActiveCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getSearchMeals = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );

      if (response.data) {
        setMeals(response.data.meals);
        setLoading(false);
        setSearch("");
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 10,
            rowGap: 20,
          }}
        >
          <View style={styles.top}>
            <AntDesign name="book" color={Colors.primary} size={hp(4.2)} />
            <Ionicons name="flower" size={hp(5.4)} color={"#444"} />
          </View>

          <View>
            <Text
              style={[
                styles.text,
                {
                  fontSize: hp(3.3),
                  color: "#444",
                  textTransform: "uppercase",
                },
              ]}
            >
              Discover the best
            </Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: hp(3.3),
                  color: "#444",
                  textTransform: "uppercase",
                },
              ]}
            >
              of your <Text style={{ color: Colors.primary }}>favorite</Text>{" "}
              food here!
            </Text>
          </View>

          <View style={styles.search}>
            <View>
              <MaterialCommunityIcons
                name="flower-tulip"
                size={hp(3)}
                color={"gray"}
              />
            </View>
            <TextInput
              placeholder="Search recipe by name"
              style={[
                styles.text,
                {
                  fontSize: hp(2.3),
                  flex: 1,
                  paddingHorizontal: 5,
                },
              ]}
              value={search}
              onChangeText={(e) => setSearch(e)}
            />
            <TouchableOpacity onPress={() => getSearchMeals()}>
              <MaterialCommunityIcons
                name="magnify"
                size={hp(4)}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>

          <View>
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleActiveCategory={handleActiveCategory}
            />
          </View>

          <View>
            {loading ? (
              <ActivityIndicator size={"large"} style={{ marginTop: 140 }} />
            ) : meals !== null && !loading && meals.length > 0 ? (
              <Recipes
                meals={meals}
                categories={categories}
                loading={loading}
              />
            ) : (
              <View
                style={{
                  minHeight: 250,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={[styles.text, { fontSize: hp(4), color: "#888" }]}>
                  No recipes found
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: { fontFamily: "Sancreek" },
  search: {
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
});
