import { Button, Space } from 'antd';
import './App.css'
import AddTodo from './components/AddTodo/AddTodo';
import TodoList from './components/TodoList/TodoList'
import { useMemo, useReducer } from 'react';
import { ETodoAction, todosReducer } from './reducers/todo.reducer';

function App() {
  const [state, dispatch] = useReducer(todosReducer, { todos: [], filter: 'all' });
  const countItemsLeft = state.todos.filter(todo => !todo.isCompleted).length;

  const todoList = useMemo(() => {
    switch (state.filter) {
      case 'all':
        return state.todos;
      case 'active':
        return state.todos.filter(todo => !todo.isCompleted);
      case 'completed':
        return state.todos.filter(todo => todo.isCompleted);
    };
  }, [state.filter, state.todos])

  const addTodo = (text: string) => dispatch({ type: ETodoAction.ADD_TODO, payload: text });
  const deleteTodo = (id: string) => dispatch({ type: ETodoAction.REMOVE_TODO, payload: id });
  const toggleTodo = (id: string) => dispatch({ type: ETodoAction.TOGGLE_TODO, payload: id });
  const setAllFilter = () => dispatch({ type: ETodoAction.SET_ALL_FILTER });
  const setActiveFilter = () => dispatch({ type: ETodoAction.SET_ACTIVE_FILTER });
  const setCompletedFilter = () => dispatch({ type: ETodoAction.SET_COMPLETED_FILTER });
  const removeCompleted = () => dispatch({ type: ETodoAction.REMOVE_COMPLETED });

  return (
    <Space direction='vertical' size='middle'>
      <AddTodo addTodo={addTodo} />
      <TodoList list={todoList} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <Space size='large'>
        <span>{countItemsLeft} items left</span>
        <Space>
          <Button onClick={setAllFilter} type={state.filter === 'all' ? 'primary' : 'default'}>All</Button>
          <Button onClick={setActiveFilter} type={state.filter === 'active' ? 'primary' : 'default'}>Active</Button>
          <Button onClick={setCompletedFilter} type={state.filter === 'completed' ? 'primary' : 'default'}>Completed</Button>
        </Space>
        <Button onClick={removeCompleted} danger type="primary">Clear completed</Button>
      </Space>
    </Space>
  )
}

export default App
