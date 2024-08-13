import express from "express"
import { loginController, logoutController, registerController,testController } from "../controller/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
// route object
const router  = express.Router()

// routing
// register --> POST Method
router.post("/register",registerController)

// login --> POST Method
router.post("/login",loginController)

// logout --> GET Method
router.get("/logout",logoutController)

// protected route auth
router.get("/user-auth",requireSignIn,(req,res)=>{
    return res.status(200).json({
        success: true,
        ok:true,
        message: "User is already authenticated",
    })
})

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    return res.status(200).json({ success:true, ok: true, message:"welcome admin" });
  });
  


// test protected route
// router.get("/test",requireSignIn,isAdmin,testController)




export default router;