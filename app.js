import page from "./node_modules/page/page.mjs";
import { home } from "./src/home.js";
import { about } from "./src/about.js";
import { contacts } from "./src/contacts.js";
import { library } from "./src/library.js";
import {subLibrary} from "./src/subLibrary.js"
import { login } from "./src/login.js";
import { loadHeader } from "./templates/header-template.js";

document.addEventListener('DOMContentLoaded', app);

function app() {

    const main = document.querySelector('main');
    const ctx = {
        main
    };

    loadHeader(ctx);
    let pageNum="";
    let category="";

    page('/', '/index.html');
    page('/index.html', () => home(ctx));
    page('/about', () => about(ctx));
    page('/contacts', () => contacts(ctx));
    page('/library', () => library(ctx));
    page(`/library/people/${pageNum}`, () => subLibrary(ctx,"people",pageNum));
    page(`/library/species/${pageNum}`, () => subLibrary(ctx,"species",pageNum));
    page(`/library/planets/${pageNum}`, () => subLibrary(ctx,"planets",pageNum));
    page(`/library/starships/${pageNum}`, () => subLibrary(ctx,"starships",pageNum));
    page(`/library/vehicles/${pageNum}`, () => subLibrary(ctx,"vehicles",pageNum));
    page(`/library/films/${pageNum}`, () => subLibrary(ctx,"films",pageNum));

    page('/login', () => login(ctx));
    page.start();

}
