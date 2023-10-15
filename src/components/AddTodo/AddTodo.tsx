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
        <>
            <Space.Compact direction='horizontal' size='large' style={{width: '100%', marginBottom: '10px', height: '50px'}}>
                <Input placeholder="Enter todo text" value={text} onChange={changeText} style={{fontSize: '1.2rem'}}/>
                <Button type='primary' htmlType='submit' onClick={submit} style={{height: '100%'}}>
                    Add todo
                </Button>
            </Space.Compact>
            <div style={{ position: 'relative', height: '30px', textAlign: 'center' }}>
                {
                    error && <p style={{ color: 'red' }}>Enter todo text</p>
                }
            </div>
        </>
    )
}

export default AddTodo;