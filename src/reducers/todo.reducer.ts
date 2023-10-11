import { v4 as uuidv4 } from 'uuid';
import { ITodo } from '../models/todo.model';

export enum ETodoAction {
    ADD_TODO = 'add_todo',
    REMOVE_TODO = 'remove_todo',
    TOGGLE_TODO = 'toggle_todo',

    SET_ACTIVE_FILTER = 'set_active_filter',
    SET_ALL_FILTER = 'set_all_filter',
    SET_COMPLETED_FILTER = 'set_completed_filter'
}

type Filter = 'all' | 'active' | 'completed';

interface ITodoAction {
    type: ETodoAction,
    payload?: string;
}

export interface ITodosState {
    todos: ITodo[];
    filter: Filter;
}

export const todosReducer = (state: ITodosState, action: ITodoAction) => {
    switch (action.type) {

        case ETodoAction.ADD_TODO:
            const newTodo: ITodo = { id: uuidv4(), text: action.payload!, isCompleted: false };
            return { ...state, todos: [...state.todos, newTodo] };

        case ETodoAction.REMOVE_TODO:
            return { ...state, todos: state.todos.filter(todo => todo.id != action.payload) };

        case ETodoAction.TOGGLE_TODO:
            return {
                ...state, todos: state.todos.map(todo => {
                    const toggledTodo = { ...todo };
                    if (todo.id == action.payload) {
                        toggledTodo.isCompleted = !todo.isCompleted;
                    }
                    return toggledTodo;
                })
            };

        case ETodoAction.SET_ACTIVE_FILTER:
            if (state.filter == 'active') return state;
            return { ...state, filter: 'active' as const };

        case ETodoAction.SET_ALL_FILTER:
            if (state.filter == 'all') return state;
            return { ...state, filter: 'all' as const };

        case ETodoAction.SET_COMPLETED_FILTER:
            if (state.filter == 'completed') return state;
            return { ...state, filter: 'completed' as const };

        default:
            return state;
    }
}