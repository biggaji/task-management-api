const Mongoose = require('mongoose');
const Task = require('../models/task');

// create new task
exports.createTask = async(request, response)=>{
    try {
        // check if task exists
        const task = await Task.findOne({title: request.body.title});
        if(task){
            return response.status(400).json({ success: false,
                responseMessage: `task already exists with title ${task.title}`
            })
        }
        // create new task
        let {title , description , status , due_date} = request.body
        const newTask = new Task({
            title,
            description,
            status,
            due_date
        })
        // save new task
        const savedTask = await newTask.save();
        return response.status(201).json({success:true , responseMessage:savedTask});
    } catch (error) {
        return response.status(400).json({success: false , error:error});
    }
}

// get all tasks
exports.getAllTasks = async(request, response)=>{
    try {
        const tasks = await Task.find({});
        return response.status(200).json({success:true , responseMessage:tasks});
    } catch (error) {
        return response.status(400).json({success: false , error:error});
    }
}

// get task by id
exports.getTaskById = async(request, response)=>{
    try {
        // check if id is valid
        let task_id = request.params.id;
        if(!Mongoose.isValidObjectId(task_id)){
            return response.status(400).json({ success: false,
                responseMessage: `invalid id ${task_id}`
            })
        }
        const task = await Task.findById(task_id);
        return response.status(200).json({success:true , responseMessage:task});
    } catch (error) {
        return response.status(400).json({success: false , error:error});
    }
}

//update task
exports.updateTask = async(request, response)=>{
    try {
        // check if id is valid
        let task_id = request.params.id;
        if(!Mongoose.isValidObjectId(task_id)){
            return response.status(400).json({ success: false,
                responseMessage: `invalid id ${task_id}`
            })

            
        }
        // check if task exists
        const task = await Task.findById(task_id);
        if(!task){
            return response.status(400).json({ success: false,
                responseMessage: `task not found with id ${task_id}`
            })
        }
        // update task
        const updatedTask = await Task.findByIdAndUpdate(task_id, request.body, {new:true});
        return response.status(200).json({success:true , responseMessage:updatedTask});
    } catch (error) {
        return response.status(400).json({success:false, responseMessage:error})
    }
}

//delete a task
exports.deleteTask = async(request, response)=>{
    try {
        // check if id is valid
        let task_id = request.params.id;
        if(!Mongoose.isValidObjectId(task_id)){
            return response.status(400).json({ success: false,
                responseMessage: `invalid id ${task_id}`
            })
        }
        // check if task exists
        const task = await Task.findById(task_id);
        if(!task){
            return response.status(400).json({ success: false,
                responseMessage: `task not found with id ${task_id}`
            })
        }
        // delete task
        const deletedTask = await Task.findByIdAndDelete(task_id);
        return response.status(200).json({success:true , responseMessage:deletedTask});
    } catch (error) {
        return response.status(400).json({success:false, responseMessage:error})
    }
}

//sort and get task with the current due date
exports.getTaskWithCurrentDueDate = async(request, response)=>{
    try {
        const tasks = await Task.find({}).sort({due_date:1}).limit(3);
        return response.status(200).json({success:true , responseMessage:tasks});
    } catch (error) {
        return response.status(400).json({success:false, responseMessage:error})
    }
}