import { Button, IconButton, TextField } from '@mui/material';
import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import ControlPointIcon from '@mui/icons-material/ControlPoint';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (<div>
        <TextField value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={!!error}
            id="standard-basic"
            variant="outlined" 
            label="Введите текст"
            helperText={error ? "Ошибка пустого ввода": ""}
            />
        <div style={{float: "right"}}>
            <IconButton
                onClick={addItem}
                color='primary'
            >
                <ControlPointIcon />
            </IconButton>
        </div>
    </div>
    )
}