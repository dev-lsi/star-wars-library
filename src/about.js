import {html} from "../lib/lit-html/lit-html.js";

export function about(ctx,myctx){
   
    const template=()=>html`<h1>About Page</h1>`;

    myctx.renderTemplate(template);
}