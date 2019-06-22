import React from 'react';
import AddNotification from '../components/addNotification.jsx';

class Create extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Create Notification
                <AddNotification />
            </div>
        )
    }
}

export default Create;