import React from 'react';
import { Button, Card, Grid, Input } from 'semantic-ui-react'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { DateTimeInput } from 'semantic-ui-calendar-react';

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

        if (start) data['start'] = moment(start).toISOString();
        if (end) data['end'] = moment(end).toISOString();
        this.setState({ isLoading: true })

        fetch('/api/getNotifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(r => r.json())
            .then(results => {
                if(results.error) alert(results.error);
                else this.setState({ results: results.data, isLoading: false })
            })
    }

    handleDateChange = (e, { name, value }) => this.setState({ [name]: value }, () => {
        this.getNotifications();
    });

    render() {
        const { results, isLoading, start, end } = this.state;

        return (
            isLoading
                ? <div className="mrmla tac"> Loading </div>
                : (
                    <React.Fragment>
                        <div className="title tac ptb25">
                            <h1>Signal Notification Hub</h1>
                        </div>
                        <div className="filter ptb25">
                            <div style={{ maxWidth: '500px' }} className="mrmla tac">
                                <h3>Filter on Date(s)</h3>
                                <Grid className="mt10">
                                    <div className="gridItemHalf">
                                        <DateTimeInput
                                            name="start"
                                            timeFormat="24"
                                            dateTimeFormat="MM/DD/YYYY HH:mm"
                                            value={start}
                                            onChange={this.handleDateChange}
                                        />
                                    </div>
                                    <div className="gridItemHalf">
                                        <DateTimeInput
                                            name="end"
                                            timeFormat="24"
                                            dateTimeFormat="MM/DD/YYYY HH:mm"
                                            value={end}
                                            onChange={this.handleDateChange}
                                        />
                                    </div>
                                </Grid>
                            </div>
                        </div>
                        {
                            results.length > 0
                                ?
                                <div className="resultsHolder ptb25">
                                    {
                                        results.map(row =>
                                            (
                                                <Card className="mrmla" key={row.id}>
                                                    <Card.Content>
                                                        <Card.Header> {`[${row.type}] ${row.name}`}  <span style={{ float: 'right', fontSize: '12px' }}><Link to={`/detail/${row.id}`}>edit</Link></span> </Card.Header>
                                                        <Card.Meta> {row.id} </Card.Meta>
                                                        <Card.Description> {row.message} {row.link ? <a href={row.link} target="__blank">Click here to view</a> : null} </Card.Description>
                                                    </Card.Content>
                                                    <Card.Content extra>
                                                        <p>{moment(row.created).format('MM/DD/YYYY h:mm')}</p>
                                                    </Card.Content>
                                                </Card>
                                            )
                                        )
                                    }
                                </div>

                                : <div className="tac"> No Results </div>
                        }
                    </React.Fragment>
                )

        )
    }
}

export default Home;