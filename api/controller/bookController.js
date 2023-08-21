import db from '../repository/db.js'



export const addBook =(req,res)=>{
    const q  = "INSERT INTO books (`bname`, `price` , `count`,`author` , `genere`) values (?)"
    const value = [
        req.body.name,
        req.body.price,
        req.body.count,
        req.body.author,
        req.body.genere
    ]
    db.query(q,[value],(err,data)=>{
        if(err){
            console.log(err)
            res.status(400).json(err);
        }
        return res.status(201).json("book created")
    })
}

export const deleteBookById = (req,res)=>{
    const q = "DELETE FROM books WHERE `bid`=?"
    const bookid = req.params.id
    db.query(q,[bookid],(err,data)=>{
        if(err){
            console.log(err)
            res.status(400).json(err);
        }
        return res.status(200).json("book deleted");
    })
}

export const getAllBook = (req,res)=>{

    const q  = req.query.cat 
    ?"SELECT * FROM books WHERE `genere` = ?"
    :"SELECT * FROM books";
    db.query(q,(err,data)=>{
        if(err){
            console.log(err);
            res.status(400).json(err);
        }
        return res.status(200).json(data);
    })
}

export const getBookById = (req,res)=>{
    const q  = "SELECT * FROM books WHERE `bid`=?";
    const bookId = req.params.id;
    db.query(q,[bookId],(err,data)=>{
        if(err){
            console.log(err);
            res.status(400).json(err);
        }
        return res.status(200).json(data);
    })
}