import {render} from "../lib/lit-html/lit-html.js";
import page from "../lib/page/page.mjs";

function renderTemplate(template){
    const main = document.querySelector('main');
    render(template(),main);
}

async function getData(options){

    const baseURL="https://swapi.dev/api/";
    let url="";

    if(options!==undefined){
      url = baseURL + options;
    }else{
        url = baseURL;
    }
    const resp = await fetch(url);
    return await resp.json();
    
}

async function getUnitData(url){
    const resp = await fetch(url);
    return await resp.json();
}

function callPath(event,path){
    event.preventDefault();
    page(path);
}

function getId(r) {
    const arr = r.split("/");
    arr.pop();
    return arr.pop();
}

export const myctx = {
   renderTemplate,
   getData,
   callPath,
   getId,
   getUnitData
}