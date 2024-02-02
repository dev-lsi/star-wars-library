import { render, html } from "../node_modules/lit-html/lit-html.js";

export function loadHeader(ctx){

    const header = document.querySelector('header');
    let isMenuHidden=true;

    const template = () => html`
        
        <div class="header-nav-row row">
            <div class="right-section">
                <img class="logo" src="./icons/logo256.png" alt="logo">
            </div>
            <div class="center-section">
                <a class="menu-button" @click=${toggleMenu}>Menu</a>
                <nav>
                    <ul class="menu-ul">
                        <li class="menu-option"><a href="/index.html">Home</a></li>
                        <li class="menu-option"><a href="/library">Library</a></li>
                        <li class="menu-option"><a href="/about">About</a></li>
                        <li class="menu-option"><a href="/contacts">Contacts</a></li>
                    </ul>
                </nav>
            </div>
            <div class="left-section">
                <a href="login">Login</a>
            </div>
        </div>
        
       
       
    `;

    render(template(),header)
    const body=document.querySelector('body');
    document.body.addEventListener('click',()=>{if(!isMenuHidden){toggleMenu()}});

    function toggleMenu(e){
        
        const nav = document.querySelector('header nav');
        
        console.log(nav);
         
         if(isMenuHidden){
            nav.style.left=0;
            isMenuHidden=false;
            e.stopPropagation();
        }else{
            nav.style.left='-600px';
            isMenuHidden=true;
        }
    }
}