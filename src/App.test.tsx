import './test/__mocks__/jestGlobalMocks';
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "./App";


function creaeListOfTodos(todos: string[], input: HTMLInputElement, btn: HTMLButtonElement) {
    for (let todo of todos) {
        fireEvent.change(input, { target: { value: todo } });
        fireEvent.click(btn);
    }
}

function setCompletedFirstTodo() {
    const toggleFirstTodoBtn: HTMLInputElement = screen.getAllByRole('checkbox')[0] as HTMLInputElement;
    fireEvent.click(toggleFirstTodoBtn); // isCompleted: true
}

describe('App testing', () => {
    beforeEach(() => {
        render(<App />)
        const todos: string[] = ['text_1', 'text_2', 'text_3']

        const submitBtn = screen.getByText<HTMLButtonElement>('Add todo');
        const input = screen.getByPlaceholderText<HTMLInputElement>(/enter todo text/i);
        creaeListOfTodos(todos, input, submitBtn);
    });

    test('Filters buttons display correct', () => {
        const filterAllBtn = screen.getByText('All');
        const filterActiveBtn = screen.getByText('Active');
        const filterCompletedBtn = screen.getByText('Completed');

        expect(filterAllBtn).toBeInTheDocument();
        expect(filterActiveBtn).toBeInTheDocument();
        expect(filterCompletedBtn).toBeInTheDocument();
    });

    test('Should display todos, that has been added', () => {
        const todos = screen.getAllByText(/text_./);
        expect(todos.length).toBe(3);
    })

    test('Should display "all" todos on startup', () => {
        setCompletedFirstTodo();

        expect(screen.queryAllByText(/text_./).length).toBe(3);
    })

    test('Should display correct todos after switching filters', () => {
        setCompletedFirstTodo();

        const filterActiveBtn = screen.getByText('Active');
        const filterCompletedBtn = screen.getByText('Completed');
        const filterAllBtn = screen.getByText('All');

        fireEvent.click(filterActiveBtn);
        expect(screen.queryAllByText(/text_./).length).toBe(2);
        expect(screen.queryByText(/text_1/)).not.toBeTruthy();

        fireEvent.click(filterCompletedBtn);
        expect(screen.queryAllByText(/text_./).length).toBe(1);
        expect(screen.queryByText(/text_1/)).toBeTruthy();

        fireEvent.click(filterAllBtn);
        expect(screen.queryAllByText(/text_./).length).toBe(3);
    });

    test('Should remove completed todo from completedTodo list if unchecked todo ', () => {
        const toggleFirstTodoBtn: HTMLInputElement = screen.getAllByRole('checkbox')[0] as HTMLInputElement;
        fireEvent.click(toggleFirstTodoBtn); // isCompleted: true

        const filterCompletedBtn = screen.getByText('Completed');
        fireEvent.click(filterCompletedBtn);

        expect(screen.queryAllByText(/text_./).length).toBe(1);

        fireEvent.click(toggleFirstTodoBtn); // isCompleted: true

        expect(screen.queryAllByText(/text_./).length).toBe(0);
    });

    test('Should display "clear completed" button', () => {
        expect(screen.getByText(/clear completed/i)).toBeInTheDocument();
    })

    test('Should clear completed todos on click "clear todo" button', () => {
        setCompletedFirstTodo();

        const clearCompleteBtn = screen.getByText(/clear completed/i);
        fireEvent.click(clearCompleteBtn);

        expect(screen.queryAllByText(/text_./).length).toBe(2);
    })

});