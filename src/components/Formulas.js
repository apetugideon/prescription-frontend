import React, { Component } from 'react';
import  { Redirect, Link } from 'react-router-dom'
import Container from './Container.js';
import { postData, getData, deleteData, notEmptyArray } from '../Actions/Actions';
import TopNav from './TopNav.js';



class Formulas extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            prescriptionId: '',
            ailmentId: '',
            usageTime: '',
            dosage: '',
            prescriptionSelect: [],
            formulaRecs: [],
            ailmentsSelect: []
        }
    }

    componentDidMount() {
        getData('/prescriptions').then((rdata) => {
            this.setState({['prescriptionSelect']: rdata});
        });
        getData('/formulas').then((rdata) => {
            this.setState({['formulaRecs']: rdata});
        });
        getData('/ailments').then((rdata) => {
            this.setState({['ailmentsSelect']: rdata});
        });
    }

    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value.trim()});
    }

    createHandler = (event) => {
        event.preventDefault();
        postData(this.state, '/formulas').then((rdata) => {
            this.setState({['formulaRecs']: rdata});
        });
    }

    deleteRec = (event) => {
        event.preventDefault();
        deleteData({}, `/formulas/${event.target.id}`).then((rdata) => {
            this.setState({['formulaRecs']: rdata});
        })
    }

    render() { 
        const {prescriptionId, ailmentId, usageTime, dosage} = this.state; //names, description, 
        const prescriptionList = this.state.prescriptionSelect.map((item, index) => <option key={index} value={item['id']}>{item['names']}</option>);
        const ailmentsList = this.state.ailmentsSelect.map((item, index) => <option key={index} value={item['id']}>{item['names']}</option>);

        let tableDisplay = "";
        if (notEmptyArray(this.state.formulaRecs)) {
            tableDisplay = this.state.formulaRecs.map((item, index) => <tr key={index}><td>{item['Prescription']['names']}</td><td>{item['Ailment']['names']}</td><td>{item['usageTime']}</td><td>{item['dosage']}</td><td><a id={item['id']} href="#" onClick={this.deleteRec}>Delete</a></td></tr>);
        }

        return ( 
            <div>
                <TopNav />
                <Container>
                    <form onSubmit={this.createHandler} style={{padding:'30px 40px 50px 40px'}}>
                        <h2 style={{textAlign:'center', marginBottom:'30px'}}>Add Prescription Formula</h2>
                        {/* <div className="form-group">
                            <label htmlFor="email">Names:</label>
                            <input 
                                type="text" id="names" 
                                name="names" value={names} 
                                onChange={this.inputChangeHandler} 
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Description:</label>
                            <input 
                                type="text" id="description" 
                                name="description" value={description} 
                                onChange={this.inputChangeHandler}
                                className="form-control" 
                            />
                        </div> */}
                        <div className="form-group">
                            <label htmlFor="prescriptionId">
                                <Link className="linkstyle" to="/prescriptions">Prescription:</Link>
                            </label>
                            <select 
                            id="prescriptionId" 
                            name="prescriptionId" value={prescriptionId} 
                            onChange={this.inputChangeHandler}
                            className="form-control">
                                <option>Select Ailment</option>
                            {prescriptionList}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ailmentId">
                                <Link className="linkstyle" to="/ailments">Ailment:</Link>
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
                            <label htmlFor="password">Usage Time:</label>
                            <input 
                                type="time" id="usageTime" 
                                name="usageTime" value={usageTime} 
                                onChange={this.inputChangeHandler}
                                className="form-control" 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Dosage:</label>
                            <input 
                                type="number" id="dosage" 
                                name="dosage" value={dosage} 
                                onChange={this.inputChangeHandler}
                                className="form-control" 
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>   

                    <div className="table-wrap">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Prescription</th>
                                    <th>Ailment</th>
                                    <th>Time</th>
                                    <th>Dosage</th>
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
 
export default Formulas;