import { Router } from 'express'
import { createTask } from '../controllers/createTask.controller';
import { getTasks } from '../controllers/getTasks.controller';
import { editTask } from '../controllers/editTask.controller';

import { Request, Response } from 'express'
import { ApiResponse } from '../types/api-response.types';
import { Todo } from '../types/createTask.types';

const router = Router();

router.post('/', createTask);
router.get('/', getTasks);
router.put('/', editTask)

export default router;