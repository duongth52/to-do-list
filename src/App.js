import React, {Component} from 'react';
import './App.css';
import TaskForm from './component/TaskForm';
import Control from './component/Control';
import TaskList from './component/TaskList';
export default class App extends Component {
  constructor( props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      fillter: {
        name: '',
        status: -1
      },
      keyWord: '',

      // bySort: 'name',
      // ValueSort: 1,
      sort: {
        bySort: '',
        valueSort: 1
      }
    }
  }

onGenerateData = () => { 
  var tasks = [
    {
      id: this.generateID(),
      name:  'học php',
      status: true,
    },
    {
      id: this.generateID(),
      name:  'học Rect js',
      status: false,
    },
    {
      id: this.generateID(),
      name:  'học angular',
      status: true,
    }
  ];

  this.setState({
    tasks: tasks
  });

  localStorage.setItem('tasks', JSON.stringify(this.state.tasks));

}

componentWillMount() {
	if(localStorage && localStorage.getItem('tasks')) {
		var tasks = JSON.parse(localStorage.getItem('tasks'));
		this.setState({
      tasks: tasks
		});
	}
}

s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
generateID() {
  return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4(); 
}

onToggleForm = () => {
  this.setState({
    isDisplayForm: true,
    taskEditing: null
  });
}

onCloseForm = () => {
  this.setState({
    isDisplayForm: false
  });
}

onSubmit = (data) => {
  var { tasks }= this.state;
  if(data.id) {
    var index = this.findIndex(data.id);
    tasks[index] = data;
  } else {
    data.id = this.generateID();
    tasks.push(data);
  }

  this.setState({
    tasks: tasks,
    taskEditing: null
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
   
}

onUpdateStatus = (id) => {
  var { tasks } = this.state;
  var index = this.findIndex(id);
  if(index !== -1) {
    tasks[index].status = !tasks[index].status;
    this.setState({
      tasks: tasks
    })
  }
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

onDeleteTask = (id) => {
  var { tasks } = this.state;
  var index = this.findIndex(id);
  if(index !== -1) {
   tasks.splice(index, 1);
    this.setState({
      tasks: tasks
    })
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  this.onCloseForm();
}

onUpdateTask = (id) => {
  var { tasks } = this.state;
  var index = this.findIndex(id);
  var taskEditing = tasks[index];
  this.setState({
    taskEditing: taskEditing,
    isDisplayForm: true
  });

}

findIndex(id) {
  var {tasks} = this.state;
  var result = -1;
  tasks.forEach( (task, index) => {
    if(task.id === id) {
      result = index;
    }
  });
  return result;
}

onFillter = (fillterName, fillterStatus) => {
  this.setState({
    fillter: {
      name: fillterName.toLowerCase(),
      status: parseInt(fillterStatus)
    }
  });
}

onSearch = (keyWord) => {
  this.setState({
    keyWord: keyWord 
  })
}

onSort = (bySort, valueSort) => {
  this.setState ({
    sort: {
      bySort: bySort,
      valueSort: valueSort
    }
  });
}

render() {
    
  var {tasks, taskEditing, fillter, keyWord, sort} = this.state;
  if(fillter) {
    if(fillter.name) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(fillter.name) !== -1;
      });
    }

    tasks = tasks.filter((task) => {
      switch(fillter.status) {
        case -1:
          return task;
        case 1:   
          return task.status === true;
        case 0:
          return task.status === false;
      }
    })
  }

  if(keyWord){
    tasks = tasks.filter((task) => {
      return task.name.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1;
    });
  }

  if(sort.bySort && sort.valueSort) {
    switch (sort.bySort) {
      case 'name':
        tasks.sort((taskFirst, taskLast) => {
          if(taskFirst.name > taskLast.name )
            return sort.valueSort
          if(taskFirst.name < taskLast.name) 
            return -sort.valueSort
          return 0
        })
        break
        case 'status':
          tasks.sort((taskFirst, taskLast) => {
            if(taskFirst.status > taskLast.status )
              return -sort.valueSort
            if(taskFirst.status < taskLast.status) 
              return sort.valueSort
            return 0
          })
        break;
    }
  }

  var elmTaskForm = this.state.isDisplayForm 
      ? <TaskForm onSubmit={ this.onSubmit }  onCloseForm={ this.onCloseForm  } task={ taskEditing } /> : '';
	
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className= { this.state.isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : "" }>
            { elmTaskForm }
          </div>
          <div className= {this.state.isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12" }>
            <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-5" />Thêm Công Việc
            </button>
            {/* <button type="button" className="btn btn-primary" onClick={this.onGenerateData}> */}
             {/* Generate Data */}
             {/* sort and search */}
             {/* </button> */}
            <Control
                onSearch = { this.onSearch }
                onSort = { this.onSort }
                sort = { sort }
              />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <TaskList 
                  task={ tasks }
                  onUpdateStatus={ this.onUpdateStatus }
                  onDeleteTask={ this.onDeleteTask }
                  onUpdateTask={ this.onUpdateTask }
                  onFillter={ this.onFillter } 
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
