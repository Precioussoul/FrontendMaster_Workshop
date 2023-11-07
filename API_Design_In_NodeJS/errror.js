setTimeout(() => {
  throw new Error("oops")
}, 300)

// outside express error handler

process.on("uncaughtException", () => {})

process.on("unhandledRejection", () => {})
