"use client";
import "./globals.css";
import CreateTask from "@/components/CreateTask";
import { useEffect, useState } from "react";
import TaskList from "@/components/TaskList";
import { ITask } from "@/interfaces/interfaces";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Home() {
    const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
        //@ts-ignore
        let parsed: ITask[] = JSON.parse(localStorage.getItem("tasks"));

        if (parsed) {
            setTasks(parsed);
        }
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <main className=" flex flex-col items-center p-3 gap-10 pt-40">
                {/* <h1>To Do List</h1> */}
                <CreateTask tasks={tasks} setTasks={setTasks} />
                <TaskList tasks={tasks} setTasks={setTasks} />
            </main>
        </DndProvider>
    );
}
