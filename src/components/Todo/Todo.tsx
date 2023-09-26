import { Button, Checkbox } from "antd";
import { ITodo } from "../../models/todo.mode";

type Props = {
    todo: ITodo,
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
}

const Todo = ({todo, deleteTodo, toggleTodo}: Props) => {
    return <div>
        <Checkbox onChange={() => toggleTodo(todo.id)} checked={todo.isCompleted}>
            <span style={{textDecoration: todo.isCompleted ? 'line-through' : 'none'}}>{todo.text}</span>
        </Checkbox>
        <Button onClick={() => deleteTodo(todo.id)}>Remove</Button>
    </div>
}

export default Todo;