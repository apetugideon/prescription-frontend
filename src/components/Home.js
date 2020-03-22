import React, { Component } from 'react';
import  { Redirect, Link } from 'react-router-dom';
import { getData, notEmptyArray, localStore, dateFormat, postData, padStr, putData } from '../Actions/Actions';
import TopNav from './TopNav.js';
import VerifyBtn from './VerifyBtn.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            isAdmin:false,
            placementsRecs: [],
            markToVerify: ''
        }
        this.activateThisFormula = this.activateThisFormula.bind(this);
    }

    validateUser() {
        const isAuthenticated = localStore('','isAuthenticated','get');
        const isAdmin = localStore('','isAdmin','get');
        this.setState({['isAuthenticated']: isAuthenticated});
        this.setState({['isAdmin']: isAdmin});
    }

    componentDidMount() {
        //if (this.state.isAuthenticated) {
            getData('/placements/current').then((rdata) => {
                this.resolvePlacementValues(rdata);
            });
        //}
    }

    resolvePlacementValues(rdata) {
        if (notEmptyArray(rdata)) {
            rdata.forEach((item, pos) => {
                let resolvedPrescrip = [];
                item['Ailment']['Formulas'].forEach((itm, num) => {
                    const currPrescrId = itm['prescriptionId'];
                    if (!resolvedPrescrip[currPrescrId]) {
                        resolvedPrescrip[currPrescrId] = [itm];
                    } else {
                        resolvedPrescrip[currPrescrId][resolvedPrescrip[currPrescrId].length+1] = itm;
                    }
                });

                let finalPrescrip = [];
                if (notEmptyArray(resolvedPrescrip)) {
                    resolvedPrescrip.forEach((posI, pos) => { 
                        finalPrescrip.push(posI);
                    });
                }
                item['Ailment']['Prescriptions'] = finalPrescrip;
            });
        }     
        this.setState({['placementsRecs']: rdata});
    }

    activateThisFormula(event) {
        event.preventDefault();
        const currId = event.target.id;
        const currValues = currId.split("===");

        if ((currValues[4] !== "") && (currValues[5] !== "")) {
            putData({
                formulaId: currValues[0] || "",
                prescriptionId: currValues[1] || "",
                ailmentId: currValues[2] || "",
                placementId: currValues[3] || "",
                status: (currValues[5] === "Y") ? "N" : "Y"
            }, `/verifications/${currValues[4]}`).then((rdata) => {
                if (rdata.status === "success") {
                    getData('/placements/current').then((rdata) => {
                        this.resolvePlacementValues(rdata);
                    });
                } 
            });
        } else {
            postData({
                formulaId: currValues[0] || "",
                prescriptionId: currValues[1] || "",
                ailmentId: currValues[2] || "",
                placementId: currValues[3] || "",
                status: "Y"
            }, '/verifications').then((rdata) => {
                if (rdata.status === "success") {
                    getData('/placements/current').then((rdata) => {
                        this.resolvePlacementValues(rdata);
                    });
                } 
            });
        }
    }

    verifyBtn(status) {    
        return (
            <div>
                {((status) && (status === "Y")) ? <div>Cancel</div> : <div>Verify</div>}
            </div>
        );
    }

    render() { 
        const today = new Date();
        let useDate = `${today.getUTCFullYear()}-${padStr(today.getUTCMonth()+1, 2)}-${padStr(today.getUTCDate(), 2)}`;

        const tableDisplay = (
            <div>
                {(notEmptyArray(this.state.placementsRecs)) 
                ?
                    this.state.placementsRecs.map((placement, index) => 
                    <div  className="inner-wrapper2" key={index}>
                        <div style={{marginBottom:'5px'}}>
                            <div style={{float:'left'}}>
                                <span style={{fontSize:'20px', fontWeight:'bolder'}}>{placement['User']['names']}</span>&nbsp;
                                <span style={{fontSize:'15px', fontWeight:'bold', color:'#999'}}>({placement['Ailment']['names']} Medications)</span>
                            </div>&nbsp; 
                            <div style={{float:'right'}}>
                                <span className="datedisp bg-success text-white">{dateFormat(placement['startDate'])}</span> - <span className="datedisp bg-success text-white">{dateFormat(placement['endDate'])}</span>
                            </div>
                        </div>

                        {(notEmptyArray(placement['Ailment']['Prescriptions'])) ?  
                            placement['Ailment']['Prescriptions'].map((prescription, pos) => 
                                <div style={{width:'100%', float:'left', borderTop:'1px solid #ccc', padding:'8px 0 4px 0'}}>
                                    <span className="dose-title">{prescription[0]['Prescription']['names']}</span>
                                    {(notEmptyArray(prescription)) ?
                                        prescription.map((frmla, j) => 
                                            <span className="dosespan" style={
                                                ((frmla['Verifications'][0]) 
                                                && (frmla['Verifications'][0]['status'])
                                                && (frmla['Verifications'][0]['status'] === "Y")
                                                && (useDate == frmla['Verifications'][0]['useDate'])) 
                                                ? {border:'1px solid green'} 
                                                : {border:'1px solid red'}} >
                                                <div style={{width:'100%'}}>
                                                    <span style={{borderRight:'1px solid #ccc', padding:'1px 5px'}}>
                                                        {frmla['dosage']} dose
                                                    </span>
                                                    <span style={{padding:'1px 5px'}}>
                                                        &nbsp;{frmla['usageTime']}
                                                    </span>
                                                </div>
                                                <div style={{width:'100%', margin:'auto'}}>
                                                    <button 
                                                        type="button" 
                                                        id={`${frmla['id']}===${frmla['Prescription']['id']}===${placement['ailmentId']}===${placement['id']}===${((frmla['Verifications'][0]) && (frmla['Verifications'][0]['id'])) ? frmla['Verifications'][0]['id'] : ""}===${((frmla['Verifications'][0]) && (frmla['Verifications'][0]['status'])) ? frmla['Verifications'][0]['status'] : ""}`}
                                                        className="verify-btn"
                                                        onClick={this.activateThisFormula}>
                                                        {((frmla['Verifications'][0]) 
                                                         && (frmla['Verifications'][0]['status']) 
                                                         && (frmla['Verifications'][0]['status'] === "Y")) 
                                                         ? "Cancel Verification" : "Verify Use! " }
                                                    </button>
                                                </div>
                                            </span>
                                        ) : <span>No Formula</span>
                                    }
                                </div>
                            ) 
                        : 
                            <div>No Prescriptions</div>
                        }
                    </div>) 
                :
                <div>No Record Found</div>
            }
            </div>
        );


        return ( 
            <div>
                <TopNav />
                <div className="container-fluid container-wrap">
                    <div className="row">
                        <div className="col-lg-2 col-md-1">&nbsp;</div>
                        <div className="col-lg-8 col-md-10 col-sm-12" id="work-area2">
                            { tableDisplay }
                        </div>
                        <div className="col-lg-2 col-md-1">&nbsp;</div>
                    </div>
                </div>
            </div>
            
        );
    }
}
 
export default Home;