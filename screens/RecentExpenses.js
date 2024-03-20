import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDates } from "../util/Date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../util/ErrorOverlay";
function RecentExpenses() {
  const [isFetchingState, setIsFetchingState] = useState(true);
  const [error, setError] = useState(null)
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetchingState(true);
      try {
        const expenses = await fetchExpenses();
        expensesContext.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch data")
        console.log("error -- ", error)
      }
      setIsFetchingState(false);
      
    }
    getExpenses();
  }, []);

  function errorHandler() {
    setError(null)
  }


  if (error && !isFetchingState) {
    <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDates(today, 7);

    return expense.date > date7DaysAgo;
  });

  if (isFetchingState) {
    return <LoadingOverlay/>
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="7 days ago"
      fallBackText="No expenses registered for last 7 days"
    />
  );
}

export default RecentExpenses;
