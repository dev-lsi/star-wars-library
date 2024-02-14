import { category } from "./category";

export async function pageHandler(ctx,myctx,e){
    if(e==undefined){
        ctx.params.page=1;
    }
    e.preventDefault();
    e.stopPropagation();
            if (e.target.id == 'prev') { 
                ctx.params.page =  Number(ctx.params.page)-1; 
            }else if (e.target.id == 'next') {
                ctx.params.page = Number(ctx.params.page)+1;
            }
            category(ctx,myctx);
    

}