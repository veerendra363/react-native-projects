## My Learnings
- Creating custom buttons and reusable components
- Basic styling and layout design
- Adding Gradient colors using expo linear gradient
- Image Background
- **How to add eslint and prettier and resolve conflicts between them**
- Adding alerts
- Managing properties like color Globally
- Adding icons and custom font styles
- Passing styles to custom components
- Navigating between the screens

### Adaptive and responsive 
- Use maxWidth, minWidth, maxHeight and minHeight 
- Device Dimensions
    - With built in js Dimensions API is used to get the device dimensions. Based on this we can adjust the dimensions our components.
    - React native also provides an hook useWindowDimensions() which is used to get the dimensions of the device.
    - If we need dynamic device dimensions then go with useWindowDimensions hook otherwise use the Dimensions API.
- Fixing key board issues in ios using the KeyboardAvoidingView component of react native.
- Writing platform specific code using Platform API or filename.os.js (Card.ios.js, Card.android.js) just import the card without any extensions react native will take care rest.
    - If difference between the platform are less then go with Platform API otherwise go with different file for both different platforms.
