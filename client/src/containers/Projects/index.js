import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../actions/projectsActions';
import ProjectDetailForm from '../../components/ProjectDetailForm';

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

  handleClickProject(code){
    console.log('handleClickProject:',code);
    this.props.getProjectByCode(code);
  }

  handleSubmitSelectedProject(selectedProject){
    this.props.saveProject(selectedProject)
      .then(()=>this.props.getAllProjects())
      .then(()=>this.props.getProjectByCode(selectedProject.code));

    // this.props.getProjectByCode(code);
    // console.log('selectedProject:',selectedProject);
  }

  handleCloseSelectedProject(){
    this.props.setSelectedProject({});
  }
  handleNewProject(){
    this.props.setSelectedProject({code:'', name:'', isNew:true});
  }

  renderSelectedProject(selectedProject){

    if(selectedProject.isFetchingLoad) {
      return (
        <h3>loading...</h3>
      )
    }
    if(selectedProject.isFetchingPost) {
      return (
        <h3>posting...</h3>
      )
    }
    if(selectedProject && (selectedProject.code || selectedProject.isNew)) {
      return (
        <ProjectDetailForm
          project={selectedProject}
          onSubmit={this.handleSubmitSelectedProject.bind(this)}
          onClose={this.handleCloseSelectedProject.bind(this)}
        />
      )
    }else{
      return <h3>Clique em um projeto acima para listar os detalhes</h3>
    }
  }

  render() {
    const { projects, selectedProject } = this.props;
    return (
      <div>
        <div>
          {projects.isFetching ?
            <h3>loading...</h3>
            :
            projects.all.map((p)=>{return (<div style={{cursor:'pointer'}} key={p.name}><h1 onClick={()=>{this.handleClickProject(p.code)}}>{p.name}</h1></div>)})}
          {}
          <button onClick={this.handleNewProject.bind(this)}>Incluir</button>
        </div>
        <hr />
        <div>
          {this.renderSelectedProject(selectedProject)}
        </div>
      </div>
    );
  }
}

function mapStateToProps({projects, selectedProject}) {
  return {projects, selectedProject}
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(actions ,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);