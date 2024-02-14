import {html} from "../lib/lit-html/lit-html.js";

export function login(ctx,myctx){

    const template=()=>html`<h1>Login Page</h1>`;

    myctx.renderTemplate(template);
}