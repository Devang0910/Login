const express = require("express");
const { route } = require("./users");
const router = express.Router();

// GET all users
router.get("/", (req, res) => {
    res.send("User List");
});

// GET a specific user by ID
router.get("/:id", (req, res) => {
    res.send(`User fetched with id ${req.params.id}`);
});
router.post("/",(req,res)=>{
    res.send("Create User!");
})

router.put("/:id",(req,res)=>{
    res.send(`Update use with id ${res.params.id}`)
})

router.delete("/:id",(req,res)=>{
    res.send(`Delte with id ${res.params.id}`)
})

router.param("id",(req,res,next,id)=>{
    console.log('id');
    next();
})
// Export the router
module.exports = router;
