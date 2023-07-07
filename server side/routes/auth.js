const { authMiddleware } = require("../middlewares/middlewareAuth");
const router = require("express").Router();

router.get("/", (req, res) => {
  req.isAuthenticated() && res.send(req.user);
  req.isUnauthenticated() && res.status(401).json({ err: "auth" });
});
router.get("/logout", authMiddleware, (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid").send();
});
module.exports=router