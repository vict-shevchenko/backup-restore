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
                            <input type="checkbox" checked={this.props.credential.checked} onChange={this.props.checkItem.bind(this, this.props.index)} />
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
    credential: PropTypes.object.isRequired,
    checkItem: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};

export default class DevicesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: deviceCredentials,
            allChecked: false
        };

        this.canAddCredentials = true;

        this.checkAll = this.checkAll.bind(this);
        this.checkItem = this.checkItem.bind(this);
    }

    checkAll (e) {

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

    checkItem (idx) {
        this.state.list[idx].checked = !this.state.list[idx].checked;

        this.setState({
            list: this.state.list
        });
    }

    filerList (item) {
        return item;
    }

    renderAdd() {
        return (
            <button className="btn btn_primary pull-right">
                Add
            </button>
        )
    }

    render() {
        const add = this.canAddCredentials ? this.renderAdd() : ''

        return (
            <div>
                <div className="list-menu clearfix">
                    <div className="list-menu__button">
                        <input type="checkbox" className="list_menu__select-all-checkbox" checked={this.state.allChecked} onChange={this.checkAll}/>
                        <span style={{transform: 'rotate(98grad)', display: 'inline-block'}}>></span>
                    </div>
                    <span>---//Filter goes here</span>
                    <span> ----//Tags go here</span>
                    {add}

                </div>
                    <div className="list list_sortable">
                        {this.state.list.filter(this.filerList).map((credential, idx) => <ListItem credential={credential} index={idx} key={idx} checkItem={this.checkItem} />)}
                    </div>
            </div>

        );
    }
}