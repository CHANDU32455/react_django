# Virtual Keyboard React Integration

``click on top left keyboard icon to toggle keyboard.``

<img src="vKeyboard/tests/result.png" alt="Test Image 1" width="300"/>

### Project Setup and Integration Guide

This guide will walk you through setting up a React project with a virtual keyboard component that can be easily bound to any input field (like a textarea). The virtual keyboard can handle key events and update the values of the associated input fields dynamically.

### 1. Create a New React App
Make sure you have Node.js and npm installed. To create a new React app, run the following command:

```bash
npx create-react-app appname
```

considering frontend being my appname

<img src="vKeyboard/tests/ps2.png" alt="Test Image 1" height="300"/>

### 2. Setting Up the Project
Once the project is created, navigate to your project directory:
```bash
cd appname
```
Inside the src folder, you will find an App.js file. You can replace its content with the provided code, or you can create new components if preferred.

### 3. File Structure
For a cleaner project structure, it’s a good idea to organize your components. Here’s an example folder structure for the VirtualKeyboard integration:

```bash
/appname
  /src
    /components
      VirtualKeyboard.js
    App.js
    index.js
    ...
```
You can create a components folder and place the VirtualKeyboard.js component in it, then import it into App.js as needed.

### 4. VirtualKeyboard Component
The VirtualKeyboard.js file contains the virtual keyboard logic. It listens for key events and updates the value of the textarea field dynamically.
```javascript
import keyboard_image from './assets/images/keyboard.png';   // better same image name , Adjust path accordingly
```
### 5. Updating App.js
Now, you need to modify your App.js to include a form with multiple textarea elements, and bind them to the virtual keyboard.
```javascript
import VirtualKeyboard from './components/VirtualKeyboard'; // Adjust path accordingly
```
### 6. Importing and Using the Keyboard
Once the components are set up correctly, you can import and use the VirtualKeyboard with a single line in your App.js or any other component where you want the virtual keyboard to be used:

```jsx
<VirtualKeyboard onChange={(value) => handleInputChange(focusedIndex, value)} focusedIndex={focusedIndex} />
```
### 7. Project Structure Overview
Here’s a summary of the project structure for reference:

``` Structure
/appname
  /src
    /components
      VirtualKeyboard.js   // Virtual keyboard component
    App.js                 // Main app with form to test the virtual keyboard
    index.js               // React entry point
    styles.css             // Optional CSS for styling the keyboard and textareas
  package.json
  README.md
```
### Final Steps: Start the Server

Once everything is set up, it's time to start the server and run your application. In the project directory, run the following command:

```bash
npm start
```
### 8. Considerables:
In order to use the virtual keyboard effectively, make sure you follow these steps to ensure the keyboard works when the input field is focused:
**Track Focused Field**: 
   You need to identify which input field (textarea) is currently focused. This is done using the `onFocus` event. When the user clicks on any textarea, it becomes the active field, and the virtual keyboard will update that specific field.

   Example:
   ```jsx
   <textarea
      value={value}
      onFocus={() => setFocusedIndex(index)} // Track which field is focused
      onChange={(e) => handleInputChange(index, e.target.value)} // Handle direct typing
      rows="3"
      cols="50"
      style={styles.textArea}
   />
```
focus on 
```jsx
   onFocus={() => setFocusedIndex(index)} // Set which field is focused
```
### 9. Testing the Virtual Keyboard
In this setup, when you click on any textarea, it becomes the "focused" input field, and the virtual keyboard will update that field with the key that you click. You can test the keyboard by typing or clicking on the textarea fields.
#### Individual field test
<img src="vKeyboard/tests/test1.png" alt="Test Image 1" width="500"/>

#### Entire form test
<img src="vKeyboard/tests/test2.png" alt="Test Image 2" width="500"/>

### 10. Conclusion

#### Usage
Simply import the `VirtualKeyboard` component and use it in your app with the provided props. The `onChange` function should be linked to your input field, and the `focusedIndex` will track which field is being updated.

Example of usage in your app:

```jsx
<VirtualKeyboard
  focusedIndex={focusedIndex} // Track which field is focused
  onChange={(value) => handleInputChange(focusedIndex, value)} // Update the focused field
/>
```

