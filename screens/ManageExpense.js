import { useContext, useLayoutEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({ route, navigation }) {
  const expenseContext = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;

  const isEditing = !!editedExpenseId;


  const selectedExpense = expenseContext.expenses.find((expense) => 
    expense.id === editedExpenseId
  )

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

  function confirmHandler(expenseData) {
    if (isEditing) {
        expenseContext.updateExpense(editedExpenseId, expenseData);
    }
    else {
        expenseContext.addExpense(expenseData)
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
        <ExpenseForm defaultValues={selectedExpense} onCancel = {cancelHandler} isEditing={isEditing} onSubmit={confirmHandler}/>
     
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
  
});
