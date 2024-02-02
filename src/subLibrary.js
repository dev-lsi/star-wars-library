import { render,html } from "../node_modules/lit-html/lit-html.js";

export async function subLibrary(ctx, category, pageNumber) {
    let data;
    if(pageNumber==""){
        data = await (await fetch("https://swapi.dev/api/" + category)).json();
    }else{
        data = await (await fetch("https://swapi.dev/api/" 
           + category + "/" + "?page="
           + pageNumber)).json();

        console.log(data)
    }
    

    function togglePages(){

    }

    console.log(data);
    const count = data.count;
    const next = data.next;
    const previous = data.previous;
    const results = data.results;
    let prevButtonClass="hidden";
    let nextButtonClass="hidden";
    let currentPage=1;

    if(data.previous){
        prevButtonClass="shown";
        currentPage = Number(data.previous.split('page=')[1])+1;
    }else{
        prevButtonClass="hidden";
    }
    if(data.next){
        nextButtonClass = "shown";
        currentPage=Number(data.next.split('page=')[1])-1;
    }
    else{
        nextButtonClass = "hidden";
    }
    console.log(results);


    const rows = results.map(res=>`${res["name"]||res["title"]}`);

    const template=()=>html`
       
       <div class="library-container">
            ${rows.map(r=>html`<a>${r}</a>`)}
       <div>
       <div class="paging-buttons">
            <a 
                class=${prevButtonClass}
                href=${"/library" + "/" + category + "/" + (currentPage - 1)}
                id ="previous-btn"

                @click=${(e)=>{
                e.preventDefault();
                subLibrary(ctx, category, (currentPage - 1));
                }}
                
                
            >
                ${"<< Prev "}
            </a>

            <span>${"page " + currentPage + "  of   " + Math.ceil(data.count/10) }</span> 

            <a 
               class=${nextButtonClass}
               @click=${(e)=>{
                e.preventDefault();
                subLibrary(ctx, category, (currentPage + 1));
                }}
               href=${"/library" + "/" + category + "/" + (currentPage + 1)} 
               id = next-btn 
            >
               ${"Next >> "}
            </a>
       <div>
    `;

    render(template(),ctx.main);
}