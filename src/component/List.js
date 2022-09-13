import React from 'react';
import Table from './Table';
import axios from 'axios';
import { BASE_URL, GET_EMPLOYEES, POST_EMPLOYEE } from '../constant/Constant';

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            name: '',
            fatherName: '',
            contact: '',
            salary: '',
            address: '',
            btnText: 'Add',
            itemIndex: ''
        }
    }

    onNameValue = (e) => {
        this.setState({ name: e.target.value })
    }

    onAddressValue = (e) => {
        this.setState({ address: e.target.value })
    }

    onSalaryValue = (e) => {
        this.setState({ salary: e.target.value })
    }

    onFatherNameValue = (e) => {
        this.setState({ fatherName: e.target.value })
    }

    onContactValue = (e) => {
        this.setState({ contact: e.target.value })
    }

    componentDidMount() {
        this.fetchEmployee();
    }

    fetchEmployee() {
        axios({
            url: BASE_URL + GET_EMPLOYEES,
            method: 'GET',
        }).then(res => {
            this.setState({ list: res.data })
        }).catch(function (error) {
            console.log(error);
        })
    }

    onAddUpdateHandle = () => {
        var { list, itemIndex, name, fatherName, contact, address, salary, btnText } = this.state;

        if (btnText === 'Update') {
            // to update data
            list[itemIndex].EmployeeName = name;
            list[itemIndex].EmployeeDetails.FatherName = fatherName;
            list[itemIndex].EmployeeDetails.Address = address;
            list[itemIndex].EmployeeDetails.Contact = contact;
            list[itemIndex].EmployeeSalary = salary;
            this.setState({
                list, name: '', address: '', salary: '', btnText: 'Add', fatherName: '', contact: ''
            })
        }
        else {
            //To add data in array list
            if (name.length === 0 && address.length === 0 && salary.length === 0) {
                alert('Fields can not be empty')
            } else {
                const list = [...this.state.list, { EmployeeId: 0, EmployeeName: name, EmployeeSalary: salary, EmployeeDetails: { DetailId: 0, FatherName: fatherName, Address: address, Contact: contact, } }]
                this.setState({
                    list,
                    name: '',
                    address: '',
                    salary: '',
                    fatherName: '',
                    contact: ''
                })
            }
        }
    }

    onCancelHandle = () => {
        this.setState({
            name: '',
            address: '',
            salary: ''
        })
    }

    onEditHandle = (data, itemIndex) => {
        //filling textboxes to update data
        this.setState({
            itemIndex,
            name: data.EmployeeName,
            fatherName: data.EmployeeDetails.FatherName,
            address: data.EmployeeDetails.Address,
            contact: data.EmployeeDetails.Contact,
            salary: data.EmployeeSalary,
            btnText: 'Update'
        })
    }

    onDeleteHandle = (data) => {
        //delete from array list
        this.setState({ list: data })
    }

    onSyncAll = () => {
        debugger;
        let syncData = [];
        syncData = JSON.stringify(this.state.list.filter((item) => item.EmployeeId === 0));
        //  syncData = this.state.list.filter((item) => item.EmployeeId === 0);
        var data = JSON.parse(syncData);

        // fetch('http://localhost:52568/api/postemployee', {
        //     method: 'POST',
        //     body: { data },
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     }
        // }).then(res => {
        //     return res;
        // }).catch(err => err);

        axios.post(BASE_URL + POST_EMPLOYEE, data  )
            .then(res => {
                console.log(res)
            }).catch(function (error) {
                console.log(error);
            })
        debugger;
    }

    render() {

        return (
            <div>
                <h3>Insert multiple rows in single hit</h3>
                <div>
                    <label> Name : </label> <span> </span>
                    <input type='text' onChange={this.onNameValue} value={this.state.name} placeholder='Enter Name' />
                    <br />
                    <label> FatherName :</label> <span> </span>
                    <input type='text' onChange={this.onFatherNameValue} value={this.state.fatherName} placeholder='FatherName' />
                    <br />
                    <label> Address : </label> <span> </span>
                    <input type='text' onChange={this.onAddressValue} value={this.state.address} placeholder='Address' />
                    <br />
                    <label> Contact : </label> <span> </span>
                    <input type='text' onChange={this.onContactValue} value={this.state.contact} placeholder='Contact' />
                    <br />
                    <label> Salary : </label> <span> </span>
                    <input type='text' onChange={this.onSalaryValue} value={this.state.salary} placeholder='Salary' />
                    <br />
                    <input type='submit' onClick={this.onAddUpdateHandle} value={this.state.btnText} className="btn btn-success" style={{ width: "80px" }} />
                    <span> </span>
                    <input type='submit' onClick={this.onCancelHandle} value='Cancel' className='btn btn-danger' style={{ width: "80px" }} />
                    <br /><br />
                    <input type='submit' onClick={this.onSyncAll} value='SyncAll' className='btn btn-warning' style={{ width: "80px" }} />
                </div>

                <Table
                    updateItem={this.onEditHandle}
                    deleteItem={this.onDeleteHandle}
                    arrayList={this.state.list}
                />
            </div>
        );
    }
}
export default List