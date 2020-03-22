import React, { Component } from 'react';
import Container from './Container.js';
import { postData } from '../Actions/Actions';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            names: '',
            email: '',
            phoneNum: '',
            password: ''
        }
    }

    createHandler = (event) => {
        event.preventDefault();
        const retData = postData(this.state,'/user/create');
    }

    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value.trim()});
    }

    render() { 
        const {names, email, phoneNum, password} = this.state;
        return ( 
            <Container>
                <form id="myform"  onSubmit={this.createHandler} style={{padding:'30px 40px 50px 40px'}}>
                    <h2 style={{textAlign:'center', marginBottom:'30px'}}>User Registeration</h2>

                    <div className="form-group">
                        <label htmlFor="names">Names:</label>
                        <input 
                            type="text" id="names" 
                            name="names" value={names} 
                            onChange={this.inputChangeHandler}
                            className="form-control" 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">E-mail:</label>
                        <input 
                            type="email" id="email" 
                            name="email" value={email} 
                            onChange={this.inputChangeHandler} 
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNum">Phone number:</label>
                        <input 
                            type="text" id="phoneNum" 
                            name="phoneNum" value={phoneNum} 
                            onChange={this.inputChangeHandler} 
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" id="password" 
                            name="password" value={password} 
                            onChange={this.inputChangeHandler}
                            className="form-control" 
                        />
                    </div>

                    <button type="submit">Submit</button>
                </form>   
            </Container>
        );
    }
}
 
export default Register;