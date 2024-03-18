import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDates } from "../util/Date";
function RecentExpenses() {
    const expensesContext = useContext(ExpensesContext)
    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date()
        const date7DaysAgo = getDateMinusDates(today, 7);

        return expense.date > date7DaysAgo;
    })
    return <ExpensesOutput expenses={recentExpenses} expensesPeriod="7 days ago" fallBackText = "No expenses registered for last 7 days"/>
}

export default RecentExpenses;