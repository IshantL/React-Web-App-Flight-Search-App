
Flight Search Web app to search flights. It uses a dummy JSON data. 
Concepts such as filtering sorting and Basic CSS should be learned from this example.

Demo: https://ishantl.github.io/React-Web-App-Flight-Search-App/

## How to use

- clone the project
- npm install
- npm start

## Details about the commands

  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)



### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Deploying React Applications to Github Pages
Now follow these steps to publish your react application on gh-pages:

1. Build a react application or just fork and clone the above repository on Github.
2. Install thegh-pages package from npm. On the terminal, run:
npm install gh-pages or yarn add gh-pages

This package would help us to create a gh-pagesbranch on Github and also serve our bundled react files on the branch.

3. Locate the package.json file in your root directory, add this line of code to your script: "homepage": "link-to-your-repository", and save.

4. In your package.json file, locate “scripts” add these lines of code:
```
{
   ...
   "predeploy": "yarn run build",
   "deploy": "gh-pages -d build",
   ...
}
```
5. In the terminal, run this command npm run deploy OR yarn run deploy.This command pushes your built file to the gh-pagesbranch on your remote repository.
