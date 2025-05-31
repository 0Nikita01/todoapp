import { apiRequest } from "../../utils/apiClient";

export type Todo = {
    id: string;
    section_id: string;
    title: string;
    completed: boolean;
};

type ApiResponse<T = void> =
  T extends void
    ? { success: true } | { success: false; message: string }
    : { success: true; data: T } | { success: false; message: string };

export const createTask = async (title: string): Promise<Todo> => {
    try {
        const response = await apiRequest<ApiResponse<Todo>>('/api/tasks', {
            method: 'POST',
            data: {
                title
            },
        });

        if (!response.success) {
            throw new Error('Ошибка: ' + response.message);
        }

        return response.data;
    } catch (error: any) {
        //console.log(error.message);
        throw error;
    }
};

export const getTasks = async (): Promise<Todo[]> => {
    try {
        const response = await apiRequest<ApiResponse<Todo[]>>('/api/tasks', {
            method: 'GET',
            params: {
                "section_id": "019720a3-433e-7b15-95f2-16814c930cbb"
            }
        });

        if (!response.success) {
            throw new Error('Ошибка: ' + response.message);
        }

        return response.data;
    } catch (error: any) {
        //console.log(error.message);
        throw error;
    }
}

export const editTask = async (taskData: Todo): Promise<ApiResponse> => {
    const {id, completed, section_id} = taskData;
    try {
        const response = await apiRequest<ApiResponse>('/api/tasks', {
            method: 'PUT',
            data: {
                id,
                section_id,
                completed
            },
        });

        console.log(response);

        if (!response.success) {
            throw new Error('Ошибка: ' + response.message);
        }

        return response;
    } catch (error: any) {
        //console.log(error.message);
        throw error;
    }
}
