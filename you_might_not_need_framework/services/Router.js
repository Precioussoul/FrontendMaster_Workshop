const Router = {
    init: () => {
        document.querySelectorAll("a.navlink").forEach((a) => {
                a.addEventListener("click", (event) => {
                    event.preventDefault()
                    const url = event.target.getAttribute("href")
                    Router.go(url)
                })
            })
            // Event handlers for the URL changes
        window.addEventListener("popstate", (event) => {
            Router.go(event.state.route, false)
        })
        Router.go(location.pathname)
    },
    go: (route, addToHistory = true) => {
        console.log(`Going to ${route}`)

        if (addToHistory) {
            history.pushState({ route }, null, route)
        }
        let pageElement = null
        switch (route) {
            case "/":
                pageElement = document.createElement("menu-page")
                break

            case "/order":
                pageElement = document.createElement("order-page")

                break

            default:
                if (route.startsWith("/product-")) {
                    pageElement = document.createElement("details-page")
                    pageElement.textContent = "Details"
                    const paramId = route.substring(route.lastIndexOf("-") + 1)
                    pageElement.id = paramId
                }
                break
        }
        if (pageElement) {
            const main = document.querySelector("main")
            main.innerHTML = ""
            main.appendChild(pageElement)
            window.scrollX = 0
            window.scrollY = 0
        }
    },
}

export default Router