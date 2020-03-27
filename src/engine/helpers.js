


export async function setOutputMessage(node,editor,outputKey,itemObj){
    const thisNode = editor.nodes.find(n => n.id === node.id);
    const message = "Out: (" + itemObj[1] + " " + itemObj[0] + "/min)";
    thisNode.outputs.get(outputKey).name = message;
    await thisNode.update();
}

export async function setInputMessage(node,editor,inputKey,itemObj,reqObj){
    const thisNode = editor.nodes.find(n => n.id === node.id);
    const message = "In: (" + itemObj[1] + " of " + reqObj[1] +" "+ reqObj[0] + "/min)";
    thisNode.inputs.get(inputKey).name = message;
    await thisNode.update();
}