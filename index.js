const suchi=require("express");

// require our file(db)
const database=require("./db");

// initialize express
const booky=suchi();
// get all books
booky.get("/", (req,res)=>
{
    return res.json({book:database.books});
});
// get a specific book
booky.get("/:isbn",(req,res)=>
{
    const getSpecificbook= database.books.filter((book)=>book.ISBN===req.params.isbn);

    if(getSpecificbook.length===0){
        return res.json({error:`no book found for ISBN of ${req.params.isbn}`});

    }
    return res.json({book:getSpecificbook});
});
// get book on a specific category
booky.get("/c/:category",(req,res)=>
{
    const getSpecificbook=database.books.filter((book)=>book.cat.includes(req.params.category));
    if(getSpecificbook.length===0){
        return res.json({error:`no book found for category of ${req.params.category}`});

    }
    return res.json({book:getSpecificbook});

});
// get book on a specific language
booky.get("/e/:language",(req,res)=>
{
    const getSpecificbook=database.books.filter((book)=>book.lan.includes(req.params.language));
    if(getSpecificbook.length===0){
        return res.json({error:`no book found for language of ${req.params.language}`});

    }
    return res.json({book:getSpecificbook});
});
// get all authors
booky.get("/a/:author",(req,res)=>
{
    return res.json({author:database.author})
});
//get all authors based on a book
booky.get("/author/book/:isbn",(req,res)=>
{
    const getSpecificauthor=database.author.filter((author)=>author.books.includes(req.params.isbn));
    if(getSpecificauthor.length===0){
        return res.json({error:`no author found for isbn of ${req.params.isbn}`});

    }
    return res.json({author:getSpecificauthor});
});
//get all publications
booky.get("/p/:publication",(req,res)=>
{
    return res.json({publication:database.publication});
})

booky.listen(3999,()=> console.log("Running"));