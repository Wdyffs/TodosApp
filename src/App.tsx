import './App.css'
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
    <div>
      <TodoList list={mockTodoList} toggleTodo={() => {}} deleteTodo={() => {}}/>
    </div>
  )
}

export default App
