import React, { Component } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import Input from 'material-ui/Input';
import 'jquery-slimscroll/jquery.slimscroll.min';
import filters from '../data/filters';
import ToDoList from 'components/todo/ToDoList';

class ToDo extends Component {
    id = 0;
    statusAll = "active";

    getAllTodo = () => {
        let toDos = this.state.allToDos.map((todo) => todo ? {
            ...todo,
            selected: true
        } : todo);
        this.setState({
            selectedToDos: toDos.length,
            allToDos: toDos,
            toDos: toDos
        });
    };
    getUnselectedAllTodo = () => {
        let toDos = this.state.allToDos.map((todo) => todo ? {
            ...todo,
            selected: false
        } : todo);
        this.setState({
            selectedToDos: 0,
            allToDos: toDos,
            toDos: toDos
        });
    };
    handleRequestClose = () => {
        this.setState({ showMessage: false, addTodo: false, labelMenuState: false, optionMenuState: false });
    };

    getNavFilters = () => {
        return filters.map((filter, index) =>
            <li key={index} onClick={() => {
                const filterMails = this.state.allToDos.filter(todo => {
                    if (filter.id === 1 && todo.selected) {
                        return todo;
                    } else if (filter.id === 2 && !todo.selected) {
                        return todo;
                    } else if (filter.id === 0) {
                        return todo;
                    }
                });
                this.setState({
                    loader: true,
                    currentTodo: null,
                    filter: filter.id,
                    toDos: filterMails
                });
                setTimeout(() => {
                    this.setState({ loader: false });
                }, 1500);
            }
            }>
                <a href="javascript:void(0)" className={filter.id === this.state.selectedSectionId ? 'active' : ''}>
                    <i className={`zmdi zmdi-${filter.icon}`} />
                    <span>{filter.title}</span>
                </a>
            </li>
        )
    };
    ToDoSideBar = () => {
        return <div className="module-side">
            <div className="module-side-header">
                <div className="module-logo mb-4">
                    <i className="zmdi zmdi-email mr-4" />
                    <span>Todo App</span>
                </div>

                <div className="user-detail d-flex flex-row mb-3">
                    <img className="rounded-circle size-40" alt={this.state.user.name}
                        src={this.state.user.avatar} />
                    <div className="module-user-info mx-2 mt-1 mb-0  ">
                        <div className="module-title">
                            <h5 className="mb-0 text-white">{this.state.user.name}</h5></div>
                        <div className="module-user-detail">
                            <a href="javascript:void(0)"
                                className="text-white">{this.state.user.email}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="module-side-content">
                <div className="module-side-scroll">
                    <ul className="module-nav">

                        <li onClick={() => {
                            this.onAllTodoSelect();
                        }
                        }>
                            <a href="javascript:void(0)">
                                <i className="zmdi zmdi-menu" />
                                <span>Toggle All</span>
                            </a>
                        </li>

                        <li className="module-nav-label">
                            Filters
                        </li>

                        {this.getNavFilters()}
                    </ul>
                </div>
            </div>
        </div>
    };
    showToDos = ({ currentTodo, toDos, conversation, user }) => {
        return <ToDoList toDos={toDos} onSortEnd={this.onSortEnd}
                onTodoDelete={this.onTodoDelete.bind(this)}
                onTodoChecked={this.onTodoChecked.bind(this)} />;
    };

    constructor() {
        super();
        this.state = {
            alertMessage: '',
            width: 1200,
            loader: false,
            showMessage: false,
            drawerState: false,
            anchorEl: null,
            allToDos: [],
            currentTodo: null,
            todoTitle: '',
            user: {
                name: 'Minh Tra',
                email: 'trahongminh@gmail.com',
                avatar: 'http://via.placeholder.com/256x256'
            },
            selectedToDos: 0,
            labelMenuState: false,
            optionMenuState: false,
            toDos: [],
            filter: -1,
            conversation: null
        }
    }

    componentDidMount() {
        this.manageHeight();
    }

    componentDidUpdate() {
        this.manageHeight();
    }

    onTodoChecked(data) {
        data.selected = !data.selected;
        let selectedToDos = 0;
        const toDos = this.state.toDos.map(todo => {
            if (todo.selected) {
                selectedToDos++;
            }
            if (todo.id === data.id) {
                if (todo.selected) {
                    selectedToDos++;
                }
                return data;
            } else {
                return todo;
            }
        }
        );
        this.setState({
            selectedToDos: selectedToDos,
            toDos: toDos
        });
    }

    onTodoDelete(data) {
        let selectedToDos = this.state.selectedToDos || 0;
        let toDos = this.state.allToDos;
        for (let i = 0; i < this.state.toDos.length; i++) {
            if (toDos[i].id == data.id) {
                if (toDos[i].selected) {
                    selectedToDos--;
                }
                toDos.splice(i, 1);
                break;
            }
        }

        this.setState({
            selectedToDos: selectedToDos,
            allToDos: toDos,
            toDos: toDos
        });
    }

    onAllTodoSelect() {
        if (this.statusAll == "active") {
            this.getAllTodo();
            this.statusAll = "done";
        } else {
            this.getUnselectedAllTodo();
            this.statusAll = "active";
        }
    }

    onTodoAdd(data) {
        this.setState(
            {
                toDos: this.state.toDos.concat(data),
                allToDos: this.state.allToDos.concat(data)
            }
        );
    }

    manageHeight() {
        const $body = $('#body');
        window.addEventListener("resize", () => {
            if ($body.width() >= 1200) {
                if (this.state.width !== 1200) {
                    this.setState({ width: 1200 })
                }
            }
            else if ($body.width() >= 992) {
                if (this.state.width !== 992) {
                    this.setState({ width: 992 })
                }
            }
            else if ($body.width() >= 768) {
                if (this.state.width !== 768) {
                    this.setState({ width: 768 })
                }
            }
            else if ($body.width() >= 576) {
                if (this.state.width !== 576) {
                    this.setState({ width: 576 })
                }
            }
            else if ($body.width() >= 0) {
                if (this.state.width !== 0) {
                    this.setState({ width: 0 })
                }
            }

        });

        if ($body.width() >= 1200) {
            $('.loader-view').slimscroll({
                height: 'calc(100vh - 321px)'
            });
            if (this.state.currentTodo === null) {
                $('.module-list-scroll').slimscroll({
                    height: 'calc(100vh - 321px)'
                });
            } else {
                $('.module-list-scroll').slimscroll({
                    height: 'calc(100vh - 382px)'
                });
            }
            $('.module-side-scroll').slimscroll({
                height: 'calc(100vh - 323px)'
            });
        } else if ($body.width() >= 992) {
            $('.loader-view').slimscroll({
                height: 'calc(100vh - 335px)'
            });
            if (this.state.currentTodo === null) {
                $('.module-list-scroll').slimscroll({
                    height: 'calc(100vh - 335px)'
                });
            } else {
                $('.module-list-scroll').slimscroll({
                    height: 'calc(100vh - 394px)'
                });
            }
            $('.module-side-scroll').slimscroll({
                height: 'calc(100vh - 165px)'
            });
        } else {
            $('.loader-view').slimscroll({
                height: 'calc(100vh - 300px)'
            });
            if (this.state.currentTodo === null) {
                $('.module-list-scroll').slimscroll({
                    height: 'calc(100vh - 300px)'
                });
            } else {
                $('.module-list-scroll').slimscroll({
                    height: 'calc(100vh - 360px)'
                });
            }
            $('.module-side-scroll').slimscroll({
                height: 'calc(100vh - 165px)'
            });
        }
    }

    removeLabel(todo, label) {
        todo.labels.splice(todo.labels.indexOf(label), 1);
        return todo.labels;
    }

    addLabel(todo, label) {
        todo.labels = todo.labels.concat(label);
        return todo.labels
    }

    onToggleDrawer() {
        this.setState({
            drawerState: !this.state.drawerState
        });
    }

    render() {
        return (
            <div className="app-wrapper">
                <div className="animated slideInUpTiny animation-duration-3">
                    <div className="app-module">
                        <div className="app-module-sidenav d-none d-xl-flex">
                            {this.ToDoSideBar()}
                        </div>

                        <div className="module-box">
                            <div className="module-box-content">
                                <div className="module-box-topbar">
                                    <Input
                                        fullWidth
                                        className="task-title"
                                        id="required"
                                        placeholder="Enter todo name here"
                                        onKeyUp={(event) => {
                                            if (event.key == 'Enter' &&
                                                event.target.value != null && event.target.value.length) {
                                                this.onTodoAdd({ id: this.id++, title: event.target.value, selected: false });

                                                event.target.value = "";
                                            }
                                        }}
                                    />

                                    <div classID="toolbar-separator"></div>
                                </div>

                                {this.showToDos(this.state)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ToDo;