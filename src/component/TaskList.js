import React, { Component } from 'react';
import TaskItem from './TaskItem'

export default class TaskList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            fillterName: '',
            fillterStatus: -1
        }
    }

    onUpdateStatus = (id) => {
        this.props.onUpdateStatus(id);
    }

    onDeleteTask = (id) => {
        this.props.onDeleteTask(id);
    }

    onUpdateTask = (id) => {
        this.props.onUpdateTask(id);
    }

    onChange = (event) => {
        var target = event.target;
        var value = target.value;
        var name = target.name;
        this.props.onFillter(
            name === 'fillterName' ? value : this.state.fillterName,
            name === 'fillterStatus' ? value : this.state.fillterStatus
        );

        this.setState({
            [name] : value
        });
    }
  
    render() {
        var tasks = this.props.task;
        var { fillterName, fillterStatus } = this.state;

        var eleTask = tasks.map((task, index)=>{
            return <TaskItem 
                        key={ task.id } 
                        index={ index } 
                        task={ task }
                        onUpdateStatus={ this.onUpdateStatus }
                        onDeleteTask={ this.onDeleteTask }
                        onUpdateTask={ this.onUpdateTask }
                        />
        })
        


        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td />
                        <td>
                            <input 
                                type="text" 
                                className="form-control"
                                name="fillterName"
                                value={ fillterName }
                                onChange={ this.onChange }/>
                        </td>
                        <td>
                            <select 
                                className="form-control"
                                name="fillterStatus"
                                value={ fillterStatus }
                                onChange={ this.onChange }>
                                <option value={-1}>Tất Cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích Hoạt</option>
                            </select>
                        </td>
                        <td />
                    </tr>
                    { eleTask }
                </tbody>
            </table>

        );
    }
}
