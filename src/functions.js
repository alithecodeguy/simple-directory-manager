// add new directory to selected route
export const addItem = (directories, handleRefresh, clickedItem) => {
    const path = getPath(directories, clickedItem)
    const result = selectWhere(directories, path)
    const newObj = {
        id: new Date().getTime().toString(),
        name: `<Direcory ${result.children.length + 1} level ${path.length} - Click and edit me!>`,
        children: []
    }
    result.children.push(newObj)
    handleRefresh()
}

// delete selected directory
export const deleteSubItem = (directories, handleRefresh, clickedItem) => {
    const path = getPath(directories, clickedItem)
    const parentDirObj = selectWhere(directories, path.slice(1))
    const dirObj = selectWhere(directories, path)
    parentDirObj.children = parentDirObj.children.filter(child => child.id !== dirObj.id)
    handleRefresh()
}

// rename selected directory
export const renameItem = (directories, handleRefresh, clickedItem, newName) => {
    const path = getPath(directories, clickedItem)
    const result = selectWhere(directories, path)
    result.name = newName
    handleRefresh()
}

// find route to selected directory from main directories list
export function getPath(directories, clickedItem) {
    var status = false;
    var path = [];

    function find(directory, id) {
        if (!status && directory.children.length > 0) {
            for (let i = 0; i < directory.children.length; i++) {
                !status && find(directory.children[i], id)
            }
        }
        if (directory.id === id) {
            status = status || true
            path.push((parseInt(directory.id)))
            return
        }
        else if (status) {
            path.push((parseInt(directory.id)))
            return
        }
    }

    directories.forEach(directory => {
        !status &&
            find(directory, clickedItem)
    })
    path = path.length === 0 ? [0] : path
    return path
}

// find target object to operate 
const selectWhere = (data, path) => {
    let result = data[0];
    let reversedpPath = path.slice().reverse();
    for (let i = 0; i < path.length; i++) {
        for (let j = 0; j < result.children.length; j++) {
            if (parseInt(result.children[j].id) === parseInt(reversedpPath[i])) {
                result = result.children[j];
                break;
            }
        }
    }
    return result;
}


