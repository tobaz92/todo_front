import { SharedApi } from 'api/SharedApi'
import { TodoApi } from 'api/TodoApi'
import {
    setTodoList,
    addTodoList,
    updateTodoList,
    filterTodoList,
} from 'application/store/todos-slice'

export const addTodo = async (data) => {
    // DEV
    const userId = data?.userId ?? 1
    const completed = false
    const date = '2023-11-23'

    const values = {
        title: data?.title,
        description: data?.description,
        userId,
        date,
        completed,
    }

    try {
        const response = await TodoApi.addTodo(values)
        if (response.status === 201) {
            const responseData = response.data
            data.dispatch(addTodoList(responseData))
        } else {
            console.log(response)
        }
    } catch (error) {
        console.error('Error adding todo:', error)
    }
}

export const removeTodo = (id) => {
    return TodoApi.deleteTodo(id)
}

// TODO: perd le userid à l'update
export const updateTodo = async (id, data) => {
    try {
        const response = await TodoApi.updateTodo(id, data)
        if (response.status === 201 || response.status === 200) {
            const responseData = response.data
            data.dispatch(updateTodoList(responseData))
        } else {
            console.log(response)
        }
    } catch (error) {
        console.error('Error adding todo:', error)
    }
}

export const updateTempTodo = async (data) => {
    const updatedTodoData = { ...data }
    delete updatedTodoData.dispatch
    data.dispatch(updateTodoList(updatedTodoData))
}

export const getTodos = async (dispatch) => {
    try {
        const listTodos = await TodoApi.getTodos()
        dispatch(setTodoList(listTodos))
    } catch (error) {
        console.log(error)
    }
}

export const getTodosByUser = async (dispatch) => {
    try {
        const listTodos = await TodoApi.getTodos()
        dispatch(setTodoList(listTodos))
    } catch (error) {
        console.log(error)
    }
}

export const getSharedByUser = async (dispatch, userId) => {
    try {
        const listShared = await SharedApi.getShared()
        const listSharedByUser = listShared.filter((shared) =>
            shared.userIds.includes(userId),
        )
        const listIds = listSharedByUser.reduce((acc, shared) => {
            acc.push(...shared.todoIds)
            return acc
        }, [])
        dispatch(filterTodoList(listIds))

        return listSharedByUser
    } catch (error) {
        console.log(error)
    }
}
