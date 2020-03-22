import React, { Component } from 'react';
import  { Redirect, Link } from 'react-router-dom'
import Container from './Container.js';
import { postData, getData, deleteData, notEmptyArray } from '../Actions/Actions';
import TopNav from './TopNav.js';


class Placements extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            names: '',
            userId: '',
            ailmentId: '',
            startDate: '',
            endDate: '',
            status: '',
            usersSelect: [],
            ailmentsRecs: [],
            placementsRecs: []
        }
    }


    componentDidMount() {
        getData('/user/select').then((rdata) => {
            console.log(rdata);
            this.setState({['usersSelect']: rdata});
        });
        getData('/ailments').then((rdata) => {
            this.setState({['ailmentsRecs']: rdata});
        });
        getData('/placements').then((rdata) => {
            console.log('placementsRecs', rdata);
            
            this.setState({['placementsRecs']: rdata});
        });
    }

    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    createHandler = (event) => {
        event.preventDefault();
        const inData = {
            names: this.state.names,
            userIds: this.state.userId,
            ailmentId: this.state.ailmentId,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            status: this.state.status
        }
        postData(inData, '/placements').then((rdata) => {    
            this.setState({['placementsRecs']: rdata});
        })
    }

    deleteRec = (event) => {
        event.preventDefault();
        deleteData({}, `/placements/${event.target.id}`).then((rdata) => {
            this.setState({['placementsRecs']: rdata});
        })
    }

    render() { 

        const {names, userId, ailmentId, startDate, endDate, status} = this.state;
        let usersList = this.state.usersSelect.map((item, index) => <option key={index} value={item['id']}>{item['names']}</option>);
        let ailmentsList = this.state.ailmentsRecs.map((item, index) => <option key={index} value={item['id']}>{item['names']}</option>);

        let tableDisplay = "";
        if (notEmptyArray(this.state.placementsRecs)) {
            tableDisplay = this.state.placementsRecs.map((item, index) => <tr key={index}><td>{item['names']}</td><td>{item['User']['names']}</td><td>{item['Ailment']['names']}</td><td>{item['startDate']}</td><td>{item['endDate']}</td><td>{item['status']}</td><td><a id={item['id']} href="#" onClick={this.deleteRec}>Delete</a></td></tr>);
        }

        return ( 
            <div>
                <TopNav />
                <Container>
                    <form onSubmit={this.createHandler} style={{padding:'30px 40px 50px 40px'}}>
                        <h2 style={{textAlign:'center', marginBottom:'30px'}}>Persons on Prescription</h2>
                        <div className="form-group">
                            <label htmlFor="Names">Names:</label>
                            <input 
                                type="text" id="names" 
                                name="names" value={names} 
                                onChange={this.inputChangeHandler} 
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="userId">
                                Users:
                            </label>
                            <select 
                            id="userId" 
                            name="userId" value={userId} 
                            onChange={this.inputChangeHandler}
                            className="form-control">
                                <option>Select User</option>
                            {usersList}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ailmentId">
                                <Link className="linkstyle" to="/ailment">Ailments:</Link>
                            </label>
                            <select 
                            id="ailmentId" 
                            name="ailmentId" value={ailmentId} 
                            onChange={this.inputChangeHandler}
                            className="form-control">
                                <option>Select Ailment</option>
                            {ailmentsList}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="startDate">Start Data:</label>
                            <input 
                                type="date" id="startDate" 
                                name="startDate" value={startDate} 
                                onChange={this.inputChangeHandler}
                                className="form-control" 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">End Date:</label>
                            <input 
                                type="date" id="endDate" 
                                name="endDate" value={endDate} 
                                onChange={this.inputChangeHandler}
                                className="form-control" 
                            />
                        </div>

                    <div className="custom-control custom-checkbox mb-3">
                            <input type="checkbox"
                            id="status" 
                            name="status" value={status} 
                            onChange={this.inputChangeHandler}
                            className="custom-control-input" 
                            id="status" name="example1" />
                            <label className="custom-control-label" htmlFor="status">Custom checkbox</label>
                        </div>

                        <button className="btn btn-primary" type="submit">Submit</button>
                    </form>   
                    <div className="table-wrap">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Names</th>
                                    <th>Users</th>
                                    <th>Ailments</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableDisplay || []}
                            </tbody>
                        </table>
                    </div>
                </Container>
            </div>
        );
    }
}
 
export default Placements;