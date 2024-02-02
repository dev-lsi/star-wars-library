import { render, html } from "../node_modules/lit-html/lit-html.js";

export async function home(ctx) {

    const data = await (await fetch("https://swapi.dev/api/")).json();

    const template = () => html`
        <div class="home-container">
            <section id="welcome-section">
                <div id="yoda-container">
                    <img id="yoda" src="../images/yoda.png"/>
                </div>
                <div class=text>
                    <h1>Welcome dear ${'Guest'}!</h1>
                    <p>All the Star Wars data you've ever wanted:</p>
                    <p>Planets, Spaceships, Vehicles, People, Films and Species</p>
                    <p>From all SEVEN Star Wars films</p>
                    <p>Now with The Force Awakens data!</p>
                </div>
                <div id="x-wings-container">
                    <img  id="x-wings" src="../images/x-wing.png"/>
                </div>
            </section>
            
                ${Object.keys(data).map(k => html`
            <section class="result-section">
                <div>
                    <h2>${k}</h2>
                    <p>Find all information abotut ${k} in Star Wars movies!</p>
                </div>
                <div class='images-div'>
                    <img src=${"../images/home/"+ k + ".jpg"}/>
                </div>
                <a class = link-button href=${data[k]}>${"Show me all "+k}</a>
            <section>
                `)}
            
        </div>
      
    `;

    render(template(), ctx.main);

}