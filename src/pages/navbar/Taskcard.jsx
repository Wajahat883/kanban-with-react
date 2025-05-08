export default function Taskcard({task}){
    return(
        <div className="bg-white p-3 rounded shadow mb-2">
            <h4 className="font-semibold">{task.title}</h4>
            <p className="text-sm text-gray-600">{task.description}</p>
            
        </div>
    )
}