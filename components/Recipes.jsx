import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import RecipeCard from "./RecipeCard";
import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";

const Recipes = ({ meals, categories, loading }) => {
  const navigation = useNavigation();

  return (
    <View>
      <Text style={[styles.text, { fontSize: hp(2.6) }]}>
        {meals.length} Recipes
      </Text>

      <View>
        {loading || categories.length === 0 || meals.length === 0 ? (
          <View>
            <ActivityIndicator
              size={"large"}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 140,
              }}
            />
          </View>
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <RecipeCard item={item} index={i} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
            containerStyle={{ gap: 10 }}
          />
        )}
      </View>
    </View>
  );
};

export default Recipes;

const styles = StyleSheet.create({
  text: { fontFamily: "Sancreek" },
});
