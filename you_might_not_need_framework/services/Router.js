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
            history.pushState({ route: path }, null, path)
        }
    },
}

export default Router