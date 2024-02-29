import express from "express";
import { create, getAll, getOne, update, deleteUser } from "../controller/userController.js";
import upload from '../multerConfig.js'

const route = express.Router();

route.post('/create', upload.single('img'), create);
route.get("/getall", getAll);
route.get("/getone/:id", getOne);
route.put("/update/:id", upload.single('img'), update);
route.delete("/deleteuser/:id", deleteUser);

export default route;
