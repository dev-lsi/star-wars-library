import {html} from "../node_modules/lit-html/lit-html.js";

export function home(ctx,myctx){

    const template=()=>html`<h1>Home Page</h1>`;

    myctx.renderTemplate(template);
}