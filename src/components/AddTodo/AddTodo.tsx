import { Button, Input, Space } from "antd";
import { ChangeEventHandler, useState } from "react";

type Props = {
    addTodo: (text: string) => void
}

const AddTodo = ({ addTodo }: Props) => {
    const [text, setText] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const submit = () => {
        const isEmpty = !text.trim();
        if (isEmpty) {
            setError(true);
        } else {
            addTodo(text);
        };
        setText('');
    };

    const changeText: ChangeEventHandler<HTMLInputElement> = (e) => {
        setText(e.target.value);
        setError(false);
    };

    return (
        <Space direction='vertical' size='middle'>
            <Space direction='horizontal' size='large'>
                <Input placeholder="Enter todo text" value={text} onChange={changeText} />
                <Button type='primary' htmlType='submit' onClick={submit} >
                    Add todo
                </Button>
            </Space>
            <div style={{ position: 'relative', height: '30px', textAlign: 'center' }}>
                {
                    error && <p style={{ color: 'red' }}>Enter todo text</p>
                }
            </div>
        </Space>
    )
}

export default AddTodo;