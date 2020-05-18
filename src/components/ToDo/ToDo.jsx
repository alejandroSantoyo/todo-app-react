import React from 'react';
import InstructionLabel from '../global/InstructionLabel';

const instructions = [
  { className: "create-instruction", text: "Enter text into the input field to add items to your list (max. 28 characters)." },
  { className: "complete-instruction", text: "Click the item to mark it as complete." },
  { className: "remove-instruction", text: "Click the X to remove the item from you list." }
]

class ToDo extends React.Component {

  state = {
    taskName: "",
    tasks: []
  }

  handleInputChange = ({ target }) => this.setState({ taskName: target.value });
  
  handleKeyDown = ({ key }) => {
    if (key === "Enter")
      this.handleSubmit()
  }

  handleSubmit = () => {
    const { taskName, tasks } = this.state;
    if (taskName) {
      tasks.push({ id: tasks.length + 1, name: taskName, completed: false });
      this.setState({ tasks, taskName: "" });
    }
  }

  handleTaskClick = (task) => () => {
    const { tasks } = this.state;
    const taskIndex = tasks.findIndex(item => task.id === item.id);
    if (taskIndex > -1) {
      tasks[taskIndex].completed = !task.completed;
      this.setState({ tasks })
    }
  }

  handleDelete = (index) => () => {
    const { tasks } = this.state;
    tasks.splice(index, 1);
    this.setState({ tasks })
  }

  renderTasks = (task, index) => {
    return (
      <li key={index} onClick={this.handleTaskClick(task)}>

        {task.completed && <i className="material-icons completed">checked</i>}

        <span className="item-text">{task.name}</span>
        <button onClick={ this.handleDelete(index) }> <i className="material-icons">clear</i> </button>

      </li>
    )
  };

  render() {
    const { taskName, tasks } = this.state;
    return (
      <>
        <h1>WORK TO-DOS</h1>
        {instructions.map((instruction, index) => <InstructionLabel key={index} {...instruction} />)}

        <div className="input-container">

          <input
            className="todo-input"
            value={taskName}
            placeholder="New item..."
            maxLength={28}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
          />

          <button className="add-todo–button" onClick={this.handleSubmit} >
            <i className="material-icons">edit</i>
          </button>

        </div>

        <ul className="list" >
          {tasks.map(this.renderTasks)}
        </ul>

      </>
    )
  }

}

export default ToDo;