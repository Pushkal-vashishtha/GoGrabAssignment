# TODO Application

## Overview
This TODO application is a simple task management app built using React Native with Expo. It allows users to create groups, add tasks to those groups, mark tasks as complete, and even undo the completion of tasks. The app is designed with a modern UI that is both visually appealing and easy to navigate.

## Features
- **Group Management:** Users can create, view, and delete groups.
- **Task Management:** Users can add tasks to groups, view task details, mark tasks as complete, and redo tasks if needed.
- **Responsive Design:** The application is designed to be responsive, ensuring a consistent user experience across different screen sizes.
- **Reusable Components:** Components like buttons and task cards are designed to be reusable across different parts of the application.

## Design Choices
- **Modern UI:** We used a modern color palette with rounded corners and elevated shadows to enhance the visual appeal.
- **Global Styles:** Centralized styling using a global stylesheet (`globalStyles.js`) ensures consistency across all screens.
- **Componentization:** The application is broken down into reusable components like `Button`, `GroupItem`, and `TaskItem` to promote reusability and maintainability.
- **Navigation:** React Navigation is used to manage screen transitions, ensuring a smooth user experience.

## Challenges
- **State Management:** Managing the state of tasks across different screens required careful planning to ensure data consistency.
- **UI Consistency:** Ensuring that the UI remained consistent across various screen sizes and devices was a challenge that was addressed by using responsive design principles.
- **Performance:** Optimizing the app to handle a growing list of tasks and groups without compromising performance required careful attention to detail in how data is managed and rendered.

## Getting Started
1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/todo-app.git
    ```
2. **Install dependencies:**
    ```bash
    cd todo-app
    npm install
    ```
3. **Run the app:**
    ```bash
    npm start
    ```
4. **Building for production:**
    ```bash
    expo build:android // for Android
    expo build:ios     // for iOS
    ```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License.



SCREENSHOTS 
https://drive.google.com/drive/folders/1QY0g8p8npjlK1Lz0kcJ9wINcnnv5yKlx?usp=drive_link
