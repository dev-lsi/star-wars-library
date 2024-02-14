import {html} from "../lib/lit-html/lit-html.js";
import page from "../lib/page/page.mjs";

export async function library(ctx,myctx){
    const loading=()=>html`<p>loading</p>`
    myctx.renderTemplate(loading);
    const data  = await myctx.getData("");
    const categories = Array.from(Object.keys(data));
    
    const categoriesHTML = categories.map(categoryName => html`
    <li>
        <a 
            @click=${(e)=>myctx.callPath(e,"/library/" + categoryName + "/page/1")} 
            href=${"/library/" + categoryName + "/page/1/"}
        >
            ${categoryName}
        </a>
    </li>`);
   
    const template = () => html`
    <ul class="col">
        ${categoriesHTML}
    </ul>
    `;
    
    
    myctx.renderTemplate(template);
    
}  