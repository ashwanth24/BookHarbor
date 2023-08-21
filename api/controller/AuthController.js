import db from '../repository/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
//register
export const register = (req,res)=>{
    const q  = "SELECT * FROM  students WHERE smail=? OR sname =? "
    db.query(q,[req.body.email, req.body.username],(err,data)=>{
        if(err){
            console.log(err)
            return res.status(400).json(err);
        }
        if(data.length) return res.status(409).json("user exist already!")

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);

        const q = "INSERT INTO students (`sname` , `smail` , `password`,`srollnumber`, `sdept` ,`syear`) VALUE(?)"

        const value = [
            req.body.username,
            req.body.email,
            hash,
            req.body.rollnumber,
            req.body.dept,
            req.body.year
        ]
        db.query(q,[value],(err,data)=>{
            if(err){
                console.log(err)
                res.status(400).json(err)
            }
            return res.status(200).json("Created user");
        })
    })

}
//login
export const login=(req,res)=>{
    const q = "SELECT * FROM students WHERE sname = ?"
    db.query(q,[req.body.username],(err,data)=>{
        if(err){
            console.log(err);
            return res.status(400).json(err)
        }
        if(data.length == 0 )return res.status(404).json("user not found");
        const checkedPass = bcrypt.compare(req.body.password,data[0].password);
        if(!checkedPass)return res.status(400).json("incorrect password");

        const {password,...other} = data[0];
        const token = jwt.sign({id:data[0].id},"jwtkey")
        res.cookie("access_token",token,{
            httpOnly : true
        }).status(200).json(data[0])

    })
}
//lgout
export const logout=(req,res)=>{
    res.clearCookie("access_token",{
        sameSite : "none",
        secure:true
    }).status(200).json("user Logged out")
}