# Web Application Task
There are 5 sub-tasks under Web Application Task. 

## Tech Stack
- REST API
- Continuous Integration (CI)
- Continuous Deployment (CD)
- React
- Google Cloud

## 1: Implementing a simple backend
Implement a simple backend and REST API to GET, POST, PUT, DELETE (example: an API for a quotes). You may use any programming language of your choice.

Marking scheme
1. Successful GET, POST, PUT, DELETE API calls on localhost using Postman
2. Successful GET, POST, PUT, DELETE API calls to deployed endpoints using Postman
3. Some ability to handle common edge cases and error-resiliency. The deployed endpoint especially should not crash.

Resource Links
1. https://expressjs.com/en/starter/hello-world.html
2. https://medium.com/@dinyangetoh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-99348012925d

## 2: Testing through Continuous Integration (CI)
Write simple test cases for your designed API and use a CI tool (Travis, etc) to automate testing. You may use any programming language of your choice.

Learning Objectives
1. To understand the importance of testing and CI tools in simplifying the process of testing.

Marking scheme
1. Successful testing for API using Mocha/Chai, or any other testing framework
2. Ability to use Travis or any other CI tool to automate testing, including the necessary instructions to run these tests

Resource Links
1. https://mochajs.org/#getting-started
2. https://medium.com/@asciidev/testing-a-node-express-application-with-mocha-chai-9592d41c0083
3. https://dev.to/bushraalam/introduction-to-testing-with-mocha-and-chai-57po
4. https://docs.github.com/en/actions/automating-builds-and-tests

## 3: Deployment to a web application service using continuous deployment
Integrate a Continuous Deployment tool for automated deployment to a web application hosting service (Google App Engine, AWS Elastic beanstalk, Azure App Service, etc).

Learning Objectives
1. To understand the power of automated deployment, and application hosting services in the creation of APIs.

Marking scheme
1. Ability to use automatic deployment tools to deploy a simple API to a web application hosting service (e.g., Google App Engine, AWS Elastic beanstalk, Azure App Service, etc)

Resource Links
1. https://docs.travis-ci.com/user/deployment/elasticbeanstalk/
2. https://javascript.plainenglish.io/deploy-using-github-actions-on-aws-elastic-beanstalk-c23ecd35776d
3. https://github.com/marketplace/actions/beanstalk-deploy
4. https://leonardqmarcq.com/posts/github-actions-cicd-elastic-beanstalk

## 4: Implement a frontend
Build a frontend Single Page Application (SPA) using React, Vue or any other library/framework.

Learning Objectives
1. To understand Model-View-Controller in the context of real-life frameworks.

Marking scheme
1. Ability to interact with the API using the frontend
2. Implementation of style e.g., using Bootstrap

Resource Links

React.js
1. Official React Docs - https://reactjs.org/
2. Introduction to React (Playlist) by Harish - https://www.youtube.com/playlist?list=PL2egE6KxHa-t3t0OdW5OGmhlk3ymJNy5S
3. Building an All-Star React Stack by Harish - https://www.youtube.com/watch?v=FA3pAXKz2fo&t=278s

Vue.js
1. https://vuejs.org/v2/guide/
2. https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html

## 5: Pull data from a serverless function on your Front-end Task
Create and deploy a serverless function, and pull some information from the serverless function to your front end. Your function must perform some kind of data retrieval and cleanup, or any non-trivial logic.

Example of what is acceptable:
- Pull data from a currency API and only show Asian currencies
  - Example: https://exchangerate.host/ or https://exchangeratesapi.io
- Pull data from a weather API and return only X hours of data/a value only if it’s raining/a message based on weather data
- Collated list of APIs you may want to use:
  - https://github.com/jackveiga/singapore-apis/blob/master/README.md

Example of what is not acceptable:
- An addition API
- An API that performs trivial string manipulation only (e.g. strips whitespace, fixes casing, etc)

Learning Objectives
1. To understand what serverless functions are and how to use them
2. To understand how to integrate serverless functions into a simple web application

Marking scheme
1. Deploying a serverless function to Google Functions/AWS Lambda/Azure Functions
2. Ability to interact with the serverless API using the frontend

Resource Links
1. AWS Lambda: https://aws.amazon.com/getting-started/hands-on/run-serverless-code/
2. Google Cloud: https://cloud.google.com/functions/docs/first-overview
3. Azure Functions: https://docs.microsoft.com/en-us/azure/azure-functions/functions-get-started
