import React from 'react';
import Card from "../UI/Card/Card";

const TaskCard = props => {
    const {task} = props;

    const {summary, description, id} = task;

    const link = {
        text: 'Посмотреть задачу',
        url: '/tasks/' + id
    };

    return <Card header={summary} text={description} link={link}/>;
};


export default TaskCard;