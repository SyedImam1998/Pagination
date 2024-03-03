const express= require('express');
const cors= require('cors');
const data= require('./data.json');
const app =express();
const itemsPerPage=3;

app.use(cors())

app.get('/getData',(req,res,next)=>{
    const pageNumber= parseInt(req.query.page);
    console.log("pageNumber",pageNumber);
    const startIndex = (pageNumber - 1) * itemsPerPage;
    // Mysql-- Offset= startIndex
    // MongoDb -- skip= startIndex 
    const endIndex = pageNumber * itemsPerPage;
    // Mysql-- limit= endIndex
    // MongoDb -- limit= endIndex
    const paginatedData = data.slice(startIndex, endIndex);
    res.json(paginatedData);
})

app.listen(4000,()=>{
    console.info("Server Running")
})