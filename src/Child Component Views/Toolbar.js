/* eslint-disable */
import React, { Component } from 'react';

class Toolbar extends Component {
  state = {
    subject: '',
    body: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.itemsAdded(this.state)
  }

  render() {
    let toggleComposeFormClass = "fa-plus";

    let selectButtonClass = "fa-square-o";

    let messagesSelected = this.props.messages.filter(message => message.selected);

    if (messagesSelected.length === this.props.messages.length) {
      selectButtonClass = "fa-check-square-o";
    } else if (messagesSelected[0]) {
      selectButtonClass = "fa-minus-square-o";
    }

    let countedUnread = this.props.messages.filter(msg => !msg.read).length;

    let countedSelected = this.props.messages.reduce((acc, val) => acc + !!val.selected, 0)
    console.log('countedSelected', countedSelected)

    return (
      <div className="responsive row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{countedUnread}</span>
            {countedUnread > 1 || countedUnread < 1 ? 'unread messages' : 'unread message'}
          </p>

          <button
            className="btn btn-danger"
            onClick={() => this.props.toggleComposeForm(toggleComposeFormClass)}
            disabled={!countedSelected}
          >
            <i className={`fa ${toggleComposeFormClass}`} ></i>
          </button>

          <button
            className="btn btn-default"
            onClick={() => this.props.selectButtonFunc(selectButtonClass)}
            disabled={!countedSelected}
          >
            <i className={`fa ${selectButtonClass}`} ></i>
          </button>

          <button
            className="btn btn-default"
            onClick={() => this.props.setReadFunc()}
            disabled={!countedSelected}
          >
            Mark As Read
          </button>

          <button
            className="btn btn-default"
            onClick={() => this.props.setUnreadFunc()}
            disabled={!countedSelected}
          >
            Mark As Unread
          </button>

          <select
            className="form-control label-select"
            onChange={(e) => this.props.addLabel(e.target.value)}
            disabled={!countedSelected}
          >
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select
            className="form-control label-select"
            onChange={(e) => this.props.removeLabel(e.target.value)}
            disabled={!countedSelected}
          >
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button
            className="btn btn-default"
            onClick={() => this.props.deleteMessages()}
            disabled={!countedSelected}
          >
            <i className="fa fa-trash-o"></i>
          </button>

          {/*Conditional Rendering used to enable show/hide functionality on compose form*/}
          { this.props.showForm
            ? <form onSubmit={this.handleSubmit}  className="form-horizontal well">
              <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                  <h4>Compose Message</h4>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    value= {this.state.subject}
                    onChange={(e)=>this.setState({subject: e.target.value})}
                    />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="body" className="col-sm-2 control-label">Body</label>
                <div className="col-sm-8">
                  <textarea
                    className="form-control"
                    value= {this.state.body}
                    onChange={(e)=>this.setState({body: e.target.value})}
                    ></textarea>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                  <input type="submit" value="Send" className="btn btn-primary"/>
                </div>
              </div>
            </form>
            : null
          }

        </div>
      </div>
    )
  }
}

export default Toolbar;
