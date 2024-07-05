import { useTableTaskContext } from "../../../AddTasksContext";

export default function CompletedTasks() {
    const { tableName, tasks } = useTableTaskContext();
    const validTasks = tasks.filter(task => task !== null && task !== undefined);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-x-scroll xl:grid-cols-3 2xl:grid-cols-4 items-start h-full">
            {tableName.filter(table => 
              validTasks.some(task => task.header_id === table.id && task.completed)
            ).map((table) => (
              <div key={table.id} className="p-4 m-2 bg-white rounded shadow">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl">{table.title}</h3>
                </div>
                <div className="mt-4">
                  {validTasks.filter(task => task.header_id === table.id && task.completed).map((task) => (
                    <div key={task.id} className="p-2 m-2 bg-gray-100 rounded">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="text-xl">{task.status}</h4>
                          <p>{task.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
    )
}