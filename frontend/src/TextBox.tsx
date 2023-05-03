import React, { useState } from 'react';

type Props = {
    value: string;
    onChange: (value: string) => void;
    onSend: (alue: string) => void;
}

const TextFieldWithSendButton: React.FC<Props> = ({ value, onChange, onSend }) => {
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        if (onChange)
            onChange(value);
    };

    const handleSend = () => {
        onSend(inputValue);
        setInputValue('');
    };

    return (

        <div className="text-field-with-send-button-input-container">

            <textarea type="text" value={inputValue} onChange={handleChange} rows="3" cols="50" />
            <button onClick={handleSend}>Send</button>
        </div>

    );
};

export default TextFieldWithSendButton;
