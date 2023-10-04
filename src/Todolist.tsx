import React, { ChangeEvent, useState } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditMode } from './EditMode';
import { Button, Checkbox } from '@mui/material';
import { Delete } from '@mui/icons-material';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasksObj: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    changeTodolistTitel: (id: string, titel: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("complete", props.id);
    const onRemoveTaskHandler = (id: string) => props.removeTodolist(id)

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitel = (titel: string) => {
        props.changeTodolistTitel(props.id, titel)
    }

    return <div>
        {/* Interface Todolist*/}
        <Button style={{ float: "right" }} onClick={() => onRemoveTaskHandler(props.id)} >
            <Delete color='action' />
        </Button>
        <h3><EditMode title={props.title} onChange={changeTodolistTitel} /></h3>
        <AddItemForm addItem={addTask} />
        {/* Task Todolist */}
        <ul>
            {
                props.tasksObj.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    }

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            color='secondary'
                            onChange={onChangeStatusHandler}
                            checked={t.isDone} />
                        <EditMode title={t.title} onChange={onChangeTitleHandler} />
                        <Button onClick={onClickHandler} >
                            <Delete color='action' />
                        </Button>
                    </li>
                })

            }
        </ul>
        {/* FILTER */}
        <div>
            <Button color='inherit' variant={props.filter === 'all' ? "contained" : "text"}
                onClick={onAllClickHandler}>All</Button>
            <Button color="primary" variant={props.filter === 'active' ? "contained" : "text"}
                onClick={onActiveClickHandler}>Active</Button>
            <Button color="secondary" variant={props.filter === 'complete' ? "contained" : "text"}
                onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}
