import {html} from "../lib/lit-html/lit-html.js";

export function showHero(myctx){

    const template=()=>html`<h1>Hero Data Page</h1>`;

    myctx.renderTemplate(template);
}