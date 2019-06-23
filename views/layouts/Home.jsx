import React from 'react';
import { Button, Card } from 'semantic-ui-react'
import moment from 'moment';
import { Link } from 'react-router-dom';

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

        if (start) data['start'] = start;
        if (end) data['end'] = end;

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
        // {"id":"test-nkw2jg",
        // "name":"Test",
        // "message":"This should be on 6/22 at 18:26",
        // "link":"https://google.com",
        // "type":"Test",
        // "created":"2019-06-23T04:26:00.000Z"
        // }
        return (
            isLoading
                ? <div> Loading </div>
                : (
                    results.length > 0
                        ?
                        <React.Fragment>
                            <div className="title">

                            </div>
                            <div className="filter">

                            </div>
                            <div className="resultsHolder mtb25">
                                {
                                    results.map(row =>
                                        (
                                            <Card className="mrmla" key={row.id}>
                                                <Card.Content>
                                                    <Card.Header> {`[${row.type}] ${row.name}`}  <span style={{float: 'right', fontSize: '12px'}}><Link to={`/detail/${row.id}`}>edit</Link></span> </Card.Header>
                                                    <Card.Meta> {row.id} </Card.Meta>
                                                    <Card.Description> {row.message} { row.link ? <a href={row.link} target="__blank">Click here to view</a> : null} </Card.Description>
                                                </Card.Content>
                                                <Card.Content extra>
                                                    <p>{moment(row.created).format('MM/DD/YYYY h:mm')}</p>
                                                </Card.Content>
                                            </Card>
                                        )
                                    )
                                }
                            </div>
                        </React.Fragment>
                        : <div> No Results </div>
                )
        )
    }
}

export default Home;