import React, { PropTypes } from 'react';
import Filter from './Filter/Filter';
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

export default class CredentialsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterItems: []
        };

        this.checkAll = this.checkAll.bind(this);
        this.checkItem = this.checkItem.bind(this);
        this.invertSelection = this.invertSelection.bind(this);
        this.filterList = this.filterList.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
    }

    checkAll (e) {
        const checked = e.target.checked;
        this.props.checkAll(checked, this.props.type);
        e.stopPropagation();
    }

    checkItem (idx) {
        this.props.checkItem(idx, this.props.type);
    }

    invertSelection () {
        this.props.invertSelection(this.props.type);
    }

    onFilterChange(filterItems) {
        this.setState({ filterItems });
    }

    filterList (item) {
        if (!this.state.filterItems.length) {
            return true;
        } else {
            return ~this.state.filterItems.findIndex(filterItem =>
              (item.protocols.includes(filterItem))
            );
        }
    }

    renderAdd() {
        return (
            <button className="btn btn_primary list-menu__button">
                Add
            </button>
        )
    }

    render() {
        const add = this.props.credentials.canAdd ? this.renderAdd() : '',
            allChecked = this.props.credentials.list.every(item => item.checked);

        return (
            <div>
                <div className="list-menu">
                    <div className="list-menu__button btn btn_secondary btn_small">
                        <input type="checkbox" className="list_menu__select-all-checkbox" checked={allChecked} onChange={this.checkAll}/>
                        <span className="list_menu__invert-selection" onClick={this.invertSelection}>🔄</span>
                    </div>
                    <Filter onFilterChange={this.onFilterChange} />
                    {add}

                </div>
                    <div className="list list_sortable">
                        {this.props.credentials.list.filter(this.filterList).map((credential, idx) => <ListItem credential={credential} index={idx} key={idx} checkItem={this.checkItem} />)}
                    </div>
            </div>

        );
    }
}

CredentialsList.propTypes = {
    credentials: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    checkAll: PropTypes.func,
    checkItem: PropTypes.func
};
