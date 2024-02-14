import { html } from "../lib/lit-html/lit-html.js";


export async function unit(ctx, myctx) {

    const canvas=document.querySelector('.canvas');
    canvas.style.display="flex";
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    const category = ctx.params.category;
    const itemId = ctx.params.itemId;

    const data = await myctx.getData(category + "/" + itemId);
    console.log(data)
    const dataKeysArr = Array.from(Object.keys(data));

    const rows = Promise.all(dataKeysArr.map(async k => {
        
        if( k=='url' || k=='edited' || k=="created" || k =="episode_id"||k=="title"||k=="name"){ // data[k] is Unused
            console.log("key:"+k)
            return  "";
        }
        
        if((data[k].indexOf("https") !== -1)){ //data[k] is a single link
            console.log("data[k] is a single link: " + data[k]+"typeof= "+typeof data[k]);
            const url = data[k];
            const id = myctx.getId(url);

            const response = await myctx.getUnitData(url);
            const unitName = response.name || response.title;

            let category;
            if(k=='homeworld'){
                category="planets";
            }else if(k=="pilots"||k=="residents"||k=="characters"){
                category="people";
            }else{
                category=k;
            }

            return html`<h2>${k.replace("_"," ")}</h2><a href=${"/library/" + category + "/item/" + id}>${unitName}</a>`;
        }
        
        if(!(Array.isArray(data[k]))){  // data[k] is not array 
            
            console.log("data[k] is not array: "+ k)
            return html`<p>${k.replace("_"," ") + ": " + data[k]}</p>`;
        }   

        if ( Array.isArray(data[k])) { //data[k] is array of links
            console.log(k + " array of lenght: " + data[k].length) 
            const linksArr = data[k];
            
            const unitsDataArr = Promise.all(linksArr.map(async currentLink => {
                const id = myctx.getId(currentLink);
                const response = await myctx.getUnitData(currentLink);
                const unitName = response.name || response.title;

                let category;
                if(k=='homeworld'){
                    category="planets";
                }else if(k=="pilots"||k=="residents"||k=="characters"){
                    category="people";
                }else{
                    category=k;
                }
                
                return html`<a href=${"/library/" + category + "/item/" + id}>${unitName}</a>`;
            })); 

            const unitsDataArrResolved = await unitsDataArr;
            return html`
                <h2>${k.replace("_"," ")}</h2>
                ${unitsDataArrResolved}
            `;
        };
    }));
     
    const rowsResolved = await rows;
    console.log(rowsResolved)
    const template=()=>html`<h2>${data.name||data.title}</h2>${rowsResolved}`;
    myctx.renderTemplate(template); 

    canvas.style.display="none";   
}                
            
    
