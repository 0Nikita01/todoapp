import styles from './style.module.scss';
import {TaskType } from '../../types/types';
import tickWhite from '../../assets/tick_white.svg';

type TasksProps = {
    task: TaskType;
    onComplete: (task: TaskType) => void;
}
const Task = ({task, onComplete}: TasksProps) => {
    const {title, completed} = {...task};
    return (
        <>
            <div className={styles.containerTask}>
                <div className={styles.statusTask}>
                    <div 
                        className={`${styles.statusImg} ${completed ? styles.done : ''}`}
                        onClick={() => onComplete(task)}
                    >
                        <img src={tickWhite} alt="tick" />
                    </div>
                </div>
                <div className={styles.fieldTask}>
                    <p className={completed ? styles.done : ''}>{title}</p>
                </div>
            </div>
        </>
    )
}

export default Task;