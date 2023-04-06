# MV JSON Generator Backend

This is the backend for the Node [MV JSON Generator application](https://github.com/supreethavadhani/angular-mv-json-generator). It provides endpoints for generating and retrieving data in JSON format.

## Getting Started

### Prerequisites

- Node.js (version 16.X.X or higher)
- npm (version 8.X.X or higher)
- Git

### Cloning the Repository

To clone the repository, run the following command:

```sh
git clone https://github.com/supreethavadhani/node-mv-json-generator-backend.git
```

### Running the server

To run the server 

```sh
node index.js
```

# Creating an OpenAI API Key (Optional)

To use the OpenAI API, you will need an API key. If you already have an API key, you can skip this step. Otherwise, follow these steps to create an API key:

1. Sign up for an account on the OpenAI website.
2. Go to the [API keys page](https://beta.openai.com/docs/developer-apis/api-keys).
3. Click the "Create New API Key" button.
4. Give your API key a name and click the "Create" button.
5. Copy the API key to a secure location.

# Setting the Environment Variable for the OpenAI API Key

To use the OpenAI API key in the Node.js application, you will need to set it as an environment variable.

## Unix-based systems

On Unix-based systems (e.g. Linux, macOS), you can set the environment variable by running the following command in your terminal:

```sh
export OPENAI_API_KEY=YOUR_API_KEY_HERE
```

## Windows systems

On Windows Systems ( you can set the environment variable by running the following command in your terminal:

```sh
set OPENAI_API_KEY=YOUR_API_KEY_HERE
```
