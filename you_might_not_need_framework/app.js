import Store from "./services/Store.js"
import { loadData } from "./services/Menu.js"
import Router from "./services/Router.js"

// link my web component
import { MenuPage } from "./components/MenuPage.js"
import { OrderPage } from "./components/OrderPage.js"
import { DetailsPage } from "./components/DetailsPage.js"

window.app = {}
app.store = Store
app.router = Router

// its better to wait for the DOM  before manipulation
window.addEventListener("DOMContentLoaded", () => {
    loadData()
    app.router.init()
})