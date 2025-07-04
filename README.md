# REST Countries

Interact with countries REST api using HTTP Client, and manage state with Ngrx.

Live URL: [link](some url)

## 📌 Table of Contents

- [🚀 Getting Started](#-getting-started)
- [🛠️ Tech Stack](#-tech-stack)
- [📦 Installing](#-installing)
- [💻 Running the Application](#-running-the-application)
- [📋 Approach](#-approach)
- [📸 Screenshots](#-screenshots)
- [🚀 Deployment](#-deployment)
- [👤 Author](#-author)

## 🚀 Getting Started

This project is built using Angular, SCSS, Typescript and hosted on Netlify.

## 🛠️ Tech Stack

- Angular
- RxJS
- Jasmine & Karma(test runner)
- Typescript
- SCSS

## 📦 Installing

Clone the repository and run the command:

```sh
git clone https://github.com/victorbruce/rest-countries
cd rest-countries
```

## 💻 Running the Application

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

**NB:** Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## 📸 Screenshots

## 📋 Approach

**Project Structure**:

- Defined by project starting structue by creating folders for `services`, `components`, `models`, `pages`, `assets`, `utilities`, `environments`, `routes` etc.

**Ngrx store implementation**

- Next, I installed all the necessary **@ngrx** packages such as `@ngrx/store`, `@ngrx/effects`, `@ngrx/store-devtools` and setup ngrx store in the `app.config.ts` file providing a store in `provides: []`
- Created a country state to save in my ngrx store by defining a `state`, `actions`, `reducers`, and `effects`

**Component Structure**

- Next, I created services for:

1. Abstracting HTTP into an `ApiClientService`
2. Creating an error handler service `ErrorHandlerService`
3. Defining a data service for country to call api endpoints via the `ApiClientService`

**Implement Search Functionality:**

- I added a `searchTerm` property to my `initialContryState` object, created an action and define a reducer and a **computed selector** for my state using `createSelector`
- In my countries component, I then **dispatched** a `setSearchTerm` action when a user types.
- I added some optimisation techniques for searching such as:

  - a **debounce optimization technique** using RxJs `debounce` operator that waits **300ms** after the user stops typing before \*\*emitting a value.

    > **Importance:** _This prevents firing our `setSearchTerm` action on every **keystroke**, reducing the load on the state and selector logic. If the user keeps typing, the timer resets and no dispatch happens until they pause._

  - use `distinctUntilChanged()` function from RxJs to skip dispatch for same value typed twice. This avoids redunant actions if the user types the same thing twice.

**Implement Filter Functionality:**

- I extend country initial state to add `regionFilter`.
- I then updated the coutnry actions with `setRegionFilter` and a reducer logic to update state when user dispatch the `setRegionFilter` action when a region is selected.
- After, I added an optimization technique by preventing dispatch to get emitted when the same region is selected twice or more using RxJs `distinctUntilChanged` function to reduce the load on the state and selector logic.

**Component Details**

- Implement selecting a single country from Ngrx store
- Modify API_URL to add extra params like cca3 to get country codes, borders etc
- Add method for fetching a single country from the api url by code
- Render country details in the details page

**Implement theme**
- Add theme toggle functionality by storing theme state in ngrx store

**Design UI and make it responsive**

## 🚀 Deployment

Netlify

## 👤 Author

Victor Bruce
