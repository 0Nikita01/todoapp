
export const insertTaskQuery = `
    INSERT INTO tasks (id, section_id, title, completed)
    VALUES ($1, $2, $3, $4)
    RETURNING id, title, completed, section_id;
`;

export const selectTasksQuery = `
    SELECT 
        t.id,
        t.section_id,
        t.title,
        t.completed
    FROM tasks t
    JOIN sections s ON t.section_id = s.id
    WHERE s.id = $1 AND s.user_id = $2
    ORDER BY t.created_at;
`;

export const editTaskQuery = `
    UPDATE tasks 
    SET completed = $1 
    WHERE id = $2 AND section_id = $3;
`