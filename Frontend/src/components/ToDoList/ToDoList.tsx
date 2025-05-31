'use strict'
import { useEffect, useState } from 'react';
import styles from './style.module.scss';
import Task from '../Task/Task';
import { TaskType, FilterType} from '../../types/types';
import { useForm } from 'react-hook-form';
import { createTask, editTask, getTasks } from '../../api/toDoTasks/todo.api';
import { zodResolver } from '@hookform/resolvers/zod';
import { todoSchema, TodoInput } from '../../utils/schemas/todo.schema';
const initialTasks: Array<TaskType | null> = [];

const sortItems: FilterType[] = ["All", "Active", "Completed"];

const ToDoList = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const [tasks, setTasks] = useState<Array<TaskType | null>>(initialTasks);
    const [filter, setFilter] = useState<FilterType>("All");
    const [taskTitle, setTaskTitle] = useState<string>("");

    const countLeft = tasks.filter((task) => !task?.completed).length;
    const { register, handleSubmit, formState: { errors }, reset} = useForm<TodoInput>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            title: '',
        }
    });

    useEffect(() => {
        const uploadTask = async () => {
            await getTasks().then((data) => {
                console.log(data)
                handleAddTask(data);
                
            }).catch((err) => console.error('Ошибка получения задач:', err))
        }

        uploadTask();
    }, []);

    const handleFilterChange = (idx: number) => {
        setActiveIndex(idx);
        setFilter(sortItems[idx]);
    }

    const handleCompleteTask = (task: TaskType) => {
        console.log('check', task);

        const uploadEditTask = async () => {
            await editTask({...task, completed: !task.completed}).then((data) => {
                console.log("🧪Save status: 🟢")
                
            }).catch((err) => {
                console.log("🧪Save status: 🔴")
                console.error('Ошибка обновления задачи:', err)
            })
        }

        uploadEditTask();

        const updatedTasks = tasks.map((taskElem) => (
            taskElem?.id === task.id ? {...taskElem, completed: !taskElem.completed} : taskElem
        ));

        setTasks(updatedTasks);
    }

    const handleAddTask = (data: TaskType[]) => {
        if (data.length < 1) return;

        let tasksBuff: TaskType[] = [];

        data.forEach((task) => {
            const newTask: TaskType = {
                id: task.id,
                section_id: task.section_id,
                title: task.title,
                completed: task.completed
            };

            tasksBuff.push(newTask);

        })

            setTasks([...tasks, ...tasksBuff]);
            setTaskTitle("")
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.target.value);
    };

    const handleDelete = () => {
        const updatedTasks: Array<TaskType | null> = tasks.filter((task) => {
            return !task?.completed;
        });

        // const orderedTasks: Array<TaskType | null> = updatedTasks.reduce((acc: (TaskType | null)[], task: TaskType | null, index) : Array<TaskType | null> => {
        //     return [
        //         ...acc,
        //         task ? {...task, id: index} : null
        //     ]
        // }, []);

        const orderedTasks: Array<TaskType> = updatedTasks
            .filter((task): task is TaskType => task !== null)
            .map((task, _) => ({
                ...task,
                id: task.id
            }));

        setTasks(orderedTasks);
    }

    const filteredTasks = tasks.filter((task) => {
        if (filter === "Active") return !task?.completed;
        if (filter === "Completed") return task?.completed;
        return true;
    });

    const handlerFormSubmit = (data: TodoInput) => {
        console.log(data);
        
        const sendTask = async () => {
            console.log('send')
            await createTask(data.title).then((data) => {
                handleAddTask([data]);
                console.log('new task', data);
            }).catch((err) => console.error('Ошибка создание задачи:', err))
        }

        sendTask();
        reset();
    }

    return (
        <>
            <div className={styles.contentTitle}>
				<h1>TODO LIST APP</h1>
			</div>
            <div className={styles.container}>
                <form onSubmit={handleSubmit(handlerFormSubmit)}>
                    <div className={styles.contentInput}>
                        <div className={styles.inputImage}></div>
                        <input 
                            type="text" 
                            placeholder="What needs to be done?"
                            value={taskTitle}
                            {...register("title", {
                                onChange: (event) => {
                                    handleInputChange(event);
                                }
                            })}
                        />
                        <button 
                            type='submit'
                            className={styles.inputBtn}
                        >
                            {/* <img src={tickImg} alt="tick" /> */}
                        </button>
                    </div>     
                </form>
                <div className={styles.contentTasks}>
                    {
                        !filteredTasks.length ? <div className={styles.taskStub}>Ничего не нашлось</div> :
                        filteredTasks.map((task) => {
                            if (task) {
                                return (
                                    <Task 
                                        key={task?.id} 
                                        task={task} 
                                        onComplete={handleCompleteTask} 
                                    />
                                )
                            } else {
                                return '';
                            }
                        })
                    }
                </div>
                <div className={styles.contentActions}>
                    <div className={`${styles.actionItem} ${styles.counter}`}>
                        {
                            countLeft === 0 ? "done!" :
                            `${countLeft} items left`
                        }
                    </div>
                    <div className={`${styles.actionItem} ${styles.sortItems}`}>
                        {
                            sortItems.map((item, idx) => (
                                <div 
                                    key={idx}
                                    className={`${styles.sortItem} ${idx === activeIndex ? styles.active : ""}`}
                                    onClick={() => handleFilterChange(idx)}
                                >
                                    {item}
                                </div>
                            ))
                        }
                    </div>
                    <div className={`${styles.actionItem} ${styles.clearBtn}`}>
                        <button 
                            onClick={handleDelete}
                        >
                            Clear completed
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ToDoList;