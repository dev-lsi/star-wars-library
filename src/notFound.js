import {html} from "../lib/lit-html/lit-html.js";

export function notFound(ctx,myctx){

   const template=()=>html`<h1>Not Found!</h1>`;

    myctx.renderTemplate(template);
}