import React from 'react';
import { connect } from 'react-redux';
import { saveEmployee } from './_actions';
import { Layout } from 'common/layout';

import { Segment, Header } from 'semantic-ui-react';
import AddEditForm from './components/AddEditForm';
import './style.css';

class AddEmployee extends React.Component {
  // static propTypes = {}
  // static defaultProps = {}

  handleSubmit = data => {
    this.props.saveEmployee(data, this.redirectToList);
  };

  redirectToList = () => {
    console.log('redirecting to /employee', this.props);
    this.props.history.push('/employee');
  };

  render() {
    const { employees: { isFetching } } = this.props;
    return (
      <Layout>
        <Segment loading={isFetching}>
          <div className="ui container fluid employee">
            <Header>Colaborador</Header>
            <AddEditForm onSubmit={this.handleSubmit} />
          </div>
        </Segment>
      </Layout>
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
  saveEmployee,
})(AddEmployee);
