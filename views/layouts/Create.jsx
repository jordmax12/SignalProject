import React from 'react';
import AddNotification from '../components/addNotification.jsx';
import moment from 'moment';

const defaults = {
    name: '',
    message: '',
    link: '',
    type: '',
    created: moment().format('MM/DD/YYYY HH:mm')
}

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = defaults;
    }

    createNotification = () => {
        const { name, message, link, type, created } = this.state;
        let _created = moment(created).toISOString();
        fetch('/api/createNotification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                message,
                link,
                type,
                created: _created
            })
        })
        .then(r => r.json())
        .then(results => {
            if(!results.error) console.log('redirect to home page where they can view new notification.')
            else alert(results.error);
        })
    }

    inputHandler = (prop, value) => this.setState({ [prop]: value });

    render() {
        const { created, name, message, link, type } = this.state;
        return (
            <div className="tac">
                Create Notification
                <AddNotification edit={false} inputHandler={this.inputHandler} createNotification={this.createNotification} created={created} deleteNotification={() => null} updateNotification={() => null} created={created} name={name} message={message} link={link} type={type} />
            </div>
        )
    }
}

export default Create;