
const precision = 1;

export async function setOutputMessage(node, editor, outputKey, itemPpm, outObj, showMaxOutput = true) {
    const thisNode = editor.nodes.find(n => n.id === node.id);
    var addon = "";
    if(showMaxOutput){addon = " of " + formatNumber(outObj[1])};
    const message = "Out: (" + formatNumber(itemPpm) + addon + " " + outObj[0] + "/min)";
    thisNode.outputs.get(outputKey).name = message;
    await thisNode.update();
}

export async function setInputMessage(node, editor, inputKey, itemPpm, reqObj) {
    const thisNode = editor.nodes.find(n => n.id === node.id);
    const message = "In: (" + formatNumber(itemPpm) + " of " + formatNumber(reqObj[1]) + " " + reqObj[0] + "/min)";
    thisNode.inputs.get(inputKey).name = message;
    await thisNode.update();
}


function formatNumber(num){
    if(Number.isInteger(num)){
        return num.toFixed(0);
    } else {
        return num.toFixed(1);
    }
}

export function mapToRequirement(inputItem, recipes, idx, nInputs) {
    var reqArray;
    switch (nInputs) {
        case 2:
            reqArray = [recipes.in[idx], recipes.in2[idx]];
            break;
        case 4:
            reqArray = [recipes.in[idx], recipes.in2[idx], recipes.in3[idx], recipes.in4[idx]];
        default:
            reqArray = [recipes.in[idx], recipes.in2[idx]];
    }

    var position = reqArray.findIndex(req => req == inputItem); // returns -1 if no match

    var reqItem;
    var reqPpm;
    switch (position) {
        case 0:
            reqItem = recipes.in[idx];
            reqPpm = recipes.inppm[idx];
            break;
        case 1:
            reqItem = recipes.in2[idx];
            reqPpm = recipes.inppm2[idx];
            break;
        case 2:
            reqItem = recipes.in3[idx];
            reqPpm = recipes.inppm3[idx];
            break;
        case 3:
            reqItem = recipes.in4[idx];
            reqPpm = recipes.inppm4[idx];
            break;
        default:
            break;
    }

    return {position: position, reqItem: reqItem, reqPpm: reqPpm};

}