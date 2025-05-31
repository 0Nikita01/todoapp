import { Request, Response } from 'express'
import { ApiResponse } from '../types/api-response.types';
import { Todo } from '../types/createTask.types';
import 'dotenv/config';

import pool from '../db';

import { editTaskQuery } from '../queries/todo.tasks';

export  async function editTask (
    req: Request, 
    res: Response<ApiResponse<void>>
) {
    const { id, section_id, completed } = req.body;

    if (!id || !section_id || completed === undefined) {
        res.status(400).json({
            success: false, 
            message: 'Пришли не все данные!' 
        });
    }

    const params = [
        completed,
        id,
        section_id,
        
    ]

    try {
        const result = await pool.query(editTaskQuery, [
            ...params
        ]);

        if (result.rowCount === 0) {
            res.status(404).json({ success: false, message: 'Задача не найдена или не принадлежит секции' });
        }

        res.status(201).json({ 
            success: true
        });

    } catch (err: any) {
        console.error('DB error', err);
        res.status(500).json({ success: false, message: 'Ошибка сервера ' + err.message});
    }
}