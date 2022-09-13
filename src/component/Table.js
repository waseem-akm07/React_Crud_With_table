import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
    //componentWillReceiveProps
    static getDerivedStateFromProps(props, state) {
        return state.list = props.arrayList
    }

    onEditHandle = (itemIndex) => {
        let data = this.state.list.find((item, index) => index === itemIndex);
        this.props.updateItem(data, itemIndex);
    }

    onDeleteHandle = (itemIndex) => {
        const data = this.state.list.filter((item, index) => index !== itemIndex)
        this.props.deleteItem(data);
    }

    render() {
        const columns = [
            {
                Header: 'Name',
                accessor: "EmployeeName"
            },
            {
                Header: 'F.Name',
                accessor: "EmployeeDetails.FatherName"
            },
            {
                Header: 'Address',
                accessor: "EmployeeDetails.Address"
            },
            {
                Header: 'Contact',
                accessor: "EmployeeDetails.Contact"
            },
            {
                Header: 'Salary',
                accessor: "EmployeeSalary"
            },
            {
                Header: "Action",
                accessor: '"action',
                Cell: props => {
                    return (
                        //   this.props.role === 'admin1@gmail.com' &&
                        <div>
                            <input className="btn btn-warning" type="submit" onClick={() => this.onEditHandle(props.index)} value="Edit" style={{ width: "80px" }} />
                            <span> </span>
                            <input className="btn btn-danger" type="submit" onClick={() => this.onDeleteHandle(props.index)} value="Delete" style={{ width: "80px" }} />
                        </div>
                    )
                },
                sortable: false,
                filterable: false
            }
        ]

        return (
            <div>
                <br />
                <ReactTable
                    columns={columns}
                    defaultPageSize={10}
                    data={this.state.list}
                ></ReactTable>
            </div>
        )
    }
}
export default Table