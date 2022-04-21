const recipeRoutes = require('./recipes')
const appRouter = (app,fs) => {
    app.get('/', (reg, res) => {
        res.send({"Messesge" : "Welcome to test server"})

    })
    recipeRoutes(app,fs)
    

}
module.exports = appRouter;