import { html } from "../lib/lit-html/lit-html.js";

export async function category(ctx, myctx) {
   

    let pageNumber=Number(ctx.params.pageNumber);
    let query="/?page=" + pageNumber;
    const url="/library/" + ctx.params.category +"/page/";
    
    if(pageNumber==1){
       query="";
    }
   
    const data = await myctx.getData(ctx.params.category+"/"+ query);
    const results = data.results;
    const next=data.next;
    const previous=data.previous;
    
    let nextHref;
    let prevHref;

    if(data.next){
       nextHref=(url+(pageNumber+1));
    }else{
        nextHref="javascript:void(0)";
    }

    if(data.previous){
        prevHref=(url+(pageNumber-1));
     }else{
        prevHref="javascript:void(0)";
     }
   
    const linkCards = results.map(r => html`
    <li><a 
            href=${"/library/" + ctx.params.category + "/item/" + myctx.getId(r.url)} 
        >${(r.name || r.title)}</a>
    </li>`);
    
    
    
    const template = () => html`
        <h1>${ctx.params.category}</h1>
        <ul>${linkCards}</ul>
        <div id="pages-div" class="row">
            <a  
                href=${prevHref}
                id="prev">${"<< Prev"}
            </a>
            <h2>${pageNumber}</h2>
            <a 
                
                href=${nextHref}
                id="next">${"Next >>"}
            </a>
        </div>
    `;
  
    myctx.renderTemplate(template);
    
}