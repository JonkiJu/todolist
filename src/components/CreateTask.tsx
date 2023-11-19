import { useState, Dispatch, SetStateAction } from "react";
import { v4 as uuid } from "uuid";
import { ITask } from "@/interfaces/interfaces";

const CreateTask = ({
    tasks,
    setTasks,
}: {
    tasks: ITask[];
    setTasks: Dispatch<SetStateAction<ITask[]>>;
}): JSX.Element => {
    const [task, setTask] = useState<ITask>({
        id: "",
        title: "",
        status: "TODOS",
        timer: 0,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (task.title.trim().length < 3 || task.title.trim().length > 140) {
            return;
        }

        setTasks((prev: ITask[]) => {
            const list: ITask[] = [...prev, task];

            localStorage.setItem("tasks", JSON.stringify(list));

            return list;
        });

        setTask({ id: "", title: "", status: "TODOS", timer: 0 });
    };

    return (
        <form className="" onSubmit={handleSubmit}>
            <input
                className="px-1 rounded-md mr-5 h-12 w-64"
                type="text"
                value={task.title}
                placeholder="Enter task name"
                onChange={(e) =>
                    setTask({ ...task, id: uuid(), title: e.target.value })
                }
            />
            <button className="bg-cyan-500 rounded-md h-12 w-20 hover:opacity-75 text-white">
                Create
            </button>
        </form>
    );
};

export default CreateTask;
