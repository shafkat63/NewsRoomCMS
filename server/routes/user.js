import express from "express";
const router = express.Router();

import { getUsers, signin, signup ,updateUser, getUser} from "../controllers/user.js";
import auth from "../middleware/auth.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get('/',getUsers)
router.patch('/updateUser/:id',updateUser)
router.get("/:id", getUser);

export default router;