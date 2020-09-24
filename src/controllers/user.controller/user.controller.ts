import express from "express";

import GetUsers from "./get-users.user.controller";
import GetUserById from "./get-user-by-user-id.user.controller";
import PostCreateUser from "./post-create-user.user.controller";
import PutUpdateUser from "./put-update-user.user.controller";
import DeleteDeleteUser from "./delete-delete-user.user.controller";

const app = express();
const router = express.Router();

router.get("/", GetUsers);
router.get("/:userId", GetUserById);
router.post("/", PostCreateUser);
router.put("/:userId", PutUpdateUser);
router.delete("/:userId", DeleteDeleteUser);

app.use(router);
export default app;