import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

const ToDoItem = SortableElement(({ todo, onTodoChecked, onTodoDelete }) => {
    return (
        <div className="module-list-item">
            <Checkbox
                checked={todo.selected}
                onClick={(event) => {
                    // event.stopPropagation();
                    onTodoChecked(todo);
                }}
                value="SelectTodo"
            />

            <div className="module-list-info">
                <div className="row">
                    <div className="module-todo-content">
                        <div className="subject">
                            {todo.title}
                        </div>
                    </div>
                    <div className="module-todo-right">
                        <div className="d-flex flex-row-reverse">
                            <Button variant="raised" color="primary" onClick={(event) => {
                                onTodoDelete(todo);
                            }}>X</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
});

export default ToDoItem;