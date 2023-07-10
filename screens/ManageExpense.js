import { useContext, useLayoutEffect, useState } from "react"
import { StyleSheet, View } from "react-native"

import Button from "../components/UI/Button"
import IconButton from "../components/UI/IconButton"
import { GlobalStyles } from "../constants/styles"
import { ExpensesContext } from "../store/expenses-context"
import ExpenseForm from "../components/ManageExpense/ExpenseForm"
import {deleteExpense, storeExpense, updateExpense} from "../util/http"
import LoadingOverlay from "../components/UI/LoadingOverlay"
import ErrorOverlay from "../components/UI/ErrorOverlay"

function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState()
  const expensesCtx = useContext(ExpensesContext)

  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId
  const editedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId,
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    })
  }, [navigation, isEditing])

  async function deleteExpenseHandler() {
    setIsSubmitting(true)
    try {
      expensesCtx.deleteExpense(editedExpenseId)
      await deleteExpense(editedExpenseId)
      navigation.goBack()
    } catch (err) {
      setError('Could not delete expense - please tey again later!')
      setIsSubmitting(false)
    }
  }

  function cancelHandler() {
    navigation.goBack()
  }

  async function confirmHandler(expenseData) {
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData)
        setIsSubmitting(true)
        await updateExpense(editedExpenseId, expenseData)
      } else {
        setIsSubmitting(true)
        const id = await storeExpense(expenseData)
        expensesCtx.addExpense({ ...expenseData, id })
      }
      navigation.goBack()
    } catch (err) {
      setError('Could not save data  - please try again later!')
      setIsSubmitting(false)
    }
    }
    

  function errorHandler() {
    setError(null)
  }
  if(error && !isSubmitting) return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  if(isSubmitting) return <LoadingOverlay />

  return (
    <View style={styles.container}>
      <ExpenseForm
        defaultValues={editedExpense}
        buttonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onConfirm={confirmHandler}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
})
