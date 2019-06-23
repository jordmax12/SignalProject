import React from 'react';
import AddNotification from '../components/addNotification.jsx';
import moment from 'moment';

const defaults = {
    name: '',
    message: '',
    link: '',
    type: '',
    created: moment().format('MM/DD/YYYY HH:mm'),
    id: ''
}

class Detail extends React.Component {
    constructor(props) {
        super(props);
        defaults['id'] = props.match.params.id;
        this.state = defaults;        
    }

    componentDidMount() {
        this.getDetailById();
    }

    inputHandler = (prop, value) => this.setState({ [prop]: value });

    deleteNotification = () => {
        const { id } = this.state;
        let data = {
            id
        }

        fetch('/api/deleteNotification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(r => r.json())
            .then(results => {
                if(!results.error)
                {
                    this.setState({ isLoading: false })
                    alert('Success!')
                } else {
                    alert(results.error)
                }
            })
    }

    updateNotification = () => {
        const { name, message, link, type, created, id } = this.state;
        let data = {
            name, message, link, type, created: moment(created).toISOString()
        }

        data["id"] = id;

        fetch('/api/updateNotification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(r => r.json())
            .then(results => {
                if(!results.error)
                {
                    this.setState({ isLoading: false })
                    alert('Success!')
                } else {
                    alert(results.error)
                }
            })
    }

    getDetailById = () => {
        const { id } = this.state;
        fetch('/api/getNotification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
            .then(r => r.json())
            .then(results => {
                if(results.error) alert(results.error)
                else {
                    const { name, message, link, type, created } = results.data;
                    console.log(created, moment(created));
                    this.setState({ name, message, link, type, created: moment(created).format('MM/DD/YYYY HH:mm') })
                }
            })
    }

    render() {
        const { created, id, name, message, type, link } = this.state;
        return (
            <div className="tac">
                Edit Notification {id}
                <AddNotification edit={true} inputHandler={this.inputHandler} updateNotification={this.updateNotification} deleteNotification={this.deleteNotification} created={created} id={id} name={name} message={message} link={link} type={type} />
            </div>
        )
    }
}

export default Detail;