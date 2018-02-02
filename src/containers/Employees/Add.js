import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { saveEmployee } from '../../actions';

import './style.css';

class AddEmployee extends React.Component {
  // static propTypes = {}
  // static defaultProps = {}
  state = {
    name: '',
    gender: 'M',
    birthday: '',
  };

  handleChange = e => {
    const { target: { name, value } } = e;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = { ...this.state };
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
    onSubmit: ownProps.onSubmit,
  };
}
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(actions, dispatch);
// }

export default connect(mapStateToProps, {
  changePage: route => push(`${route}`),
  saveEmployee,
})(AddEmployee);
