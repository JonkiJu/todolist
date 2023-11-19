import { Dispatch, SetStateAction } from "react";
import { ITask } from "@/interfaces/interfaces";
import { useDrag } from "react-dnd";
import TaskTimetracker from "./TaskTimetracker";

const SingleTask = ({
    task,
    tasks,
    setTasks,
}: {
    task: ITask;
    tasks: ITask[];
    setTasks: Dispatch<SetStateAction<ITask[]>>;
}): JSX.Element => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "singleTask",
        item: { id: task.id },
        collect: (monitor: any) => ({ isDragging: !!monitor.isDragging() }),
    }));

    const deleteTask = (id: string): void => {
        const filteredTasks = tasks.filter((task: ITask) => task.id !== id);

        localStorage.setItem("tasks", JSON.stringify(filteredTasks));
        setTasks(filteredTasks);
    };

    return (
        <li
            ref={drag}
            className={` shadow-md rounded-md bg-white hover:opacity-75  ${
                isDragging ? "opacity-50 cursor-grabbing" : "cursor-grab"
            }`}
        >
            <article className="relative p-4 mt-5 border-b-2">
                <p className="pr-10 break-words">{task.title}</p>
                <button
                    className="absolute bottom-4 right-4"
                    onClick={() => deleteTask(task.id)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                    </svg>
                </button>
            </article>
            <TaskTimetracker task={task} tasks={tasks} setTasks={setTasks} />
        </li>
    );
};

export default SingleTask;
