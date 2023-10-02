import { Space } from 'antd';
import './App.css'
import AddTodo from './components/AddTodo/AddTodo';
import TodoList from './components/TodoList/TodoList'
import { ITodo } from './models/todo.mode';

const mockTodoList: ITodo[] = [
  {
      id: '1x4',
      text: 'todo',
      isCompleted: false
  },
  {
      id: '1a3',
      text: 'todo',
      isCompleted: true
  },
  {
      id: '2x4',
      text: 'todo',
      isCompleted: false
  },
  {
      id: 'jc4',
      text: 'todo',
      isCompleted: true
  },
];

function App() {
  return (
    <Space direction='vertical' size='middle'>
      <AddTodo addTodo={(v: any) => {}}/>
      <TodoList list={mockTodoList} toggleTodo={() => {}} deleteTodo={() => {}}/>
    </Space>
  )
}

export default App
