# Renting-System-Backend

## Development
- Fork and Clone the local repository
```bash
git clone <your-url>
```
- Add your local repository as origin
```bash
git remote add origin <your-url>
```

- Add this repository as upstream
```bash
git remote add upstream https://github.com/RentingSystemSE/Renting-System-Backend.git
```

- To sync your local repository with central repository
```bash
git pull upstream main
```

- You need Node & Yarn to start the development environment. Download them here - [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com).

- You can setup a `config.env` file in `config` folder of the repository. The file should look like this:

```bash
PORT=<PORT number>
MONGO_URI=<ADD YOUR MONGODB CLUSTER URI>
TOKEN_SECRET=<ADD YOUR JWT SECRET KEY>
```

- Run the server using:

```bash
npm install
npm run dev (for development mode)
npm start (for production mode)
```

- For production build:

```bash
npm build
```
