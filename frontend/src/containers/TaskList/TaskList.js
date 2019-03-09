import React, {Fragment, Component} from 'react'
import {TASKS_URL} from "../../api-urls";
import TaskCard from "../../components/TaskCard/TaskCard";
import {NavLink} from "react-router-dom";
import axios from 'axios';


class TaskList extends Component {
    state = {
        tasks: [],
    };

    componentDidMount() {
        axios.get(TASKS_URL)
            .then(response => {console.log(response.data); return response.data;})
            .then(tasks => this.setState({tasks}))
            .catch(error => console.log(error));
    }

    render() {
        return <Fragment>
            <p><NavLink to='/tasks/add'>Добавить задачу</NavLink></p>
            <div className='row'>
                <div className='col-md'>
                    {this.state.tasks.map(task => {
                        if (task.status === 'turn') {
                            return <div key={task.id}>
                                <TaskCard task={task}/>
                            </div>
                        }
                    })}
                </div>
                <div className='col-md'>
                    {this.state.tasks.map(task => {
                        if (task.status === 'underway') {
                            return <div key={task.id}>
                                <TaskCard task={task}/>
                            </div>
                        }
                    })}
                </div>
                <div className='col-md'>
                    {this.state.tasks.map(task => {
                        if (task.status === 'done') {
                            return <div key={task.id}>
                                <TaskCard task={task}/>
                            </div>
                        }
                    })}
                </div>

            </div>
        </Fragment>
    }
}

export default TaskList;