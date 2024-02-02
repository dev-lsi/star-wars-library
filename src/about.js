import { render,html } from "../node_modules/lit-html/lit-html.js";




export function about(ctx){
    const template =()=> html`
     <section>
       <p>About from render template</p>
     </section>
    `;
    
    
    render(template(),ctx.main);
}