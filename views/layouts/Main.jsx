import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Create from './Create.jsx';

const defaults = {
}

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = defaults;
    }
    
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/create" component={Create} />
            </Switch>
        )
    }
}

export default Main;