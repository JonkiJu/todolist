const TaskHeader = ({
    text,
    bgColor,
    taskCount,
}: {
    text: string;
    bgColor: string;
    taskCount: number;
}): JSX.Element => {
    return (
        <>
            <h2
                className={`${bgColor} h-10 pl-4 rounded-md shadow-md text-md flex items-center justify-center text-white`}
            >
                {text}{" "}
                <p className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
                    {taskCount}
                </p>
            </h2>
        </>
    );
};

export default TaskHeader;
