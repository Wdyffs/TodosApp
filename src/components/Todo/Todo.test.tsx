import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todo from "./Todo"
import { ITodo } from '../../models/todo.mode';

const mockTodo: ITodo = {
    id: '1xe',
    text: 'Create a Project',
    isCompleted: false
}

const toggleTodo = jest.fn();
const deleteTodo = jest.fn();

describe('Todo item', () => {
    let rerenderRef: (ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>) => void;

    beforeEach(() => {
        const {rerender} = render(<Todo todo={mockTodo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />);
        rerenderRef =  rerender;
    })

    it('Should display todo text', () => {
        const text = screen.getByText(mockTodo.text);
        expect(text).toBeInTheDocument();
    });

    it('Toggle function is called, when checkbox toggles', () => {
        const checkbox: HTMLInputElement = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(toggleTodo).toBeCalledTimes(1);
    });

    it('Delete function is called, when delete button is pressed', () => {
        const delBtn: HTMLButtonElement = screen.getByRole('button');
        fireEvent.click(delBtn);
        expect(deleteTodo).toBeCalledTimes(1);
    });

    it('Should change checkbox status based on props', () => {
        const checkedTodo: ITodo = {...mockTodo, isCompleted: true };
        rerenderRef(<Todo todo={checkedTodo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />);
        const checkbox: HTMLInputElement = screen.getByRole('checkbox');
        expect(checkbox.checked).toBeTruthy();
    });
})
