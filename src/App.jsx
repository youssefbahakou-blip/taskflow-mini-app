import { useState , useEffect} from 'react'
import TaskChart from './TaskChart';

// import './App.css'

function App() {
  const [Title,setTitle] = useState('')
  const [DueDate,setDueDate] = useState('')
  const [Priority,setPriority] = useState('')
  const [Status,setStatus] = useState('')
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [Tasks,setTasks] = useState(()=>{
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    return savedTasks ? savedTasks : [] 
  })
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(Tasks));
  }, [Tasks]);
  const filteredTasks = Tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );
  function AddTask(){
    if([Title,DueDate,Priority,Status].every(value => value.trim() !== "")){
      const newTask = {
        id : Date.now(),
        title  : Title,
        startDate: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`,        dueDate : DueDate,
        priority : Priority,
        status : Status
      }
      if (Tasks.some(task =>
        task.title.toLowerCase() === newTask.title.toLowerCase())){
        alert('you have already this task')
        return ;
      }
      setTasks([...Tasks,newTask])
      setTitle('');
      setDueDate('');
      setPriority('');
      setStatus('');
    }
    else{
      alert('fill in all inputs')
    }
  }
  function ModifyTask(id) {
    const task = Tasks.find(task => task.id === id);

    if (!task) return;

    setTitle(task.title);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setStatus(task.status);

    setEditingId(id);
  }
  function UpdateTask() {
    if (editingId === null) return;
    
    setTasks(Tasks.map(task =>
      task.id === editingId
        ? {
            ...task,
            title: Title,
            dueDate: DueDate,
            priority: Priority,
            status: Status
          }
        : task
    ));

    setEditingId(null);

    setTitle('');
    setDueDate('');
    setPriority('');
    setStatus('');
  }
  function DeleteTask(id) {
  setTasks(Tasks.filter(task => task.id !== id));

  if (editingId === id) {
    setEditingId(null);
    setTitle('');
    setDueDate('');
    setPriority('');
    setStatus('');
  }
}
  
  return(
    <>
        <section id='firstSection'>
          <article>
            <h1>tasks manager app</h1>
            Title :
            <input type="text" value={Title} onChange={(event)=>{setTitle(event.target.value)}} /> 
            <br />
            DueDate :
            <input type="date" value={DueDate} onChange={(event)=>{setDueDate(event.target.value)}} />
            <br />
            Priority :
            <select value={Priority}
            onChange={(event) => setPriority(event.target.value)}>
              <option value="">Select priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <br />
            Status :
            <select value={Status}
            onChange={(event) => setStatus(event.target.value)}>
              <option value="">Select status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>        
            <br />
            <button onClick={()=>{AddTask()}} disabled={editingId !== null}>Add</button>
          </article>
          <article>
            <TaskChart tasks={Tasks} />
          </article>
        </section>
        <section className='search'>
          <label htmlFor="Search">Search :</label>
          <input type="text"
            placeholder="Search tasks by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </section>
        <section>
          <article>
            <h2>tasks table</h2>
            <p>before updating you should modify the values first</p>
            <table border={1}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>start Date</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((Task)=>{
                  return(
                      <tr key={Task.id}>
                        <td>{Task.title}</td>
                        <td>{Task.startDate}</td>
                        <td>{Task.dueDate}</td>
                        <td>{Task.priority}</td>
                        <td>{Task.status}</td>
                        <td id='actions'>
                          <button id='delete' onClick={() => DeleteTask(Task.id)}>Delete</button>
                          <button id='modify' onClick={() => ModifyTask(Task.id)}>Modify</button>
                          <button id='update' onClick={() => UpdateTask()} disabled={editingId !== Task.id}>Update</button>
                        </td>
                      </tr>
                  )
                })}
              </tbody>
            </table>
          </article>
        </section>
        <h3>Number of Pending Tasks</h3>
        <section className='lastSection'>
          <article>
            <h3>Number of in progress tasks</h3>
            <p>{filteredTasks.filter(Task => Task.status === 'Pending').length}</p>
          </article>
          <article>
            <h3>Number of In progress tasks</h3>
            <p>{filteredTasks.filter(Task => Task.status === 'In Progress').length}</p>
          </article>
          <article>
            <h3>Number of completed tasks</h3>
            <p>{filteredTasks.filter(Task => Task.status === 'Completed').length}</p>
          </article>
        </section>

    </>
  )
}
export default App
