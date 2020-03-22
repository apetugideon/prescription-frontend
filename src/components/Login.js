import React, { Component } from 'react';
import Container from './Container.js';
import { postData, localStore, checkUser } from '../Actions/Actions';
import TopNav from './TopNav.js';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: ''
        }
    }

    createHandler = (event) => {
        event.preventDefault();
        postData(this.state, '/user/login').then((rdata) => {
            console.log('rdata',rdata);
            
            localStore(rdata.data.token, 'tokenUser', 'add');
            checkUser();
            setTimeout(() => {
                console.log(localStore('','isAuthenticated','get'));
                
                this.props.history.push('/');
            }, 1000);
        }); 
    }


    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value.trim()});
    }

    render() {
        const {email, password} = this.state;
        return ( 
            <div>
                <TopNav />
                <Container>
                    <form onSubmit={this.createHandler} style={{padding:'30px 40px 50px 40px'}}>
                        <h2 style={{textAlign:'center', marginBottom:'30px'}}>User Login</h2>
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
            </div>
        );
    }
}
 
export default Login;