const aiService = require("../services/ai.service")

module.exports.getReview = async(req,res)=>{
    const prompt = req.body.prompt
    if(!prompt){
        res.status(400).send("Prompt is required!");
        return
    }

    if(prompt.length<=1000){
        const response = await aiService(prompt);
        res.send(response)
        return
    }

    res.status(400).send("Prompt is too long")
}