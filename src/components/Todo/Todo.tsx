import { Button, Checkbox } from "antd";
import { ITodo } from "../../models/todo.model";

type Props = {
    todo: ITodo,
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
}

const Todo = ({todo, deleteTodo, toggleTodo}: Props) => {
    return <>
        <Checkbox onChange={() => toggleTodo(todo.id)} checked={todo.isCompleted} style={{wordWrap: 'break-word', gap: '10px', textAlign: 'start', textDecoration: todo.isCompleted ? 'line-through' : 'none', fontSize: '1.3rem'}}>
            {todo.text}
        </Checkbox>
        <Button onClick={() => deleteTodo(todo.id)} danger type='primary'>Remove</Button>
    </>
}

export default Todo;