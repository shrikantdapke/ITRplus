import React, { useState } from 'react';
import './MoneyManagement.css';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const defaultCategories = ['Groceries', 'Dining Out', 'Transport', 'Entertainment'];

function MoneyManagement() {
  const [monthlySalary, setMonthlySalary] = useState(0);
  const [fixedExpenses, setFixedExpenses] = useState({ rent: 0, emis: 0 });
  const [categories, setCategories] = useState(defaultCategories);
  const [newCategory, setNewCategory] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [expenseInputs, setExpenseInputs] = useState({});

  const formatCategory = (cat) => {
    return cat
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const addCategory = () => {
    const formatted = formatCategory(newCategory);
    if (!formatted) {
      alert('Category cannot be empty!');
      return;
    }
    if (categories.includes(formatted)) {
      alert('Category already exists!');
      return;
    }
    setCategories([...categories, formatted]);
    setExpenseInputs({ ...expenseInputs, [formatted]: '' });
    setNewCategory('');
  };

  const addExpense = (category) => {
    const amount = parseFloat(expenseInputs[category]);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid expense amount');
      return;
    }

    const newExpense = {
      id: Date.now(),
      category,
      amount,
      timestamp: new Date().toLocaleString(),
    };

    setExpenses([...expenses, newExpense]);
    setExpenseInputs({ ...expenseInputs, [category]: '' });
  };

  const totalFixedExpenses = Object.values(fixedExpenses).reduce(
    (sum, val) => sum + parseFloat(val || 0),
    0
  );

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remainingBalance = monthlySalary - totalFixedExpenses - totalExpenses;

  const expenseData = categories.reduce((acc, cat) => {
    acc[cat] = expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0);
    return acc;
  }, {});

  const pieData = {
    labels: categories,
    datasets: [
      {
        data: categories.map((cat) => expenseData[cat] || 0),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#8BC34A',
          '#E91E63',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: categories,
    datasets: [
      {
        label: 'Spent (₹)',
        data: categories.map((cat) => expenseData[cat] || 0),
        backgroundColor: '#FF6384',
      },
    ],
  };

  return (
    <div className="money-management">
      <h2>💰 SmartSaver - Money Manager</h2>

      <div className="input-group">
        <label>Amount Available:</label>
        <input
          type="number"
          value={monthlySalary}
          onChange={(e) => setMonthlySalary(Number(e.target.value))}
          placeholder="₹ e.g. 40000"
        />

        <label> Rent:</label>
        <input
          type="number"
          value={fixedExpenses.rent}
          onChange={(e) =>
            setFixedExpenses({ ...fixedExpenses, rent: e.target.value })
          }
          placeholder="₹ e.g. 12000"
        />

        <label> EMIs:</label>
        <input
          type="number"
          value={fixedExpenses.emis}
          onChange={(e) =>
            setFixedExpenses({ ...fixedExpenses, emis: e.target.value })
          }
          placeholder="₹ e.g. 5000"
        />
      </div>

      <p className="balance"> Remaining Balance: ₹{remainingBalance.toFixed(2)}</p>

      <div className="category-section">
        <h4>➕ Add Expense Category</h4>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="e.g. Utilities"
        />
        <button onClick={addCategory}>Add Category</button>
      </div>

      <div className="expenses-section">
        <h4>📤 Track Your Spending</h4>
        {categories.map((cat) => (
          <div key={cat} className="expense-row">
            <span className="category-label">{cat}</span>
            <input
              type="number"
              placeholder="Enter Expense (₹)"
              value={expenseInputs[cat] || ''}
              onChange={(e) =>
                setExpenseInputs({ ...expenseInputs, [cat]: e.target.value })
              }
              onKeyDown={(e) => e.key === 'Enter' && addExpense(cat)}
            />
            <button onClick={() => addExpense(cat)}>Add</button>
            <span className="spent-amount">Total: ₹{expenseData[cat] || 0}</span>
          </div>
        ))}
      </div>

      <p className="balance"> Remaining Balance: ₹{remainingBalance.toFixed(2)}</p>

      <div className="charts-section">
        <h3> Spending Distribution</h3>
        <Pie data={pieData} />

        <h3>📉 Expense Breakdown</h3>
        <Bar data={barData} />
      </div>

      <div className="history-section">
        <h4>🧾 Expense History</h4>
        <ul>
          {expenses.map((exp) => (
            <li key={exp.id}>
              {exp.timestamp} - <strong>{exp.category}</strong>: ₹{exp.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MoneyManagement;
