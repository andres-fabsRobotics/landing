/*
	Created by: FabiÃ¡n DoÃ±aque
	Copyright: Fabs Robotics SLU
	Created on: 2020-08-21 
*/

/////////////////
//  Constants  //
/////////////////

export const res = { Ok: 0, ClientError: 1, ServerError: 2, UnAuthorized: 3 };

/////////////////
//  Functions  //
/////////////////

// http functions
export function postTo(data,dataType,url,callback){
	const xhttp = new XMLHttpRequest();
	xhttp.onload = () => { checkResponse(xhttp.responseText,callback); };
	xhttp.open('POST', url);
	if(dataType == "form") xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	else if(dataType == "json") xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhttp.send(data);
}

export function postForm(form,url,callback){
	postTo(form,"form",url,callback);
}

export function postJSON(json, url, callback){
	const data = JSON.stringify(json);
	postTo(data,"json",url,callback);
}

export function postFile(file,url,callback){
	const data = new FormData();
	data.append('file',file);
	postTo(data,null,url,callback);
}

export function postNamedFile(file,filename,url,callback){
	const data = new FormData();
	data.append('file',file,filename);
	postTo(data,null,url,callback);
}

export function checkResponse(data,callback){
	let response = {};
	let flag = true;
	try {
		response = JSON.parse(data);
	} catch (e){
		console.log("jsonError:");
		console.log(data);
		console.log(e.message);
		flag = false;
	}
	if(flag){
		if(response.code == res.UnAuthorized) window.location = "/login/index.html";
		else if(response.code == res.ServerError) console.log(response.message);
		else callback(response);
	}
}

// Time functions

export function getTimestamp(){
    let date = new Date();
    let year = date.getUTCFullYear();
    let month = addZero(date.getUTCMonth()+1);
    let day = addZero(date.getUTCDate());
    let hours = addZero(date.getUTCHours());
    let minutes = addZero(date.getUTCMinutes());
    let seconds = addZero(date.getUTCSeconds());
    return year+"-"+month+"-"+day+"-"+" "+hours+":"+minutes+":"+seconds;
}

export function addZero(number){
    if(number < 10) number = "0"+number;
    return number;
}

export function getUTCDateTime(){
    return new Date().toJSON().slice(0,19).replace('T',' ');
}