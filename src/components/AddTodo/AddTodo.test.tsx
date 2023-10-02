import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import '../../test/__mocks__/jestGlobalMocks';
import AddTodo from './AddTodo';

function changeAndSubmit(inputEl: HTMLInputElement, submitBtn: HTMLButtonElement, text: string) {
    fireEvent.change(inputEl, { target: { value: text } });
    fireEvent.click(submitBtn);
}

describe('AddTodo functionality', () => {
    const addTodo = jest.fn();
    let submitBtn: HTMLButtonElement;
    let input: HTMLInputElement;

    beforeEach(() => {
        render(<AddTodo addTodo={addTodo} />);
        submitBtn = screen.getByRole('button');
        input = screen.getByPlaceholderText(/enter todo text/i);
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    describe('Input text', () => {
        it('Should render input and submit button', () => {
            expect(submitBtn).toBeInTheDocument();
            expect(input).toBeInTheDocument();
        });

        it('Input should change value after writing text', () => {
            const text = 'Create app';
            fireEvent.change(input, { target: { value: text } });
            expect(input.value).toBe(text);
        });

        it('Should clear input text, after submitting adding todo', () => {
            const text = 'Create app';
            changeAndSubmit(input, submitBtn, text);
            expect(input.value).toBe('');
        });
    });

    describe('Error message', () => {
        let errMsg: HTMLParagraphElement | null;

        beforeEach(() => {
            errMsg = screen.queryByText(/enter todo text/i);
        });

        it('Should not be diplayed on page load', () => {
            expect(errMsg).not.toBeTruthy();
        });

        it('Should not be displayed on submiting text', () => {
            changeAndSubmit(input, submitBtn, 'text');
            errMsg = screen.queryByText(/enter todo text/i);
            expect(errMsg).not.toBeTruthy();
        });

        it('Should be displayed on submiting empty text', () => {
            fireEvent.click(submitBtn);
            errMsg = screen.queryByText(/enter todo text/i);
            expect(errMsg).toBeTruthy();
        });

        it('Should be displayed on submiting text of whitespaces', () => {
            changeAndSubmit(input, submitBtn, '   ');
            errMsg = screen.queryByText(/enter todo text/i);
            expect(errMsg).toBeTruthy();
        });

        it('Should disappear when enter text', () => {
            fireEvent.click(submitBtn); // Show error message
            errMsg = screen.queryByText(/enter todo text/i);
            fireEvent.change(input, { target: { value: 'a' } });
            errMsg = screen.queryByText(/enter todo text/i);
            expect(errMsg).not.toBeTruthy();
        });

    });

    it('Should call "addTodo" function on submit when input has text', () => {
        changeAndSubmit(input, submitBtn, 'text');
        expect(addTodo).toBeCalledTimes(1);
    });

    it('Should not call "addTodo" function on submit when input is empty', () => {
        changeAndSubmit(input, submitBtn, 'text');
        expect(addTodo).toBeCalledTimes(1);
    })

});