export type TaskType = {
    id: string;
    section_id: string;
    title: string;
    completed: boolean;
};

export type FilterType = "All" | "Active" | "Completed";