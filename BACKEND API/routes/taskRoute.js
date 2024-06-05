const router = require('express').Router();
const taskRouter = require('../controllers/taskController')
router.post('/tasks' , taskRouter.createTask)
router.get('/tasks' , taskRouter.getAllTasks)
router.get('/tasks/:id' , taskRouter.getTaskById)
router.put('/tasks/:id' , taskRouter.updateTask)
router.delete('/tasks/:id' , taskRouter.deleteTask)
router.get('/tasks/next-three' , taskRouter.getNextThreeDueTasks)

module.exports = router;