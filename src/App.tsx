import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';

export type FilterValuesType = "all" | "active" | "complete";

type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()
    let todolistId3 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            { id: todolistId1, title: "what to learn", filter: "all" },
            { id: todolistId2, title: "what to buy", filter: "all" },
            { id: todolistId3, title: "what to complite", filter: "all" }
        ]
    )

    let [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todolistId1]:
            [
                { id: v1(), title: "HTML&CSS", isDone: true },
                { id: v1(), title: "JS", isDone: true },
                { id: v1(), title: "ReactJS", isDone: false },
                { id: v1(), title: "Rest API", isDone: false },
                { id: v1(), title: "GraphQL", isDone: false }
            ],
        [todolistId2]:
            [
                { id: v1(), title: "VUE", isDone: true },
                { id: v1(), title: "Angular", isDone: true },
            ],
        [todolistId3]:
            [
                { id: v1(), title: "front-endd", isDone: true },
                { id: v1(), title: "Back-end", isDone: true },
                { id: v1(), title: "Architecture", isDone: false },
            ],
    });

    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let filteredTasksObj = tasks.filter(t => t.id != id);
        tasksObj[todoListId] = filteredTasksObj
        setTasksObj({ ...tasksObj });
    }

    function addTask(title: string, todoListId: string) {
        let task = { id: v1(), title: title, isDone: false };
        let tasks = tasksObj[todoListId]

        let newTasksObj = [task, ...tasks];
        tasksObj[todoListId] = newTasksObj
        setTasksObj({ ...tasksObj });
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasksObj({ ...tasksObj });
        }
    }
    function changeTitle(taskId: string, newTitle: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
            setTasksObj({ ...tasksObj });
        }
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todolist = todolists.find(tl => tl.id === todoListId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter((el) => el.id !== id))
        delete tasksObj[id]
        setTasksObj({ ...tasksObj })
    }

    function addTodolist(title: string) {
        let todolist: TodolistsType = {
            id: v1(),
            filter: "all",
            title: title
        }
        setTodolists([todolist, ...todolists])
        setTasksObj({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    function changeTodolistTitle(id: string, title: string) {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = title
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: "15px" }}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map(tl => {
                        let tasksForTodolistObj = tasksObj[tl.id];

                        if (tl.filter === "active") {
                            tasksForTodolistObj = tasksForTodolistObj.filter(t => t.isDone === false);
                        }
                        if (tl.filter === "complete") {
                            tasksForTodolistObj = tasksForTodolistObj.filter(t => t.isDone === true);
                        }
                        return <Grid item>
                            <Paper style={{ padding: "15px" }}>
                                <Todolist
                                    id={tl.id}
                                    key={tl.id}
                                    title={tl.title}
                                    tasksObj={tasksForTodolistObj}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTitle}
                                    changeTodolistTitel={changeTodolistTitle}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}
export default App;
