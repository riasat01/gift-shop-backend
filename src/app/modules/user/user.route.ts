import { Router } from "express";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post(`/create-user`, UserControllers.createUser);
router.patch(`/update-user/:id`, auth(), UserControllers.updateUser);
router.delete(`/delete-user/:id`, auth(), UserControllers.deleteUser);
router.get(`/`, auth(), UserControllers.getallUsers);

export const UserRouter = router;
