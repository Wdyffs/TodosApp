import './App.css'
import Todo from './components/Todo/Todo'

function App() {
  return (
    <div>
      <Todo todo={{id: '2xck', text: 'Todo text', isCompleted: false}} deleteTodo={() => {}} toggleTodo={() => {}}/>
    </div>
  )
}

export default App
