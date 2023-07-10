import { Alert, StyleSheet, Text, View } from "react-native"
import Input from "./Input"
import { GlobalStyles } from "../../constants/styles"
import Button from "../UI/Button"
import { useState } from "react"
import { getFormattedDate } from "../../util/date"

export default function ExpenseForm({
  buttonLabel,
  onCancel,
  onConfirm,
  defaultValues,
}) {
  const [input, setInput] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: defaultValues ? amountValidator(defaultValues.amount) : true,
      validate: amountValidator,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: defaultValues ? dateValidator(defaultValues.date) : true,
      validate: dateValidator,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
      validate: defaultValidator,
    },
  })

    function inputHandler(identifier, enteredValue) {
    setInput((currInput) => {
      const inputValue = {
        ...currInput,
        [identifier]: {
          ...currInput[identifier],
          value: enteredValue,
          isValid: currInput[identifier].validate(enteredValue),
        },
      }
      return inputValue
    })
  }
  function validateInputData() {
    return Object.values(input).reduce((acc, curr) => curr.isValid && acc, true)
  }

  function confirmHandler() {
      if (!validateInputData()) {
        Alert.alert('Invalid Input!', 'Please check the entered values...')
      return
    }
    const expenseData = {
      amount: +input.amount.value,
      date: new Date(input.date.value),
      description: input.description.value,
    }
    onConfirm(expenseData)
  }
  return (
    <View>
      <View style={styles.inputsContainer}>
        <Text style={styles.title}>Expense Form</Text>
        <View style={styles.rowDirection}>
          <Input
            label="Amount"
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputHandler.bind(this, "amount"),
              value: input.amount.value,
            }}
            style={styles.input}
            isValid={input.amount.isValid}
          />
          <Input
            label="Date"
            textInputConfig={{
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
              onChangeText: inputHandler.bind(this, "date"),
              value: input.date.value,
            }}
            style={styles.input}
            isValid={input.date.isValid}
          />
        </View>
        <Input
          label="Description"
          textInputConfig={{
            multiline: true,
            onChangeText: inputHandler.bind(this, "description"),
            value: input.description.value,
          }}
          isValid={input.description.isValid}
        />
      </View>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {buttonLabel}
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: GlobalStyles.colors.primary50,
  },
  rowDirection: {
    flexDirection: "row",
  },
  inputsContainer: {
    marginVertical: 16,
  },
  input: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
})

function defaultValidator() {
    return true
}

function amountValidator(amount) {
    return !isNaN(amount) && +amount > 0
}

function dateValidator(date) {
    if (date instanceof Date) return true
    const datePattern = /^\d{4}-\d{2}-\d{2}$/
    return datePattern.test(date) && new Date(date).toString() !== "Invalid Date"
}
