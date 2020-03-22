import fetch from 'isomorphic-fetch';

const base_url = 'http://localhost:8000/api';

export function checkUser(point="") {
    const retObj = {};
    const tokenUser = localStore('','tokenUser','get') || "";
    if (tokenUser != "") {
        postData({}, '/user/check').then((rdata) => {
            localStore(rdata['isValid'], 'isAuthenticated', 'add');
            localStore(rdata['isAdmin'], 'isAdmin', 'add');
        });
    }
}


export function postData(data, dUrl) {
    const tokenUser = localStore('','tokenUser','get') || "";
    return fetch(`${base_url}${dUrl}`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenUser
        }
    })
    .then(response => response.json())
    .catch((error) => {
        console.log(error);
    });
}



export function putData(data, dUrl) {
    const tokenUser = localStore('','tokenUser','get') || "";
    return fetch(`${base_url}${dUrl}`, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenUser
        }
    })
    .then(response => response.json())
    .catch((error) => {
        console.log(error);
    });
}


export function getData(dUrl) {
    const tokenUser = localStore('','tokenUser','get') || "";
    return fetch(`${base_url}${dUrl}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenUser
        }
    })
    .then(response => response.json())
    .catch((error) => {
        console.log(error);
    });
}


export function deleteData(data, dUrl) {
    const tokenUser = localStore('','tokenUser','get') || "";
    return fetch(`${base_url}${dUrl}`, {
        method: 'DELETE',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenUser
        }
    })
    .then(response => response.json())
    .catch((error) => {
        console.log(error);
    });
}


export function notEmpty(obj) {
    return Object.keys(obj).length !== 0 && obj.constructor === Object
}
  

export function notEmptyArray(array) {
    return (Array.isArray(array) && (array.length > 0)) ? true : false;
}


export function localStore(arr, desc, actn) {
    try {
        let retn;
        if (typeof(Storage) !== undefined) {
            if (actn === "add") {
                let stringifyd = JSON.stringify(arr);
                if (localStorage.setItem(desc, stringifyd)) { 
                    retn = true; 
                } else { 
                    retn = false; 
                }
            } else if(actn === "get") {
                retn = localStorage.getItem(desc);
                if (retn !== "{}") { 
                    retn = JSON.parse(retn); 
                }
            } else if(actn === "remove") {
                if (localStorage.removeItem(desc)) { 
                    retn = true; 
                } else { 
                    retn = false; 
                }
            }
        } else {/**Sorry! No Web Storage support..**/}
        return retn;
    } catch (e) { console.log(e); }
}

export function dateFormat(inDate) {
    //(new Date(inDate)).toDateString;
    const d = new Date(inDate);
    return d.toDateString();
}


export function padStr(input, width, charc='') {
    return String(input).padStart(width, charc || '0');
}