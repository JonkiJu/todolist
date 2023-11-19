import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { ITask } from "@/interfaces/interfaces";

const TaskTimetracker = ({
    task,
    tasks,
    setTasks,
}: {
    task: ITask;
    tasks: ITask[];
    setTasks: Dispatch<SetStateAction<ITask[]>>;
}): JSX.Element => {
    const [timer, setTimer] = useState<number>(task.timer);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(() => {
        let interval: NodeJS.Timer;
        // let interval: any;

        if (isRunning) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        } else {
            //@ts-ignore
            clearInterval(interval);
            changeTimer(task.id);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const changeTimer = (id: string): void => {
        setTasks((prev) => {
            const modifiedTasks = prev.map((task) => {
                if (task.id === id) {
                    return { ...task, timer: timer };
                }
                return task;
            });

            localStorage.setItem("tasks", JSON.stringify(modifiedTasks));

            return modifiedTasks;
        });
    };

    const toggleTimer = (): void => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    };

    const formatTime = (timeInSeconds: number): string => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <article className="relative p-4">
            <p>{formatTime(timer)}</p>
            <button
                className={`absolute bottom-4 right-4 ${
                    task.status === "WORKING" ? "" : "cursor-no-drop opacity-25"
                }`}
                onClick={toggleTimer}
                disabled={task.status === "WORKING" ? false : true}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z"
                    />
                </svg>
            </button>
        </article>
    );
};

export default TaskTimetracker;
