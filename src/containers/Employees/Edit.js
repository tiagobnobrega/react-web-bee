import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { getEmployee, saveEmployee } from '../../actions';

import './style.css';

class EditEmployee extends React.Component {
  // static propTypes = {}
  // static defaultProps = {}
  state = {
    _id: '',
    name: '',
    gender: '',
    birthday: '',
  };

  componentWillReceiveProps(nextProps) {
    console.log('Component will receive props');
    const currId = this.props.id;
    const nextId = nextProps.id;
    if (nextId && currId !== nextId) {
      console.log('currId DIFERENTE de nextId ');
      this.props.getEmployee(nextId);
    }
    const currOne = this.props.employees.one;
    const nextOne = nextProps.employees.one;
    if ((currOne && currOne._id) !== (nextOne && nextOne._id)) {
      console.log('currOne DIFERENTE de nextOne ');
      console.log({ nextOne });
      this.setState(nextOne);
    }
  }

  componentDidMount() {
    const { id } = this.props;
    this.props.getEmployee(id);
  }

  handleChange = e => {
    const { target: { name, value } } = e;
    this.setState({ [name]: value });
    console.log(`changed ${name} to ${value}`);
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = { ...this.state };
    data._id = this.props.id;
    this.props.saveEmployee(data, this.props.onSubmit || this.redirectToList);
  };

  redirectToList = () => {
    this.props.changePage('./');
  };

  render() {
    const { employees: { isFetching } } = this.props;
    const { name, gender, birthday } = this.state;
    if (isFetching) {
      return <div>loading...</div>;
    }
    return (
      <div className="employee-container">
        <div className="form-heading">Colaborador</div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">
            <span>Nome</span>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="birthday">
            <span>Aniversário</span>
            <input
              type="text"
              name="birthday"
              value={birthday}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="gender">
            <span>Sexo</span>
            <select name="gender" onChange={this.handleChange} value={gender}>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
          </label>
          <div>
            <button type="submit">Salvar</button>
            <button type="button" onClick={this.redirectToList}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ employees }, ownProps) {
  return {
    employees,
    id: ownProps.id || ownProps.match.params.id,
    onSubmit: ownProps.onSubmit,
  };
}
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(actions, dispatch);
// }

export default connect(mapStateToProps, {
  changePage: route => push(`${route}`),
  getEmployee,
  saveEmployee,
})(EditEmployee);
