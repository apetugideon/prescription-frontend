import React, { Component } from 'react';
import  { Redirect, Link } from 'react-router-dom'
import Container from './Container.js';
import { postData, getData, deleteData } from '../Actions/Actions';
import TopNav from './TopNav.js';


class Prescriptions extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            names: '',
            description: '',
            prescriptionRecs: []
        }
    }

    componentDidMount() {
        getData('/prescriptions').then((rdata) => {
            this.setState({['prescriptionRecs']: rdata});
        });
    }

    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    createHandler = (event) => {
        event.preventDefault();
        postData(this.state, '/prescriptions').then((rdata) => {
            this.setState({['prescriptionRecs']: rdata});
        })
    }

    deleteRec = (event) => {
        event.preventDefault();
        deleteData({}, `/prescriptions/${event.target.id}`).then((rdata) => {
            this.setState({['prescriptionRecs']: rdata});
        })
    }

    render() { 
        const {names, description} = this.state;
        let tableDisplay = this.state.prescriptionRecs.map((item, index) => <tr key={index}><td>{item['names']}</td><td>{item['description']}</td><td><a id={item['id']} href="#" onClick={this.deleteRec}>Delete</a></td></tr>);

        return ( 
            <div>
                <TopNav />
                <Container>
                    <form onSubmit={this.createHandler} style={{padding:'30px 40px 50px 40px'}}>
                        <h2 style={{textAlign:'center', marginBottom:'30px'}}>Add Prescription</h2>
                        <div className="form-group">
                            <label htmlFor="email">Names:</label>
                            <input 
                                type="names" id="names" 
                                name="names" value={names} 
                                onChange={this.inputChangeHandler} 
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Description:</label>
                            <input 
                                type="description" id="description" 
                                name="description" value={description} 
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
                                    <th>Names</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableDisplay}
                            </tbody>
                        </table>
                    </div>
                </Container>
            </div>
        );
    }
}
 
export default Prescriptions;