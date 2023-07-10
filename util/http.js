import axios from "axios"

const BE_URL =
  "https://expense-tracker-363-default-rtdb.asia-southeast1.firebasedatabase.app"

export async  function storeExpense(expenseData){
    const response = await axios.post(
      BE_URL + "/expense.json",
      expenseData,
    )
    console.log(response)
    const id = response.data.name
    return id
}

export async function fetchExpenses() {
    const response = await axios.get(BE_URL + "/expense.json")

    const expenses = []

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }
        expenses.push(expenseObj)
    }

    return expenses
}

export function updateExpense(id, expenseData) {
    return axios.put(BE_URL+`/expense/${id}.json`, expenseData)
}

export async function deleteExpense(id) {
    return axios.delete(BE_URL + `/expense/${id}.json`)

}