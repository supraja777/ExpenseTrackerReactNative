import { useContext, useLayoutEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import ButtonCustom from "../components/UI/ButtonCustom";
import { ExpensesContext } from "../store/expenses-context";

function ManageExpense({ route, navigation }) {
  const expenseContext = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;

  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit expense" : "Add expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expenseContext.deleteExpense(editedExpenseId)
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
        expenseContext.updateExpense(editedExpenseId, {description: 'test update', amount: 50, date: new Date()});
    }
    else {
        expenseContext.addExpense({description: 'test', amount: 99, date: new Date()})
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <ButtonCustom style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </ButtonCustom>
        <ButtonCustom style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </ButtonCustom>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <Button title="delete" onPress={deleteExpenseHandler} />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
