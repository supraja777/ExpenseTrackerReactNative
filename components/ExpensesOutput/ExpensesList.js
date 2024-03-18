import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

function RenderExpenseItem(itemData) {
  return <ExpenseItem id={itemData.item.id} description={itemData.item.description} date={itemData.item.date} amount={itemData.item.amount}/>;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={RenderExpenseItem}
    />
  );
}

export default ExpensesList;
