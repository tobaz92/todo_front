import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from 'domain/todo/TodoService'
import { colors, boxShadow } from 'presentation/styles/variables'
import { Button } from './Button'
import * as Icon from 'react-bootstrap-icons'

const TodoUpdate = (props) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [users, setUsers] = useState([])
    const dispatch = useDispatch()
    console.log(props)
    return (
        <div style={containerStyles}>
            <div>
                <input
                    style={inputStyles}
                    id="name"
                    type="text"
                    placeholder="Task name here..."
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
            </div>
            <div>
                <textarea
                    style={inputStyles}
                    id="description"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
            </div>
            <div style={containerFooterActionsStyles}>
                <div style={containerButtonsStyle}>
                    <div>
                        <input
                            id="date"
                            type="date"
                            style={{ display: 'none' }}
                        />
                        <Button
                            onClick={() => {
                                console.log('Due Date')
                            }}
                        >
                            <Icon.Calendar4Event /> <span>Due Date</span>
                        </Button>
                    </div>
                    <div>
                        <input
                            id="user"
                            type="text"
                            style={{ display: 'none' }}
                        />
                        <Button
                            onClick={() => {
                                console.log('Assign To')
                            }}
                        >
                            <Icon.Person /> <span>Assign To</span>
                        </Button>
                    </div>
                </div>
                <div style={containerButtonsStyle}>
                    <div>
                        <Button onClick={() => props.updateVisible()}>
                            Cancel
                        </Button>
                    </div>
                    <div>
                        <Button
                            primary={true}
                            onClick={() => {
                                setTitle('')
                                setDescription('')
                                addTodo({
                                    title,
                                    description,
                                    users,
                                    date,
                                    dispatch,
                                })
                            }}
                        >
                            {props.type.type === 'add' ? 'Add Task' : 'Update'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoUpdate

const containerStyles = {
    position: 'absolute',
    left: '50%',
    bottom: '0',
    width: '110%',
    backgroundColor: colors.white,
    borderRadius: '10px',
    boxShadow: boxShadow,
    padding: '30px',
    transform: 'translate(-50%,70%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
}

const containerButtonsStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.8rem',
}
const inputStyles = {
    width: '100%',
    border: 'none',
    padding: '0.5rem ',
    resize: 'none',
}

const containerFooterActionsStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
}