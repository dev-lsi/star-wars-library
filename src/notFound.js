import {html} from "../node_modules/lit-html/lit-html.js";

export function notFound(ctx,myctx){

   const template=()=>html`<h1>Not Found!</h1>`;

    myctx.renderTemplate(template);
}