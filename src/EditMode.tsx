import { TextField } from '@mui/material';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type EditModePropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditMode(props: EditModePropsType) {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")
    const activatedEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activatedViveMode = () => {
        setEditMode(false)
        props.onChange(title)

    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (editMode
        ? <TextField
            onBlur={activatedViveMode}
            autoFocus
            value={title}
            onChange={onChangeTitleHandler}
            variant='standard'
        />
        : <span onDoubleClick={activatedEditMode} className='float_left'>
            {props.title}
        </span>

    )
}