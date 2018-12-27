import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import ToDoItem from "./ToDoItem";

const ToDoList = SortableContainer(({toDos, onTodoChecked, onTodoDelete}) => {
    return (
        <div className="module-list">
            <div className="module-list-scroll">
                {toDos.map((todo, index) =>
                    <ToDoItem key={index} index={index} todo={todo} onTodoDelete={onTodoDelete}
                              onTodoChecked={onTodoChecked}/>
                )}
            </div>
        </div>
    )
});

export default ToDoList;