window.onload = () => {
  renderData();
};

// ADD INCOME
document.getElementById("incomeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("incomeTitle").value;
  const amount = parseFloat(document.getElementById("incomeAmount").value);

  if (!title || amount <= 0) return alert("Kindly enter valid income details");

  const income = { id: Date.now(), title, amount };
  const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
  incomes.push(income);
  localStorage.setItem("incomes", JSON.stringify(incomes));
  this.reset();
  renderData();
});

// ADD EXPENSE
document.getElementById("expenseForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("expenseTitle").value;
  const amount = parseFloat(document.getElementById("expenseAmount").value);

  if (!title || amount <= 0) return alert("Kindly enter valid expense details");

  const expense = { id: Date.now(), title, amount };
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  this.reset();
  renderData();
});

// DELETE INCOME OR EXPENSE BY ID
function deleteItem(id, type) {
  let data = JSON.parse(localStorage.getItem(type)) || [];
  data = data.filter((item) => item.id !== id);
  localStorage.setItem(type, JSON.stringify(data));
  renderData();
}

// RENDER FUNCTION
function renderData() {
  const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  // INCOME
  const incomeList = document.getElementById("incomeList");
  incomeList.innerHTML = "";
  let totalIncome = 0;
  incomes.forEach((item) => {
    totalIncome += Number(item.amount);
    const li = document.createElement("li");
    li.innerHTML = `${item.title}: ₹${item.amount}
      <button onclick="deleteItem(${item.id}, 'incomes')">❌</button>`;
    incomeList.appendChild(li);
  });

  // EXPENSE
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";
  let totalExpense = 0;
  expenses.forEach((item) => {
    totalExpense += Number(item.amount);
    const li = document.createElement("li");
    li.innerHTML = `${item.title}: ₹${item.amount}
      <button onclick="deleteItem(${item.id}, 'expenses')">❌</button>`;
    expenseList.appendChild(li);
  });

  // UPDATE SUMMARY
  document.getElementById("totalIncome").innerText = totalIncome;
  document.getElementById("totalExpense").innerText = totalExpense;
  document.getElementById("balance").innerText = totalIncome - totalExpense;
}
