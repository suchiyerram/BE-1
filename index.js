const suchi=require("express");
var bodyParser=require("body-parser");

// require our file(db)
const database=require("./db");

// initialize express
const booky=suchi();
booky.use(bodyParser.urlencoded({extended:true}));
booky.use(bodyParser.json());
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
});
// add new books
booky.post("/book/:new",(req,res)=>
{
    const Newbook=req.body;
    database.books.push(Newbook);
    return res.json({updatedBooks:database.books});

});
// add new author
booky.post("/author/:new",(req,res)=>
{
    const Newauthor=req.body;
    database.author.push(Newauthor);
    return res.json({updatedAuthors:database.author});
});
// add new publication
booky.post("/pub/:new",(req,res)=>
{
    const Newpub=req.body;
    database.publication.push(Newpub);
    return res.json({updatedPublications:database.publication});
});
// update pub and book
booky.put("/publication/update/book/:isbn",(req,res)=>
{
    // update the pub db
    database.publication.forEach((pub)=>{
        if(pub.id===req.body.pubId)
        {
            return pub.books.push(req.params.isbn)
        }
    });
    // update the book db
    database.books.forEach((book)=>
    {
        if(book.ISBN===req.params.isbn)
        {
            book.publication=req.body.pubId;
            return;
        }
    });
    return res.json(
        {
        books:database.books,
        publications:database.publication,
        message:"updated"

    }
    );
});
// delete a book
booky.delete("/book/delete/:isbn",(req,res)=>
{
    const updateBookdatabase=database.books.filter((book)=>book.ISBN!==req.params.isbn);
    database.books=updateBookdatabase;
    return res.json({books:database.books})

});
// delete an author from a book and vice versa
booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>
{
    //update the book db
    database.books.forEach((book)=>
    {
        if(book.ISBN === req.params.isbn)
        {
            const newAuthorlist=book.author.filter((eachAuthor)=>eachAuthor!==parseInt(req.params.authorId));
            book.author=newAuthorlist;
            return;
        }

    });
    // update author db
    database.author.forEach((eachAuthor)=>
    {
        if(eachAuthor.id===parseInt(req.params.id));f
        const newBooklist=eachAuthor.books.filter((book=>book!==req.params.isbn));
        eachAuthor.books=newBooklist;
        return;
    });
    return res.json({
        book:database.books,
        author:database.author,
        message:"deleted"

    })

});



booky.listen(3999,()=> console.log("Running"));