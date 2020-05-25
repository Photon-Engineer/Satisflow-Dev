
# Satisflow

Hello and thank you for your visiting this repo! For the actual tool, go to [photon-engineer.github.io/Satisflow](https://photon-engineer.github.io/Satisflow/).

This goal of this project is to provide a helpful and relativley unique planning tool for the game [Satisfactory](https://www.satisfactorygame.com/). The tool is a flow-based calculator where you can add nodes and make connections for the purpose of planning out the various buildings needed to get the output rates you want. The flow-based approach allows you plan your factory based on your exact needs. Everything can be setup starting from miners, or you can start with a 'Creative' node to match an item output that already exists in your factory. You can save your work (manually) by exporting the layout as text, which you can import later to restore your progress.

The tool makes use of [Rete JS](https://github.com/retejs/rete) and several of its plugins to accomplish this. This project would not have been kicked off without their initial work, so thank you to the Rete team!



![Satisflow](/public/resources/satisflow2_cover.gif)

## Simple tutorial:

Basic Controls: 
- Drag the editor around by clicking and holding an empty point in the editor and dragging. 
- Drag a node around by clicking and holding a node and dragging. 
- Add nodes by clicking and dragging from the dock on the left, or by right-clicking in the editor and selecting one of the options. 
- Rotate a node by clicking it and pressing "R". 
- Connect nodes by clicking an output, then clicking an input on another node. You can also click and drag, but it doesn't work quite as well consistently. 
- Delete or clone a node by right-clicking it. Cloning will preserve the rotation and the recipe, so doing that can save some time. 
- Save your work by clicking "Export Data" on the right. You must copy the entire output and save it somewhere, such as in notepad manually. Please save often for larger projects!
- To restore your work, paste the exported data into the textbox, and then click "Restore Data". 
- To clear the entire editor (YOU CANNOT UNDO THIS), click "Clear Editor". 

Have fun and stay efficient!


## Adding Factory buildings and connecting them:
![Add and connect nodes](/public/resources/satisflow2_add_nodes.gif)
Adding nodes is as simple as dragging the desired node into the editor from the options on the left side. All non-power related buildings are available, though those may be added in the future. Connect nodes by clicking on an output port, hold the mouse pointer down and drag to an input port. If the correct item is transmited, you will see the labels update accordingly, indicating the item amounts coming in to the new node. You can also add a building by right-clicking an empty spot in the editor. 

## Selecting a Recipe
![Changing Recipes](/public/resources/satisflow2_recipe.gif)
Some nodes include a dropdown of possible recipes to choose from. All known alternate recipes are included for each building. If any recipes are not working correctly or have the wrong amounts, please add an issue to the repo. 

## Cloning and Deleting
![Cloning and Deleting](/public/resources/satisflow2_clone.gif)
For speed, you can right click a node to clone it. Cloning will preserve whatever recipe you've already selected. Using the same method, you can also delete the node. 

## Item connections vs Pipe connections

Green-square connection points represent item inputs and outputs, orange circular connection points represent pipe outputs. You cannot connect an item output to a pipe input and vise versa. There are some buildings however, such as mergers and splitters that can be connected to either type. Nodes that can be connected to either type are green circles with an orange border.  

## Overclocking
![Overclocking](/public/resources/satisflow2_overclock.gif)
Most buildings have the ability to be overclocked up to 250%. To do this, add an overclock node and connect it to the overclock port. Note: overclock nodes can be connected to multiple structures, unlike other buildings. Overclock nodes can be connected to multiple structures. 

## Organization
![Rotating](/public/resources/satisflow2_rotate.gif)
If you click a node, then click "R", it will rotate the node 90 degrees so connections can come and go from any desired direction. You can re-route connections by adding a junction which is a small node with an input and an output that you can use to organize your setup. 

## Creative Nodes
![Creative](/public/resources/satisflow2_creative.PNG)
If you want to get a belt with a specific item and rate, you can add a creative node. This can output any item at any rate desired, and can be connected to multiple buildings at once. This can be helpful to represent an already existing part of your factory, or to provide a balanced input to multiple structures at once. 

## Saving and Restoring
![Saving Progess](/public/resources/SavingReloadingLayouts.gif)
You can save your work by clicking the Export button, then copying the text produced and saving it somewhere of your choosing. When you are ready to restore it, paste the text back and select load. It is reccommended you save your work often, especially for larger projects. 

You can also clear the current progress by clicking the Clear Editor button. Note that you cannot recover your lost work if you click this by accident, and right now there is no confirmation message. 

## Feedback
If you have any issues, please make a post in the issues tab on github. Be specific and provide the text associated with the layout you've produced with the issue, and I will try to fix it in a timely manner. 

## Known Issues
Sometimes the editor will hang-up and you will no longer be able to pan or zoom. If this happens, click the export button to save your work, copy the text, reload the page, the paste the text back and reload your progress. The error is not understood at this point in time. 

Most, but not all recipes have been directly verified to be correct in game. There may be recipes incorrect or missing recipes (especially alternate recipes). 

Note: This project seems to work best in an updated Firefox browser. 

## Donations

If you'd like to support me and this project, please use the donation button below:

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=2DS93F4W6JQKQ&currency_code=USD&source=url)

---

Some notes about me: I am not a web-designer or software engineer in any respect. I had to learn some HTML, JS, and React just to start this project. While I do have some background in programming in java and matlab, I am 100% self-taught. There will be bugs and incompatibilities I have not thought of. 

If you are interested in contributing to the project, let me know. This is also my first github project, so please be patient as I learn the ropes. 


---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 


It is a YARN based project. You can load a development build with yarn start. 
