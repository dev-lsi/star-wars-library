import page from "./node_modules/page/page.mjs";

import { home } from "./src/home.js";
import { library } from "./src/library.js";
import { about } from "./src/about.js";
import { login } from "./src/login.js";
import { notFound } from "./src/notFound.js";
import { category } from "./src/category.js";
import {myctx} from "./util/myctx.js"
import { unit } from "./src/unit.js";



async function app() {

    page('/index.html',"/");
    page('/',(ctx)=>home(ctx,myctx));
    page('/library',(ctx)=>library(ctx,myctx));
    page('/library/:category/page/:pageNumber',(ctx)=>category(ctx,myctx));
    page('/library/:category/item/:itemId',(ctx)=>unit(ctx,myctx));
    page('/about',(ctx)=> about(ctx,myctx));
    page('/login',(ctx)=> login(ctx,myctx));
    page('/*', (ctx)=>notFound(ctx,myctx));
    page.start();
}

app();