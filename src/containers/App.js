import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { Redirect, Route } from 'react-router-dom';
import MainApp from '../app/index';
import '../styles/styles.css'
import indigoTheme from './themes/indigoTheme';

class App extends Component {

    render() {
        const { match, location } = this.props;

        let applyTheme = createMuiTheme(indigoTheme);

        if (location.pathname === '/') {
            return (<Redirect to={'/app/to-do'} />);
        }
        return (
            <MuiThemeProvider theme={applyTheme}>
                <div className="app-main">
                    <Route path={`${match.url}app`} component={MainApp} />
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = ({ settings }) => {
    return { settings }
};

export default App;
