import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEmployee, listEmployees, removeEmployee } from './_actions';
import { Layout } from 'common/layout';
import { Segment, Table, Button, Header } from 'semantic-ui-react';
import './style.css';

class ListEmployees extends React.Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.listEmployees();
  }

  handleRemove = id => {
    if (window.confirm('Tem certeza que deseja excluir ?')) {
      this.props.removeEmployee(id, this.props.listEmployees);
    }
  };

  renderLines = () => {
    const { employees } = this.props;
    return employees.data.map(e => {
      return (
        <Table.Row key={e._id}>
          <Table.Cell>
            <Link to={`/employee/${e._id}`}>{e.name}</Link>
          </Table.Cell>
          <Table.Cell>{e.birthday}</Table.Cell>
          <Table.Cell>{e.gender}</Table.Cell>
          <Table.Cell>
            <Button negative onClick={() => this.handleRemove(e._id)}>
              Remover
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  render() {
    const { employees } = this.props;
    return (
      <Layout>
        <div className="ui container fluid employee">
          <Header>Employees</Header>
          <Segment loading={employees.isFetching}>
            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                  <Table.HeaderCell>Sexo</Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>{this.renderLines()}</Table.Body>
            </Table>
            <Button primary as={Link} to={`/employee/add`}>
              Adicionar
            </Button>
          </Segment>
        </div>
      </Layout>
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
