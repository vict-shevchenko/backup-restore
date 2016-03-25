import React, { PropTypes } from 'react';
import deviceCredentials from './../mocks/device-credentials.js';
import listStyles from './list.css'

class ListItem extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        return (
            <div className="list-item list-item_sortable">
                <div className={"list-item__drag-section list-item__status_" + this.props.credential.status} ></div>
                <div className="list-item__main-section">
                    <div className="list-item__icon" >
                        <label className="full-size list-item__icon-label">
                            <input type="checkbox" />
                        </label>
                    </div>
                    <div className="list-item__partial list-item__name" >
                        <a href="#">{this.props.credential.name}</a>
                    </div>
                    <div className="list-item__partial list-item__desc" >
                        <label>Description:</label> <span>{this.props.credential.description}</span><br/>
                        <label>Username:</label> <span>{this.props.credential.username}</span>
                    </div>
                    <div className="list-item__partial list-item__desc" >
                        <label dangerouslySetInnerHTML={{__html: this.props.credential.protocols.join('<br/>')}}></label>
                    </div>
                    <div className="list-item__partial list-item__actions">
                        <button className="dropdown-button">Actions</button>
                    </div>
                </div>
            </div>
        )
    }
}

ListItem.propTypes = {
    credential: PropTypes.object.isRequired
};

export default class DevicesList extends React.Component {
    constructor(props) {
        super(props);
    }

    filerList (item) {
        return item;
    }

    render() {
        return (
            <div className="list list_sortable ">
                {deviceCredentials.filter(this.filerList).map((credential, idx) => <ListItem credential={credential} key={idx} />)}
            </div>
        );
    }
}