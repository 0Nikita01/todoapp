import { Request, Response } from 'express'
import { ApiResponse } from '../types/api-response.types';
import { Todo } from '../types/createTask.types';
import 'dotenv/config';

import pool from '../db';

import { selectTasksQuery } from '../queries/todo.tasks';

export  async function getTasks(
    req: Request<{}, {}, {}, {section_id?: string }>,
    res: Response<ApiResponse<Todo[]>>
) {
    const { section_id } = req.query;

    if (!section_id) {
        res.status(400).json({
            success: false, 
            message: 'Поле "section_id" обязательно' 
        });
    }

    const params = [
        process.env.SECTION_ID,
        process.env.USER_ID
    ];

    try {
        const result = await pool.query(selectTasksQuery, [
            ...params
        ]);

        res.status(201).json({ 
            success: true, 
            data: result.rows
        });

    } catch (err: any) {
        console.error('DB error', err);
        res.status(500).json({ success: false, message: 'Ошибка сервера ' + err.message});
    }
}