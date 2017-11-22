/* eslint-disable */
import React, { Component } from 'react';

class Toolbar extends Component {

  render () {

    let composeFormButtonClass = "fa-plus";

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
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{countedUnread}</span>
            {countedUnread > 1 || countedUnread < 1 ? 'unread messages' : 'unread message'}
          </p>

          <button
            className="btn btn-danger"
            onClick={() => this.props.composeFormButtonFunc(composeFormButtonClass)}
            disabled={!countedSelected}
          >
            <i className={`fa ${composeFormButtonClass}`} ></i>
          </button>
          { this.props.showForm
            ? <form className="form-horizontal well">
              <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                  <h4>Compose Message</h4>
                </div>
              </div>
              <div className="form-group">
                <label for="subject" className="col-sm-2 control-label">Subject</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"/>
                </div>
              </div>
              <div className="form-group">
                <label for="body" className="col-sm-2 control-label">Body</label>
                <div className="col-sm-8">
                  <textarea name="body" id="body" className="form-control"></textarea>
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

        </div>
      </div>
    )
  }
}

export default Toolbar;
