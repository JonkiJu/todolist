import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ITask } from "@/interfaces/interfaces";
import SectionList from "./SectionList";

const TaskList = ({
    tasks,
    setTasks,
}: {
    tasks: ITask[];
    setTasks: Dispatch<SetStateAction<ITask[]>>;
}): JSX.Element => {
    const [todos, setTodos] = useState<ITask[]>([]);
    const [working, setWorking] = useState<ITask[]>([]);
    const [done, setDone] = useState<ITask[]>([]);

    enum Statuses {
        TODOS = "TODOS",
        WORKING = "WORKING",
        DONE = "DONE",
    }

    useEffect(() => {
        const filteredTodos = tasks.filter((task) => task.status === "TODOS");
        const filteredWorking = tasks.filter(
            (task) => task.status === "WORKING"
        );
        const filteredDone = tasks.filter((task) => task.status === "DONE");

        setTodos(filteredTodos);
        setWorking(filteredWorking);
        setDone(filteredDone);
    }, [tasks]);

    return (
        <section className="flex gap-10">
            {(Object.keys(Statuses) as Array<keyof typeof Statuses>).map(
                (key, index) => (
                    <SectionList
                        key={index}
                        status={Statuses[key]}
                        tasks={tasks}
                        setTasks={setTasks}
                        todos={todos}
                        working={working}
                        done={done}
                    />
                )
            )}
        </section>
    );
};

export default TaskList;
