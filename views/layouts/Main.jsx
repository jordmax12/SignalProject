import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Home from './Home.jsx';
import Create from './Create.jsx';
import Detail from './Detail.jsx';

const defaults = {
}

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = defaults;
    }

    render() {
        return (
            <div>
                <div id="header">
                    <div className="mt10">
                        <Link style={{ padding: '10px'}} to="/">Home</Link>
                        <Link style={{ padding: '10px'}} to="/create">Create Notification</Link>
                    </div>
                </div>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/create" component={Create} />
                        <Route path="/detail/:id" component={Detail} />
                    </Switch>
                </div>

            </div>

        )
    }
}

export default Main;