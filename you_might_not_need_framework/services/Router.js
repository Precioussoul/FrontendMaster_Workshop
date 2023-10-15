const Router = {
    init: () => {
        document.querySelectorAll("a.navlink").forEach((a) => {
            a.addEventListener("click", (event) => {
                event.preventDefault()
                const url = event.target.getAttribute("href")
                Router.go(url)
            })
        })

        Router.go(location.pathname)
    },
    go: (path, addToHistory = true) => {
        console.log(`Going to ${path}`)

        if (addToHistory) {
            history.pushState({ path }, null, path)
        }
        let pageElement = null
        switch (path) {
            case "/":
                pageElement = document.createElement("h1")
                pageElement.textContent = "Menu"
                break

            case "/order":
                pageElement = document.createElement("h1")
                pageElement.textContent = "Your Order"

                break

            default:
                pageElement = document.createElement("h1")
                pageElement.textContent = "Page cannot be found"
                break
        }
        const main = document.querySelector("main")
        main.innerHTML = ""
        main.appendChild(pageElement)
    },
}

export default Router