import React, { Component } from 'react';

export default class TaskForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            status: true
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status') {
            value = value === 'true' ? true : false;
        }

        this.setState({
            [name]: value,
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
       // this.onClear();
        this.onCloseForm()
    }

    onClear = (event) => {
        event.preventDefault();
        this.setState({
            id: '',
            name: '',
            status: true
        });
        this.onCloseForm();
    }

    componentWillMount() {
        var task = this.props.task;
        if(task) {
            this.setState({
                id: task.id,
                name: task.name,
                status: task.status
            });
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task) {
            var task = nextProps.task;
            if(task) {
                this.setState({
                    id: task.id,
                    name: task.name,
                    status: task.status
                });
            }
        } else if(!nextProps.task){
            this.setState({
                id: '',
                name: '',
                status: true
            });
        }

    
    }

    render() {
        var { id } = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title"> {id ? " Cập nhật công việc" : "Thêm công việc"}
                <span className="fa fa-times-circle pull-right" onClick={ this.onCloseForm } ></span>
                    </h3>

                </div>
                <div className="panel-body">
                    <form>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="name"
                                value={ this.state.name }
                                onChange={ this.onChange }
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select className="form-control" 
                                required="required"
                                name="status"
                                value={ this.state.status }
                                onChange={ this.onChange }>
                            <option value={ true }>Kích Hoạt</option>
                            <option value={ false }>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button onClick={ this.onSubmit  } className="btn btn-warning">{id ? "Cập nhật" : "Thêm"}</button>&nbsp;
                            <button className="btn btn-danger" onClick={ this.onClear }>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
