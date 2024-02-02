import { render,html } from "../node_modules/lit-html/lit-html.js";




export async function library(ctx){

  const data = await (await fetch("https://swapi.dev/api/")).json();
  const rows = Array.from(Object.keys(data));

    const template = () => html`

      <div class="library-container">
        <div>
          <form>
            <input type="text">
            <input type="submit" value="Search">
          </form>
        </div>
        ${rows.map(r => html`<a href=${"/library/" + r}>${r}</a>`)}
      </div>
    `;
    
    
    render(template(),ctx.main);
}