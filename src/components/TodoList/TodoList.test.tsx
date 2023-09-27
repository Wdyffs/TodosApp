import { render, screen } from "@testing-library/react";
import '../../test/__mocks__/jestGlobalMocks';
import TodoList from "./TodoList";
import { ITodo } from "../../models/todo.mode";

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
]

const toggleTodo = jest.fn();
const deleteTodo = jest.fn();

describe('Todo List', () => {
    it('Should display right number of items', () => {
        render(<TodoList list={mockTodoList} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>);
        const todos = screen.getAllByText(/todo/);
        expect(todos.length).toBe(4);
        expect(1).toBe(1)
    });
})