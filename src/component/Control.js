import React, { Component } from 'react';

export default class Control extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyWord: '',
            sort: {
                bySort: 'name',
                valueSort: 1
            }
        }
    }

    onChangeSearch = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyWord);
    }

    onSort = (bySort, valueSort) => {
        this.props.onSort(bySort, valueSort);
    }

    // componentWillReceiveProps(nextProps) {
    //     var sort = nextProps.sort;
    //     this.setState({
    //         sort: {
    //             valueSort: sort.valueSort,
    //             bySort: sort.bySort
    //         }
    //     });
    // }

    render() {
        var { keyWord } = this.state;
        return (
            <div className="row mt-15">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="input-group">
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Nhập từ khóa..." 
                            name="keyWord"
                            value={ keyWord }
                            onChange={this.onChangeSearch}
                            />
                        <span className="input-group-btn">
                            <button className="btn btn-primary" type="button" onClick={this.onSearch}>
                                <span className="fa fa-search mr-5" />Tìm
                            </button>
                        </span>
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <li onClick = {() => this.onSort('name', 1) }>
                                <a role="button">
                                    <span className="fa fa-sort-alpha-asc pr-5">
                                        Tên A-Z
                                    </span>
                                </a>
                            </li>
                            <li onClick = {() => this.onSort('name', -1)} >
                                <a role="button">
                                    <span className="fa fa-sort-alpha-desc pr-5">
                                        Tên Z-A
                                    </span>
                                </a>
                            </li>
                            <li role="separator" className="divider" />
                            <li onClick = {() => this.onSort('status', 1)} ><a role="button">Trạng Thái Kích Hoạt</a></li>
                            <li onClick = {() => this.onSort('status', -1)} ><a role="button">Trạng Thái Ẩn</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
