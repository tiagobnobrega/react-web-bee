import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEmployee, listEmployees, removeEmployee } from '../../actions';

import './style.css';

class ListEmployees extends React.Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('calling listEmployees');
    this.props.listEmployees();
  }

  handleRemove = id => {
    if(window.confirm('Tem certeza que deseja excluir ?')){
      this.props.removeEmployee(id, this.props.listEmployees);
    }
  };

  renderLines = () => {
    const { employees } = this.props;
    return employees.data.map(e => {
      return (
        <tr style={{ cursor: 'pointer' }} key={e._id}>
          <td>
            <Link to={`/employee/${e._id}`}>{e.name}</Link>
          </td>
          <td>{e.birthday}</td>
          <td>{e.gender}</td>
          <td>
            <button onClick={() => this.handleRemove(e._id)}>Remover</button>
          </td>
        </tr>
      );
    });
  };

  render() {
    const { employees } = this.props;
    return (
      <div className="employee-container">
        <div>
          {employees.isFetching ? (
            <h3>loading...</h3>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Data de Nascimento</th>
                  <th>Sexo</th>
                  <th />
                </tr>
              </thead>
              <tbody>{this.renderLines()}</tbody>
            </table>
          )}
          <Link to={`/employee/add`}>Adicionar</Link>
        </div>
        <hr />
        {/*<div>{this.renderSelectedProject(selectedProject)}</div>*/}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { employees: state.employees };
}
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(actions, dispatch);
// }

export default connect(mapStateToProps, {
  getEmployee,
  listEmployees,
  removeEmployee,
})(ListEmployees);
