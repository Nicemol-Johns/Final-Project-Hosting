const express = require('express');
const router = express.Router();

const ToDoSchema = require('../model/schema')

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.post('/new-task', async (req, res) => {

    try {
        const title = req.body.title;  
        const status = req.body.status; 
        console.log(`${title},${status}`)
        const newTask = new ToDoSchema({
            description:title,
            status:status
          })
        console.log(newTask)
      const createdTask = await newTask.save()
        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error in creating Task' });    
    }

  });

  router.get('/tasks', async (req, res) => {
    try {
      const tasks = await ToDoSchema.find();
      res.status(200).json({data:tasks});
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  });
  
  router.delete("/delete/:id",async (req,res)=>{
    try {
        let id = req.params.id;
        console.log(id);  
        let data = await ToDoSchema.findByIdAndRemove(id);
        res.set('Cache-Control', 'no-store');      
        res.json({data:data,status:200}).status(201);
    } catch (error) {
        res.status(400).json({ message: "DELETE request CANNOT be completed" });       
    }

    
    router.put("/update-task",async (req,res)=>{                               
        try{
            let id = req.body.id;
            let status = req.body.status
            let updateData = {$set: req.body};
  
            const updated = await ToDoSchema.findByIdAndUpdate(id,updateData);  
            console.log(updated)
            res.set('Cache-Control', 'no-store');                            
            res.json({message:"UPDATE Successful",status:200});                                                                          
        }catch(error){
            res.status(400).json("Cannot /UPDATE data");                            
                                      
        }
    })
})






module.exports = router