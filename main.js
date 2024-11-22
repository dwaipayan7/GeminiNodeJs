const { GoogleGenerativeAI } = require("@google/generative-ai");
const { config } = require("dotenv");
config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(express.json())
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.send("Hello, GEMINI!")
})

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "value of pie in math";

const generate = async(prompt) =>{
    try {
        const result = await model.generateContent(prompt);
        // console.log(result.response.text());
        return result.response.text();
    } catch (error) {
        console.log(error);
    }
}

// generate();

app.get('/api/content', async (req, res) => {

    try {

        const data = req.body.prompt;
        const result = await generate(data);
        res.send({
            "result":result
        })

    } catch (error) {
        console.log(error)
    }

})

app.listen(3000, (req,res)=>{
    console.log("Server is Running 3000")
})