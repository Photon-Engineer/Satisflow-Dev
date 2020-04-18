
# Satisflow

Hello and thank you for your visiting this repo! For the actual tool, go to [photon-engineer.github.io/Satisflow](https://photon-engineer.github.io/Satisflow/).

This goal of this project is to provide a helpful tool for the game [Satisfactory](https://www.satisfactorygame.com/). The tool is a flow-based calculator where you can add nodes and make connections for the purpose of planning out each part. This is tool is designed from the ground up with interactivity in mind. It allows you to save the output as text to be able to reload previous work. The tool makes use of [Rete JS](https://github.com/retejs/rete) and several of its plugins to accomplish this. This project would not have been kicked off without their initial work.

![Satisflow](/public/resources/satisflow_demo_image.PNG)

Simple tutorial:

## Adding Factory buildings and connecting them:
![Add and connect nodes](/public/resources/AddingNodes.gif)
Adding nodes as as simple as dragging the desired node into the editor from the options on the left side. All non-power related buildings are available, though those may be added in the future. Connect nodes by clicking on an output port, hold the mouse pointer down and drag to an input port. If the correct item is transmited, you will see the labels update accordingly, indicating the item amounts coming in to the new node. You can also add a building by right-clicking an empty spot in the editor. 

## Selecting a Recipe
![Changing Recipes](/public/resources/ChooseRecipe.gif)
Some nodes include a dropdown of possible recipes to choose from. All known alternate recipes are included for each building. If any recipes are not working correctly or have the wrong amounts, please add an issue to the repo. 

## Cloning and Deleting
![Cloning and Deleting](/public/resources/CloningNodes.gif)
For speed, you can right click a node to clone it. Cloning will preserve whatever recipe you've already selected. Using the same method, you can also delete the node. 

## Overclocking
Most buildings have the ability to be overclocked up to 250%. To do this, add an overclock node and connect it to the overclock port. Note: overclock nodes can be connected to multiple structures, unlike other buildings. 

## Saving and Restoring
![Saving Progess](/public/resources/SavingReloadingLayouts.gif)
You can save your work by clicking the Export button, then copying the text produced and saving it somewhere of your choosing. When you are ready to restore it, paste the text back and select load. It is reccommended you save your work often, especially for larger projects. 

You can also clear the current progress by clicking the Clear Editor button. Note that you cannot recover your lost work if you click this by accident, and right now there is no confirmation message. 

## Known Issues
Sometimes the editor will hang-up and you will no longer be able to pan or zoom. If this happens, click the export button to save your work, copy the text, reload the page, the paste the text back and reload your progress. The error is not understood at this point in time. 

Not all recipes have been tested. 

If you encounter any other issues, please add it to the issues on this repository. 

## Donations

If you'd like to support me and this project, please use the donation button below:

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=2DS93F4W6JQKQ&currency_code=USD&source=url)

---

Some notes about me: I am not a web-designer or software engineer in any respect. I had to learn some HTML, JS, and React just to start this project. While I do have some background in programming in java and matlab, I am 100% self-taught. There will likley be bugs and incompatibilities I have not thought of. 

If you are interested in contributing to the project, let me know. This is also my first github project, so please be patient as I learn the ropes. 


---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
