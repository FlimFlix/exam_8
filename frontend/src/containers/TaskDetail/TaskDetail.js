import React, {Component} from 'react'
import {TASKS_URL} from "../../api-urls";
import {NavLink} from "react-router-dom";
import axios from 'axios';
import DatePicker from "react-datepicker";
import Select from 'react-select';


class TaskDetail extends Component {
    state = {
        task: null
    };

    componentDidMount() {
        const match = this.props.match;

        axios.get(TASKS_URL + match.params.id)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(task => this.setState({task}))
            .catch(error => console.log(error));
    }

    updateTaskState = (fieldName, value) => {
        console.log(value);
        this.setState(prevState => {
            let newState = {...prevState};
            let task = {...prevState.task};
            task[fieldName] = value;
            newState.task = task;
            return newState;
        });
    };

    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateTaskState(fieldName, value);
    };

    dateChanged = (field, date) => {
        this.updateTaskState(field, date.toISOString());
    };


    formSubmitted = (event) => {
        event.preventDefault();

        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitDisabled = true;
            return newState;
        });

        axios.put(TASKS_URL + this.state.task.id + '/', this.state.task)
            .then(response => {
                console.log(response.data);
                if (response.status === 200) return response.data;
                throw new Error('Task was not created');
            })
            .then(task => this.props.history.replace('/tasks/'))
            .catch(error => {
                console.log(error);
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.alert = {type: 'danger', message: `Task was not added!`};
                    newState.submitDisabled = false;
                    return newState;
                });
            });
    };

    render() {
        if (!this.state.task) return null;

        const {summary, description, due_date, time_planned} = this.state.task;

        const due_date_selected = due_date ? new Date(due_date) : null;

        const select_options = [{value: 'turn', label: 'В очереди'},
            {value: 'underway', label: 'В работе'},
            {value: 'done', label: 'Сделано'}];


        return <div className='container'>

            <NavLink to='' className="btn btn-primary">Tasks</NavLink>
            <form onSubmit={this.formSubmitted}>
                <div className="form-group">
                    <label className="font-weight-bold">Задача</label>
                    <input type="text" className="form-control" name="summary" value={summary}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label>Описание</label>
                    <input type="text" className="form-control" name="description" value={description}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label className="font-weight-bold">Срок выполнения задачи</label>
                        <DatePicker dateFormat="yyyy-MM-dd HH-MM-SS" selected={due_date_selected}
                                    className="form-control" showTimeSelect
                                    name="due_date" onChange={(date) => this.dateChanged('due_date', date)}/>
                </div>
                <div className="form-group">
                    <label>Планируемое время</label>
                    <input type="number" className="form-control" name="time_planned" value={time_planned}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label>Статус</label>
                    <Select options={select_options} name='status' value={this.state.task.label}
                            onChange={(value) => this.updateTaskState('status', value.value)}/>
                </div>

                <button disabled={this.state.submitDisabled} type="submit"
                        className="btn btn-primary">Сохранить
                </button>
            </form>
        </div>;
    }
}


export default TaskDetail;