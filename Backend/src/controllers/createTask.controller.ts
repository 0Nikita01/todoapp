import { Request, Response } from 'express'
import { ApiResponse } from '../types/api-response.types';
import { Todo } from '../types/createTask.types';
import 'dotenv/config';

import pool from '../db';
import { uuidv7 } from 'uuidv7';

import { insertTaskQuery } from '../queries/todo.tasks';

export  async function createTask (
    req: Request, 
    res: Response<ApiResponse<Todo>>
) {
    const { title } = req.body;

    if (!title) {
        res.status(400).json({
            success: false, 
            message: 'Поле "title" обязательно' 
        });
    }

    const params = [
        uuidv7(),
        process.env.SECTION_ID,
        title,
        false
    ]

    try {
        const result = await pool.query(insertTaskQuery, [
            ...params
        ]);

        res.status(201).json({ 
            success: true, 
            data: result.rows[0] 
        });

    } catch (err: any) {
        console.error('DB error', err);
        res.status(500).json({ success: false, message: 'Ошибка сервера ' + err.message});
    }
}