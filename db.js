const books=[
    {
        ISBN:"12345",
        title:"mern stack",
        pubDate:"2002-11-10",
        lan:"en",
        numpage:250,
        author:[1,2],
        publication:[1],
        cat:["mongo db","express","react","node"]

    },
    {
        ISBN:"1234567",
        title:"mean stack",
        pubDate:"2002-11-26",
        lan:"tel",
        numpage:398,
        author:[1],
        publication:[2],
        cat:["mongo db","express","angular","node"]
    },
    {
        ISBN:"123456789 MSD",
        title:"full stack",
        pubDate:"2005-12-16",
        lan:"us",
        numpage:657,
        author:[1,3],
        publication:[1,3],
        cat:["java","Java script","Python"]
    }
];

const author=[
    {
        id:1,
        name:"suchi",
        books:["12345","1234567"]

    },
    {
        id:2,
        name:"manju",
        books:["12345"]
    },
    {
        id:3,
        name:"yerram",
        books:["123456789 MSD"]
    }
];

const publication=[
    {
        id:1,
        name:"edx",
        books:["12345"]
    },
    {
        id:2,
        name:"internshala",
        books:[]
    },
    {
        id:3,
        name:"ktr",
        books:["123456789 MSD"]
    }
];
module.exports={books,author,publication};