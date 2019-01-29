import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
//import uuid from 'uuid';
import Axios from 'axios';

import './App.css';

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    Axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10').then(res =>
      this.setState({ todos: res.data })
    );
  }

  //Toggle complete
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  //Delete Todo
  // delTodo = id => {
  //   this.setState({
  //     todos: [...this.state.todos.filter(todo => todo.id !== id)]
  //   });

  delTodo = id => {
    Axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`).then(
      res => {
        this.setState({
          todos: [...this.state.todos.filter(todo => todo.id !== id)]
        });
      }
    );
  };

  //Add Todo
  addTodo = title => {
    // const newTodo = {
    //   id: uuid.v4(),
    //   title: title,
    //   completed: false
    // };
    Axios.post('http://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    }).then(res =>
      this.setState({
        // todos: [...this.state.todos, newTodo]
        todos: [...this.state.todos, res.data]
      })
    );
  };

  render() {
    return (
      <Router>
        <div className='App'>
          <div className='container'>
            <Header />
            <Route
              exact
              path='/'
              render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route exact path='/About' component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;