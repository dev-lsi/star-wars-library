import { render,html } from "../node_modules/lit-html/lit-html.js";




export function login(ctx){
    const template =()=> html`
     <section>
       <p>Login from render template</p>
     </section>
    `;
    
    
    render(template(),ctx.main);
}