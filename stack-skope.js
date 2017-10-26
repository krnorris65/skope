//generator to create 10 stack-skope containers for the tree logs
const treeContainerGenerator = function* () {
    let currentContainer = 1
    const maximumContainers = 10

    while (currentContainer <= maximumContainers) {
        yield { "id": currentContainer, "type": "Tree", "logs": [] }
        currentContainer++
    }
}

//instance of tree container generator
const treeContainerFactory = treeContainerGenerator()

//forest of 37 total trees, 4 logs can be made from each tree
const forest = [
    {
        "type": "Oak",
        "trees": 9
    },
    {
        "type": "Pine",
        "trees": 12
    },
    {
        "type": "Ash",
        "trees": 6
    },
    {
        "type": "Balsa",
        "trees": 10
    }
]


const cropStackSkope = function (trees) {
    // Functionality to convert each tree into 4 logs
    const processedTrees = trees.map( //iterate over trees and return and array of new objects to show how many logs each tree produces

        currentTree => ({
            "type": currentTree.type, //type of tree
            "logs": currentTree.trees * 4 //number of logs it produces
        })

    )
    
    let treeContainers = [] //array to hold tree containers
    

    let currentContainer = treeContainerFactory.next().value //number of container


    // Start filling up the 10 available storage containers, 15 logs per container
    
    //processedTrees in an array of the type of tree and how many logs of each
    processedTrees.forEach(
        currentTreeLogs => { //adds one log at a time to the containers
            for(let i = 0; i < currentTreeLogs.logs; i++) { //run the for loop as long as i is less than the total number of logs
                const logType = {"type": currentTreeLogs.type} //type of tree
                currentContainer.logs.push(logType)  //add tree to the current container
                
                //only add 15 logs per container
                if(currentContainer.logs.length === 15) { //if the total number of the container equals 15 then:
                    treeContainers.push(currentContainer) //add current container to the treeContainers array
                    currentContainer = treeContainerFactory.next().value //and start filling a new container
                }
            }
        }
    )
    
    if(currentContainer.logs.length > 0) { //if there is a container that isn't full, still add it to the treeContainers array
        treeContainers.push(currentContainer)
    }

    return treeContainers //return the treeContainers array to find out how many containers were created

}

let allLogs = cropStackSkope(forest)


console.log(allLogs)
