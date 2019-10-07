import React, { Component } from 'react';
import TaskItem from './TaskItem'

export default class TaskList extends Component {
    onUpdateStatus = (id) => {
        this.props.onUpdateStatus(id);
    }

    onDeleteTask = (id) => {
        this.props.onDeleteTask(id);
    }

    onUpdateTask = (id) => {
        this.props.onUpdateTask(id);
    }
  
    render() {
        var tasks = this.props.task;
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
                            <input type="text" className="form-control" />
                        </td>
                        <td>
                            <select className="form-control">
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