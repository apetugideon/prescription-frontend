import React from 'react';

function VerifyBtn(props) {
    const btndisp = (props.vstatus === "Y") ? <div>Verify</div> : <div>Cancel</div>
    return ( 
        <div>Verify</div>
    );
}
 
export default VerifyBtn;