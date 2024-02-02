import { render,html } from "../node_modules/lit-html/lit-html.js";




export function contacts(ctx){
    const template =()=> html`
      <div class="contacts-container">
        <a>Contacts from render template</a>
      </div>
    `;
    
    
    render(template(),ctx.main);
}