import { List } from "antd";
import { ITodo } from "../../models/todo.model";
import Todo from "../Todo/Todo";

type Props = {
    list: ITodo[];
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
};

const TodoList = ({ list, toggleTodo, deleteTodo }: Props) => {
    return (
        <List
            dataSource={list}
            bordered
            renderItem={(todo) => (
                <List.Item>
                    <Todo todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
                </List.Item>
            )}
        />
    )
}

export default TodoList;