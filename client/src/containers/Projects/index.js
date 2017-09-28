import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../actions/projectsActions';

// import './style.css';

class Projects extends React.Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.getAllProjects();
  }

  render() {
    const { projects } = this.props;
    return (
      <div>
        <h1>
          {projects.map((p)=>{return (<div>{p.name}</div>)})}
        </h1>
      </div>
    );
  }
}

function mapStateToProps({projects}) {
  return {projects}
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(actions ,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);