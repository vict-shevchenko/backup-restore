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
                            <input type="checkbox" checked={this.props.credential.checked}/>
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
        this.state = {
            list: deviceCredentials,
            allChecked: false
        }
    }

    checkAll (e) {
        console.log("logging");

       const lst = this.state.list.map(item => {
           item.checked = !this.state.allChecked;
           return item;
       });

        this.setState({
            allChecked: !this.state.allChecked,
            list: lst
        });

        e.stopPropagation();
    }

    filerList (item) {
        return item;
    }

    render() {
        return (
            <div>
                <div className="list-menu">
                    <div style={{width: '70px', height: '30px', backgroundColor: '#d9d9d9', display: 'inline-block'}}>
                        <input type="checkbox" checked={this.state.allChecked}  onChange={this.checkAll.bind(this)}/> All
                    </div>
                    <span>---//Filter goes here</span>
                    <span> ----//Tags go here</span>
                    <span> ----//Add button goes here</span>

                </div>
                <div className="list list_sortable ">
                    {this.state.list.filter(this.filerList).map((credential, idx) => <ListItem credential={credential} key={idx} />)}
                </div>
            </div>

        );
    }
}