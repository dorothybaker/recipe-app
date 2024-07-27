import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { categoryData } from "../constants";

import { Colors } from "../constants/color";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Categories = ({ categories, activeCategory, handleActiveCategory }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ columnGap: 10 }}
    >
      {(categories ? categories : categoryData).map((category) => (
        <TouchableOpacity
          key={category.idCategory}
          style={styles.category}
          onPress={() => handleActiveCategory(category.strCategory)}
        >
          <View
            style={{
              backgroundColor:
                activeCategory === category.strCategory
                  ? Colors.primary
                  : "white",
              padding: 5,
              borderRadius: 999,
            }}
          >
            <Image
              source={{ uri: category.strCategoryThumb }}
              style={styles.image}
            />
          </View>
          <Text
            style={[
              styles.text,
              {
                color: "#555",
                fontSize: hp(2),
                textAlign: "center",
                textTransform: "uppercase",
              },
            ]}
          >
            {category.strCategory}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  text: { fontFamily: "Sancreek" },
  category: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 1,
  },
  image: { width: hp(7), height: hp(7), borderRadius: 999, objectFit: "cover" },
});
