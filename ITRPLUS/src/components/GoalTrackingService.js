import React, { useState } from 'react';
import './GoalTrackingService.css';

function GoalTrackingService() {
  const [goals, setGoals] = useState([]);
  const [goalInput, setGoalInput] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: ''
  });
  const [amountInputs, setAmountInputs] = useState({}); // store individual input amounts

  const addGoal = () => {
    const { name, targetAmount, currentAmount } = goalInput;
    if (!name || !targetAmount || isNaN(targetAmount)) return;

    const newGoal = {
      id: Date.now(),
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount) || 0,
      deadline: goalInput.deadline,
      completed: false
    };

    setGoals([...goals, newGoal]);
    setGoalInput({ name: '', targetAmount: '', currentAmount: '', deadline: '' });
  };

  const updateGoalAmount = (id) => {
    const increment = amountInputs[id];
    if (isNaN(increment) || increment === '') return;

    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const updatedAmount = goal.currentAmount + parseFloat(increment);
        return {
          ...goal,
          currentAmount: updatedAmount >= goal.targetAmount ? goal.targetAmount : updatedAmount
        };
      }
      return goal;
    }));

    setAmountInputs({ ...amountInputs, [id]: '' });
  };

  const markGoalAsComplete = (id) => {
    setGoals(goals.map(goal => goal.id === id ? { ...goal, completed: true } : goal));
  };

  const progressPercent = (goal) => {
    return Math.min(((goal.currentAmount / goal.targetAmount) * 100).toFixed(2), 100);
  };

  return (
    <div className="goal-tracking-service">
      <h2>🎯 SmartSaver - Goal Tracking Service</h2>

      <div className="goal-form">
        <input
          type="text"
          placeholder="Goal Name"
          value={goalInput.name}
          onChange={(e) => setGoalInput({ ...goalInput, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={goalInput.targetAmount}
          onChange={(e) => setGoalInput({ ...goalInput, targetAmount: e.target.value })}
        />
        <input
          type="number"
          placeholder="Start Amount (optional)"
          value={goalInput.currentAmount}
          onChange={(e) => setGoalInput({ ...goalInput, currentAmount: e.target.value })}
        />
        <input
          type="date"
          placeholder="Deadline (optional)"
          value={goalInput.deadline}
          onChange={(e) => setGoalInput({ ...goalInput, deadline: e.target.value })}
        />
        <button onClick={addGoal}>➕ Add Goal</button>
      </div>

      <div className="goals-list">
        <h3>📈 Active Goals</h3>
        {goals.filter(goal => !goal.completed).length === 0 ? (
          <p>No active goals yet. Start saving today!</p>
        ) : (
          goals.filter(goal => !goal.completed).map(goal => (
            <div key={goal.id} className="goal-card">
              <div className="goal-header">
                <h4>{goal.name}</h4>
                {goal.deadline && <span className="deadline">📅 {goal.deadline}</span>}
              </div>
              <p>Target: ₹{goal.targetAmount}</p>
              <p>Saved: ₹{goal.currentAmount}</p>
              <p>Progress: {progressPercent(goal)}%</p>
              <progress value={goal.currentAmount} max={goal.targetAmount}></progress>

              <div className="goal-actions">
                <input
                  type="number"
                  placeholder="Add Amount"
                  value={amountInputs[goal.id] || ''}
                  onChange={(e) =>
                    setAmountInputs({ ...amountInputs, [goal.id]: e.target.value })
                  }
                />
                <button onClick={() => updateGoalAmount(goal.id)}>➕ Update</button>
                <button onClick={() => markGoalAsComplete(goal.id)}>✅ Mark Complete</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="completed-goals">
        <h3>🏁 Completed Goals</h3>
        {goals.filter(goal => goal.completed).length === 0 ? (
          <p>No completed goals yet. Keep going!</p>
        ) : (
          goals.filter(goal => goal.completed).map(goal => (
            <div key={goal.id} className="goal-card completed">
              <h4>{goal.name}</h4>
              <p>Target Achieved: ₹{goal.targetAmount}</p>
              {goal.deadline && <p>Deadline: {goal.deadline}</p>}
              <p>🎉 Congratulations on achieving your goal!</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GoalTrackingService;
