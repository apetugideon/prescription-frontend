import React, { Component } from 'react';
import  { Redirect, Link } from 'react-router-dom'
import Container from './Container.js';
import { postData, getData, deleteData, notEmptyArray } from '../Actions/Actions';
import TopNav from './TopNav.js';


class Ailments extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            names: '',
            description: '',
            symptons: '',
            ailmentRecs: []
        }
    }

    componentDidMount() {
        getData('/ailments').then((rdata) => {
            this.setState({['ailmentRecs']: rdata});
        });
    }


    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }


    createHandler = (event) => {
        event.preventDefault();
        postData(this.state, '/ailments').then((rdata) => {
            this.setState({['ailmentRecs']: rdata});
        })
    }


    deleteRec = (event) => {
        event.preventDefault();
        deleteData({}, `/ailments/${event.target.id}`).then((rdata) => {
            this.setState({['ailmentRecs']: rdata});
        })
    }


    render() { 
        const {names, description, symptons} = this.state;
        let tableDisplay = "";
        if (notEmptyArray(this.state.ailmentRecs)) {
            tableDisplay = this.state.ailmentRecs.map((item, index) => <tr key={index}><td>{item['names']}</td><td>{item['description']}</td><td>{item['symptons']}</td><td><a id={item['id']} href="#" onClick={this.deleteRec}>Delete</a></td></tr>);
        }

        return ( 
            <div>
                <TopNav />
                <Container>
                    <form onSubmit={this.createHandler} style={{padding:'30px 40px 50px 40px'}}>
                        <h2 style={{textAlign:'center', marginBottom:'30px'}}>Add Ailment</h2>
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
                        <div className="form-group">
                            <label htmlFor="password">Symptons:</label>
                            <input 
                                type="symptons" id="symptons" 
                                name="symptons" value={symptons} 
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
                                    <th>Symptons</th>
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
 
export default Ailments;