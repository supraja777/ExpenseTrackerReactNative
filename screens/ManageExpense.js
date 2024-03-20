import { useContext, useLayoutEffect, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../util/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(undefined);

  const expenseContext = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;

  const isEditing = !!editedExpenseId;

  const selectedExpense = expenseContext.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit expense" : "Add expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsLoading(true);
    try {
      await deleteExpense(editedExpenseId);
      expenseContext.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      console.log("error == ", error);
      setError("Failed deleting");
    }
    setIsLoading(false);
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    if (isEditing) {
      setIsLoading(true);
      try {
        await updateExpense(editedExpenseId, expenseData);
        expenseContext.updateExpense(editedExpenseId, expenseData);
      } catch (error) {
        console.log("error == ", error);
        setError("Failed updating ");
      }

      setIsLoading(false);
    } else {
      setIsLoading(true);

      try {
        const id = storeExpense(expenseData);
        expenseContext.addExpense({ ...expenseData, id: id });
        navigation.goBack();
      } catch (error) {
        console.log("error == ", error);
        setError("Error adding expense");
      }

      setIsLoading(false);
    }
  }

  function errorHandler() {
    setError(null)
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        defaultValues={selectedExpense}
        onCancel={cancelHandler}
        isEditing={isEditing}
        onSubmit={confirmHandler}
      />

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
