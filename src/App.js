import React from "react"
import DirectoryManager from "./DirectoryManager"
import { addItem, deleteSubItem } from "./functions"
import { userContext } from "./context"
// CSS
import './App.css';

function App() {
  const [directories, setdirectories] = React.useState([{ id: 0, name: 0, children: [] }]) // main list of directories
  const [clickedItem, setClickedItem] = React.useState(null); // directory which is clicked
  const [refresher, setRefresher] = React.useState(false) // force dom to re-render by toggle this value

  const refreshManually = () => setRefresher(!refresher)
  const handleAddItem = () => {
    addItem(directories, refreshManually, clickedItem, setClickedItem);
  }
  const handleClearStorage = () => {
    setdirectories([{ id: 0, name: 0, children: [] }])
  }
  const handleDelete = () => {
    deleteSubItem(directories, refreshManually, clickedItem)
  }

  // get local storage "data" value only on componentDidMount
  React.useEffect(() => {
    setdirectories(JSON.parse(localStorage.getItem("data") || "[{ id: 0, name: 0, children: [] }]"))
  }, [])
  // set data to localstorage "data" item on "directories" state update
  React.useEffect(() => {
    localStorage.setItem("data", JSON.stringify(directories));
    directories[0].children.length === 0 && setClickedItem(null)
  }, [directories])

  return (
    <div className="App"  >
      <userContext.Provider value={{ directories, clickedItem, refreshManually, setClickedItem }}>
        <ul >
          {directories[0].children.map(directory => <DirectoryManager key={directory.id} directory={directory} />)}
        </ul>
      </userContext.Provider>
      <button onClick={handleAddItem}>{`+ Add new ${clickedItem ? "sub" : "main"} directory`}</button>
      <button onClick={handleClearStorage}>Clear local storage</button>
      <button onClick={handleDelete}>Delete item</button>
    </div>
  );
}

export default App;
