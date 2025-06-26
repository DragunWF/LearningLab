import { StyleSheet, View, Text } from "react-native";
import Input from "./Input";

function ExpenseForm() {
  function amountChangedHandler() {}

  return (
    <View>
      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: amountChangedHandler,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: () => {},
        }}
      />
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          // Commented code kept as notes:
          // autoCapitalize: "none"
          // autoCorrect: false // default is true
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default ExpenseForm;
