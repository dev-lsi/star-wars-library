import { html } from "../lib/lit-html/lit-html.js";

export async function category(ctx, myctx) {

    const canvas=document.querySelector('.canvas');
    canvas.style.display="flex";
    let pageNumber = Number(ctx.params.pageNumber);
    let query = "/?page=" + pageNumber;
    const url = "/library/" + ctx.params.category + "/page/";

    if (pageNumber == 1) {
        query = "";
    }

    const data = await myctx.getData(ctx.params.category + "/" + query);
    const results = data.results;
    const next = data.next;
    const previous = data.previous;

    let nextHref;
    let prevHref;

    if (data.next) {
        nextHref = (url + (pageNumber + 1));
    } else {
        nextHref = "javascript:void(0)";
    }

    if (data.previous) {
        prevHref = (url + (pageNumber - 1));
    } else {
        prevHref = "javascript:void(0)";
    }

    const linkCards = results.map(r => html`
    <li><a class=${"library-link"}
            href=${"/library/" + ctx.params.category + "/item/" + myctx.getId(r.url)} 
        >${(r.name || r.title)}</a>
    </li>`);



    const template = () => html`
        <h1>${ctx.params.category}</h1>
        <ul class="link-cards-ul">${linkCards}</ul>
        <div id="pages-div" class="row">
            <a  
                href=${prevHref}
                id="prev">${"<< Prev"}
            </a>
            <a href="javascript:void(0)">${pageNumber}</a>
            <a 
                
                href=${nextHref}
                id="next">${"Next >>"}
            </a>
        </div>
    `;
   
   const main=document.querySelector("main")
   main.classList.add("planets")
    myctx.renderTemplate(template);
    canvas.style.display="none";
}