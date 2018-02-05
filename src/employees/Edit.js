import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { getEmployee, saveEmployee } from './_actions';
import { Layout } from 'common/layout';
import { Segment, Header } from 'semantic-ui-react';
import AddEditForm from './components/AddEditForm';

import './style.css';

class EditEmployee extends React.Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  componentWillReceiveProps(nextProps) {
    const currId = this.props.id;
    const nextId = nextProps.id;
    if (nextId && currId !== nextId) {
      this.props.getEmployee(nextId);
    }
  }

  componentDidMount() {
    const { id } = this.props;
    this.props.getEmployee(id);
  }

  handleSubmit = data => {
    data._id = this.props.id;
    this.props.saveEmployee(data, this.redirectToList);
  };

  redirectToList = () => {
    this.props.changePage('./');
  };

  render() {
    const { employees: { isFetching, one } } = this.props;
    return (
      <Layout>
        <Segment loading={isFetching}>
          <div className="ui container fluid employee">
            <Header>Colaborador: {one && one.name}</Header>
            <AddEditForm
              initialValues={one}
              onSubmit={this.handleSubmit}
              onCancel={this.redirectToList}
            />
          </div>
        </Segment>
      </Layout>
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
