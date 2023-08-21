import express from 'express'
import { addBook, deleteBookById, getAllBook, getBookById } from '../controller/bookController.js';


const router = express.Router()

router.post("/addbook",addBook);
router.get("getbooks",getAllBook);
router.get("/getbook/:id",getBookById);
router.delete("/delete/:id",deleteBookById)




export default router;