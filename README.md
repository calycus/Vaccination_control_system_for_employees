# Practical test Krueger Corp

This technical test was developed following the instructions provided by the company.

## Technical Data

Kruger Corporation requires an application to keep track of employee vaccination status inventory.\
The application will have 2 roles: \
\
Administrator.\
\
Employee.

## Role access control
By default the project uses a JSON file which contains the initial access credentials which for easy handling are instantiated as:\
\
user:     admin\
password: admin\
\
![Screenshot_9](https://user-images.githubusercontent.com/46092860/189565026-a2886731-7645-4396-9f21-39b856af220f.png) \
\
\
For the registration and control of employee data, it was decided to use localStorage as a replacement for the backend.\
\
Using the store as an intermediary for better data management and better connection.\
\
![Screenshot_10](https://user-images.githubusercontent.com/46092860/189568543-b186d35b-6ac3-43ab-975f-598b2b09d297.png) \
\
\
## The administrator role can perform the following actions:
\
Register\
Edit\
List and delete Employees\
\
\
Criteria of acceptance:\
a. Record the following employee information.\
    ○ Certificate.\
    ○ Names.\
    ○ Surnames.\
    ○ Email.\
\
b. The fields must contain validations according to the data type:\
    ○ All fields are required.\
    ○ Valid ID. (Include a unique 10-digit numeric value)\
    ○ Valid email.\
    ○ Names and surnames must not contain numbers or special characters.\
\
c. When registering an employee, a username and password must be generated for the employee.\


## As an employee it is required to enter the system to view and update my information
\
a. Complete the following information:\
  ● Date of birth.\
  ● Home address.\
  ● Mobile phone.\
  ● Vaccination status: Vaccinated / Not Vaccinated.\
  ● If the employee is in vaccinated status, the following information should be requested

required:\
  ○ Type of vaccine: Sputnik, AstraZeneca, Pfizer and Jhonson&Jhonson\
  ○ Date of vaccination.\
  ○ Number of doses.\
  
  ## Available Scripts

Before being able to execute the project, it is necessary to install the dependencies required for the correct operation.

### `npm install` & `npm update`

After installing the required dependencies you can start running the project.
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
