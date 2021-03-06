import React from 'react';
import { Grid, Input, Button } from 'semantic-ui-react';
import { DateTimeInput } from 'semantic-ui-calendar-react';

class AddNotification extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDateChange = (e, { name, value }) => {
        this.props.inputHandler('created', value);
    }

    render() {
        return (
            <React.Fragment>
                <Grid>
                    <Grid.Column>
                        <div className="w100 mtb15 tac">
                            <Input value={this.props.name} type="text" placeholder="name" onChange={(e) => this.props.inputHandler('name', e.target.value)} />
                        </div>
                        <div className="w100 mtb15 tac">
                            <Input value={this.props.message} type="text" placeholder="message" onChange={(e) => this.props.inputHandler('message', e.target.value)} />
                        </div>
                        <div className="w100 mtb15 tac">
                            <Input value={this.props.type} type="text" placeholder="type" onChange={(e) => this.props.inputHandler('type', e.target.value)} />
                        </div>
                        <div className="w100 mtb15 tac">
                            <Input value={this.props.link} type="text" placeholder="link" onChange={(e) => this.props.inputHandler('link', e.target.value)} />
                        </div>
                        <div className="w100 mtb15 tac">
                            <DateTimeInput
                                name="created"
                                timeFormat="24"
                                dateTimeFormat="MM/DD/YYYY HH:mm"
                                value={this.props.created}
                                onChange={this.handleDateChange}
                            />
                        </div>
                        <div className="w100 mtb15 tac">
                            <Button onClick={() => this.props.edit ? this.props.updateNotification() : this.props.createNotification()}>{this.props.edit ? 'Update' : 'Submit'}</Button>
                            {
                                this.props.edit
                                ? <Button onClick={() => this.props.deleteNotification()}>Delete</Button>
                                : null
                            }
                        </div>
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        )
    }
}

export default AddNotification;