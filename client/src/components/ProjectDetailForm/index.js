import React, {Component} from 'react';
import _ from 'lodash';


export default class ProjectDetailForm extends Component {

  constructor(props) {
    super(props);
    const {name, code, description, _id, isNew} = props.project;
    const {onSubmit, onDelete, onClose, onChange} = props;
    this.state = {
      name: name,
      code: code,
      description: description,
      _id: _id,
      isNew: isNew,
    };
    this.onSubmitCallback = onSubmit || _.stubTrue;
    this.onDeleteCallback = onDelete || _.stubTrue;
    this.onCloseCallback = onClose || _.stubTrue;
    this.onChangeCallback = onChange || _.stubTrue;

    //common binds
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state._id!==nextProps.project._id) {
      this.setState(nextProps.project);
    }
  }

  handleInputChange(e) {
    let el = e.target;
    const {value, name} = el;
    if (!name) console.warn("handleFormInput:: Elements has no name defined");
    let changed = {};
    _.set(changed, name, value);
    this.handleUpdate(changed);
  }

  handleUpdate(changed) {
    let updatedState = {};
    Object.assign(updatedState, this.state, changed);
    this.setState(updatedState,
      () => {
        this.onChangeCallback(this.state)
      });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.onSubmitCallback(this.state);
  }

  handleClose() {
    this.onCloseCallback(this.state);
  }

  handleDelete() {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      this.onDeleteCallback(this.state);
    }
  }

  render() {
    const {name, code, description, _id} = this.state;
    return (
      <div>
        <small>
          _id:{_id}
        </small>
        <div>
          <label>Nome:</label>
          <input value={name} name="name" onChange={this.handleInputChange}/>
        </div>
        <div>
          <label>Code:</label>
          <input value={code} name="code" onChange={this.handleInputChange}/>
        </div>
        <div>
          <label>Description:</label>
          <input value={description} name="description" onChange={this.handleInputChange}/>
        </div>

        <div>
          <button type="button" onClick={this.handleSubmit.bind(this)}>Salvar</button>
          <button type="button" onClick={this.handleClose.bind(this)}>Fechar</button>
          <button type="button" onClick={this.handleDelete.bind(this)}>Excluir</button>
        </div>
      </div>

    )
  }
}