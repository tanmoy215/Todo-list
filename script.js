// Get DOM elements
const monthlyBudgetInput = document.getElementById('monthlyBudget');
const setBudgetBtn = document.getElementById('setBudgetBtn');
const expenseCategory = document.getElementById('expenseCategory');
const expenseAmount = document.getElementById('expenseAmount');
const addExpenseBtn = document.getElementById('addExpenseBtn');
const expenseList = document.getElementById('expenseList');
const totalExpensesEl = document.getElementById('totalExpenses');
const remainingBudgetEl = document.getElementById('remainingBudget');
const budgetMessage = document.getElementById('budgetMessage');

// Initialize budget and expenses
let budget = 0;
let expenses = [];
let currentDate = new Date().toLocaleDateString(); // Format current date (e.g., "10/11/2024")

// Function to update total expenses and remaining budget
function updateSummary() {
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    totalExpensesEl.textContent = totalExpenses;
    remainingBudgetEl.textContent = budget - totalExpenses;

    if (totalExpenses > budget) {
        budgetMessage.textContent = 'You have exceeded your budget!';
        budgetMessage.style.color = 'red';
    } else if (totalExpenses === budget) {
        budgetMessage.textContent = 'You have spent your entire budget!';
        budgetMessage.style.color = 'orange';
    } else {
        budgetMessage.textContent = '';
    }
}

// Function to render the expense list
function renderExpenseList() {
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.category}: ₹${expense.amount} on ${expense.date}`;
        expenseList.appendChild(li);
    });
}

// Set budget
setBudgetBtn.addEventListener('click', () => {
    const budgetValue = parseFloat(monthlyBudgetInput.value);
    if (!isNaN(budgetValue) && budgetValue > 0) {
        budget = budgetValue;
        monthlyBudgetInput.value = '';
        updateSummary();
    } else {
        alert('Please enter a valid budget.');
    }
});

// Add expense
addExpenseBtn.addEventListener('click', () => {
    const category = expenseCategory.value.trim();
    const amount = parseFloat(expenseAmount.value);

    if (category && !isNaN(amount) && amount > 0) {
        expenses.push({
            category: category,
            amount: amount,
            date: currentDate,  // Add the current date with each expense
        });
        expenseCategory.value = '';
        expenseAmount.value = '';
        updateSummary();
        renderExpenseList();
    } else {
        alert('Please enter valid expense details.');
    }
});
