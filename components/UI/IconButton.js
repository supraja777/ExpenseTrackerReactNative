import { Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ icon, size, color, onPress }) {
  <Pressable onPress={onPress} style={({pressed}) => {pressed && styles.press}}>
    <View style={styles.buttonContainer}>
      <Ionicons name={icon} size={size} color={color}  />
    </View>
  </Pressable>;
}

export default IconButton;


const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        margin: 8,
    },
    press: {
       opacity: 0.75
    }
})
