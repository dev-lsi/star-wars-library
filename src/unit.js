import { html } from "../lib/lit-html/lit-html.js";


export async function unit(ctx, myctx) {

    const canvas=document.querySelector('.canvas');
    canvas.style.display="flex";
    

    const category = ctx.params.category;
    const itemId = ctx.params.itemId;

    const data = await myctx.getData(category + "/" + itemId);
    console.log(data)
    const dataKeysArr = Array.from(Object.keys(data));
    if(!dataKeysArr){
        alert("data===null")
    }
    const rows = Promise.all(dataKeysArr.map(async k => {
        
        if( k=='url' || k=='edited' || k=="created" || k =="episode_id"||k=="title"||k=="name"){ // data[k] is Unused
            console.log("key:"+k)
            return  "";
        }
        
        if((data[k].indexOf("https") !== -1)){ //data[k] is a single link
            
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

            return html`
            <h5>${k.replace("_"," ").toUpperCase()}</h5>
            <a class=${"library-link"} href=${"/library/" + category + "/item/" + id}>${unitName}</a>`;
        }
        
        if(!(Array.isArray(data[k]))){  // data[k] is not array 
            
            
            return html`<div><span class="data-name">${k.replace("_"," ") + ": "}</span><span class="data-content">${data[k]}</span></div>`;
        }   

        if ( Array.isArray(data[k])) { //data[k] is array of links
            if(data[k].length===0){
                return "---";
            }
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
                
                return html`
                <a  class=${"library-link"}
                    href=${"/library/" + category + "/item/" + id}>${unitName}
                </a>`;
            })); 

            const unitsDataArrResolved = await unitsDataArr;
            return html`
                <h5>${k.replace("_"," ").toUpperCase()}</h5>
                ${unitsDataArrResolved}
            `;
        };
    }));
     
    const rowsResolved = await rows;
   
    const template=()=>html`<h1>${data.name||data.title}</h1><div class="rows-div">${rowsResolved}</div>`;
    myctx.renderTemplate(template); 
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    canvas.style.display="none";   
}                
            
    
