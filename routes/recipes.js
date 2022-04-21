const recipeRoutes = (app, fs) => {
    var data = fs.readFileSync('data.json');
    var elements = JSON.parse(data);

    //Get all recipe names
    app.get('/recipes', (req,res) => {
        var recipeNames = [];
        for(let i = 0; i < elements.recipes.length; i++){
          recipeNames.push(elements.recipes[i].name);
        }
        console.log(recipeNames);
        res.send({'recipeNames': recipeNames, 'status': 200});
    });

    app.get('/recipes/details/:recipeName', (req,res) => {
        var recipeToFind = req.params.recipeName;
        var flag = false;
        for(let i = 0; i < elements.recipes.length; i++){
        if(elements.recipes[i].name == recipeToFind){
            flag = true;
            res.send({
            'details' : {
            "ingredients" : [elements.recipes[i].ingredients],
            "numSteps" : elements.recipes[i].instructions.length
            }})
        }
        }
        if(!flag){
        res.send({'Response body (JSON)' : {}, 'Status': 200})
        }
    });

    app.post('/recipes', (req,res)=> {
        var flag = true;
        for(let i = 0; i < elements.recipes.length; i++){
            if(elements.recipes[i].name == req.body.name){
            flag = false
            }
        }
        if(flag){
            let newRecipe = {
            name: req.body.name,
            ingredients: req.body.ingredients,
            instructions : req.body.instructions
            }
            //update elements
            elements.recipes.push(newRecipe);
            //update json file
            fs.writeFileSync('./data.json',  JSON.stringify(elements, null, 2))
            res.send({'Status': 201});

        }
        else{
            res.send({"error" : "Recipe already exists", "Status" : 400})
        }
    });

    app.put('/recipes' ,(req,res) => {
        var flag = false;
        let indexOfChangedRecipe = 0;
        for(let i = 0; i < elements.recipes.length; i++){
            if(elements.recipes[i].name == req.body.name){
            indexOfChangedRecipe = i;
            flag = false
            }
        }
        if(!flag){
            let updatedRecipe = {
            name: req.body.name,
            ingredients: req.body.ingredients,
            instructions : req.body.instructions
            }
            console.log(elements.recipes.length);
            elements.recipes[indexOfChangedRecipe] = updatedRecipe;
            fs.writeFileSync('./data.json', JSON.stringify(elements, null, 2) )
            res.send({'Status' : 204})

        } else{
            res.send({"Error": "recipe does not exist"});
        }
    })
}
module.exports = recipeRoutes;