import React from 'react';
import {Route, withRouter} from 'react-router-dom';

import ToDo from './routes/todo/basic/index';

import {isIOS, isMobile} from 'react-device-detect';

class MainApp extends React.Component {
    onToggleCollapsedNav = (e) => {
        const val = !this.props.navCollapsed;
        this.props.toggleCollapsedNav(val);
    };

    render() {
        const {match} = this.props;
        const drawerStyle = "fixed-drawer";

        //set default height and overflow for iOS mobile Safari 10+ support.
        if (isIOS && isMobile) {
            $('#body').addClass('ios-mobile-view-height')
        }
        else if ($('#body').hasClass('ios-mobile-view-height')) {
            $('#body').removeClass('ios-mobile-view-height')
        }

        return (
            <div className={`app-container ${drawerStyle}`}>
                <div className="app-main-container">
                    <main className="app-main-content-wrapper">
                        <div className="app-main-content">
                            <Route path={`${match.url}/to-do`} component={ToDo}/>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default MainApp;