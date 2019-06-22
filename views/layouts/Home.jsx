import React from 'react';
import { Button } from 'semantic-ui-react'

const defaults = {
    results: [],
    isLoading: false,
    start: null,
    end: null
}

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = defaults;
    }

    componentDidMount() {
        this.getNotifications();
    }   

    getNotifications = () => {
        const { start, end } = this.state;
        let data = {};

        if(start) data['start'] = start;
        if(end) data['end'] = end;

        this.setState({ isLoading: true })

        fetch('/api/getNotifications', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(data)
        })
        .then(r => r.json())
        .then(results => {
            this.setState({ results: results.data, isLoading: false })
        })
    }

    render() {
        const { results, isLoading } = this.state;
        return (
                isLoading
                ? <div> Loading </div>
                : (
                    results.length > 0
                    ? <div> {JSON.stringify(results)} </div>
                    : <div> No Results </div>
                )        
        )
    }
}

export default Home;