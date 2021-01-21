import React from "react"
import { renameItem } from "./functions"
import { userContext } from "./context"

const DirectoryManager = (props) => {
    const context = React.useContext(userContext);
    const { refreshManually, setClickedItem, clickedItem, directories } = context
    const { directory } = props
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
        setClickedItem(directory.id)
    }
    const handleRename = (e) => {
        renameItem(directories, refreshManually, clickedItem, e.target.innerText)
    }

    return (
        <li key={directory.id} style={{ color: clickedItem === directory.id ? "red" : "black" }}
            onFocus={() => setClickedItem(directory.id)}   >
            <span onClick={handleClick} contentEditable onInput={handleRename} >{directory.name}</span>
            {isOpen && <ul key={directory.id}>{props.directory.children.map(directory => <DirectoryManager key={directory.id} directory={directory} />)}</ul>}
        </li>
    )
}

export default DirectoryManager