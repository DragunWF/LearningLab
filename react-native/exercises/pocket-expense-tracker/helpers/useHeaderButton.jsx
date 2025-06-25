import { useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import IconButton from "../components/IconButton";

function useHeaderButton(navigation, iconName, onPress) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          name={iconName}
          color="white"
          onPress={onPress}
          style={styles.navHeaderButton}
        />
      ),
    });
  }, [navigation, iconName, onPress]);
}

const styles = StyleSheet.create({
  navHeaderButton: {
    marginRight: 20,
    marginLeft: 20,
  },
});

export default useHeaderButton;
