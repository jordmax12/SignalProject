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
        console.log(props);
        defaults['id'] = props.match.params.id;
        this.state = defaults;
    }

    inputHandler = (prop, value) => this.setState({ [prop]: value });

    updateNotification = () => {

    }

    deleteNotification = () => {
        
    }

    render() {
        const { created, id } = this.state;
        return (
            <div className="tac">
                Edit Notification {id}
                <AddNotification edit={true} inputHandler={this.inputHandler} updateNotification={this.updateNotification} deleteNotification={this.deleteNotification} created={created} />
            </div>
        )
    }
}

export default Detail;