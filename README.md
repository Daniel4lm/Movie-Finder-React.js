## Movie Finder Web App

This project was made by using [React.js](https://reactjs.org/) library and bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

*This app have the functionalities of displaying the top 10 rated movies/TV shows, a search function for both(movie & tv serie section), and a detail view for individual selected items.*

**TheMovieDB web API** is used to provide data from their end points. 
*TDB API key used in this app is stored inside .env file as react environment variable and it's not uploaded to the github repository.*

## Available Scripts in project

Source code is written in Visual Studio Code, where we can use terminal to start app.
I have installed and configured *yarn* package manager because of shorter commands and higher speed.
    
    ``` npm install -g yarn ```

Once in the project root, for installing all dependencies: 

```yarn``` or ```yarn install```

To ensure that existing React app project uses TypeScript :

```yarn add typescript @types/node @types/react @types/react-dom @types/jest```

In the project directory, project can be run with the following script:

```yarn start```

This runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


:mag: *The project has the following structure as shown below :*
```
  [+] movie-finder
   |
   | - [*] .node_modules
   |
   | - [*] public
   |
   | - [*] src
   |    | - [*] components
   |    |    |
   |    |    | - [*] Footer
   |    |    |    | - Footer.tsx
   |    |    |    | - Footer.css
   |    |    |
   |    |    | - [*] Navigation
   |    |    |    | - NavBar.tsx
   |    |    |    | - NavBar.css
   |    |    |  
   |    |    | - [*] Home
   |    |    |    | - HomePage.tsx
   |    |    |    | - SearchPage.css
   |    |    |
   |    |    | - [*] SearchPage
   |    |    |    | - SearchPage.tsx
   |    |    |    | - SearchPage.css
   |    |    |  
   |    |    | - [*] DetailsPage
   |    |    |    | - DetailsPage.tsx
   |    |    |    | - DetailsPage.css
   |    |    |  
   ...
   |    |
   |    | - [*] context
   |    |    | - MovieContext.tsx   <- main context for passing props in our app
   |    |
   |    | - [*] reducer
   |    |    | - moviestv.reducer.ts    <- main reducer hook
   |    |    | - details.reducer.ts     <- reducer hook for specific movie/tv serie
   |    |
   |    | - [*] routes
   |    |    | - routes.ts      <- configuration file for routes
   |    |    | - helper.tsx     <- render our routes(from routes.ts) wrapped in <Switch> element
   |    ...
   | 
   |    
   ...
   
   ```
   
##### **Short daily history:**
- (27.04.2021)
    - Created empty react application using Create React App (with typescript):
        `` npx create-react-app my-app --template typescript ``
    - Setting up all necessary packages (react-router-dom, eslint, ...)
    - Testing all necessary end points from TMDB to fetch data.
        Data fetching links:
        `` https://api.themoviedb.org/3/movie/top_rated?api_key={api_key}&language=en-US `` <- for top 10 movies
        ``  https://api.themoviedb.org/3/tv/top_rated?api_key={api_key}&language=en-US `` <- for top 10 tv shows
        `` https://api.themoviedb.org/3/search/movie?api_key={api_key}&language=en-US&query={value}&page=1`` <- search movie data by name
        `` https://api.themoviedb.org/3/search/tv?api_key={api_key}&language=en-US&page=1&query={value}&page=1`` <- search tv show data by name

        API key is stored inside .env file as react environment variable, accessible in our app.
    - Creating basic app structure, two main components(App.tsx and NavBar.tsx). 
      ``components`` folder that will contain all components files(Navigation, footer, MoviesList, MovieCard, search, ...).
      ``routes`` folder contain our setup files for routes
      ``lib`` folder contain other helper functions needed in our app
    - For store menagement, I'm choosing **useReducer** react hook because our state is a complex object with different primitive data. Sometimes these values are updated together and some of them depend on the previous values of others. To avoid having a useState function for each and multiple calls to their resulting setter functions every time we want to update something, I use useReducer to manage everything in one place and have better code readability. 
        ``const [state, dispatch] = useReducer(reducer, initialState);``
    So, initial state object holds all our data which is needed in entire app. Whe we want to update something we call corresponding dispatch function. 
    - Creating basic input form with basic search functionality. The search input is able to react for all user inputs and check for 3 or more characters. Search function is triggered exactly after 1000ms after correct/incorrect input. 

 - (28.04.2021)
    - Setting up the react router configuration. According the react router documentation, we should wrap entire app, in my case Home.tsx component, with <BrowserRouter> element from `react-router-dom`. After, in all wrapped components, we can use:
    - <Link> to programmatically navigate throught router history,
    - <Switch> to ensure that only one component is rendered at a time,
    - <Route> tags. These are the links between the components and should be placed inside the  
       <Switch> tags.
    This is my router configuration:
    ```
        {
            >> Here we render top 10 movies/tv shows, depending on toggle value
            path: '/',
            Component: HomePage,
            exact: true,
        },
        {
            >> Renders page with all found movies
            path: '/movies',
            Component: SearchPage,
            exact: true,
        },
        {
            >> Renders details page for selected movie
            path: '/movies/:id',
            Component: DetailsPage,
        },
        {
            >> Renders page with all found tv series
            path: '/tvseries',
            Component: SearchPage,
            exact: true,
        },
        {
            >> Renders details page for selected tv serie
            path: '/tvseries/:id',
            Component: DetailsPage,
        },
        {
            >> Renders 404 page
            path: '*',
            Component: NotFound
        }
        ```
    - Creating next react compoents:
      HomePage.tsx, SearchPage.tsx, DetailsPage.tsx, NotFound.tsx
    - Wraping the whole web app, inside index.tsx, with MovieContext. Ths way, we are avoiding the props drilling problem in subcomponents. So, we pass the data to other components by going through other parts that do not need the data but only help in passing it around. 

    MovieContext will hold all main data structure in my app:
     - movie/tvserie toggle value,
     - fetched top 10 movies/tv series,
     - fetched movie/tv data depending on toggle variable,
     - search value from input,
     - selected movie/tv id number,
     - loading and error message value
    
- (29.04.2021)
    - Configuring the **MoviesReducer** (from *moviestv.reducer.ts*) where we have initial state object structure from **MovieContext** and defining the following *actions*:
        ```TAB_TOGGLE, <- toggle movies/tvseries value
        INPUT_SEARC, <- store input search value
        SEARCH_TOP_MOVIES, <- store array of top 10 movies/tv
        SEARCH_MOVIETV_ITEMS, <- store array of found movies/tv
        SEARCH_MOVIESTV_REQUEST, <- setting up loading states
        UPDATE_PICTURE_URLS, <- update movies/tv array with mutated with full backdrop_path/poster_path urls
        FETCH_DATA_FAILURE <- setting up error value
        ```
    Based on the action provided, movie reducer will perform some operations on a state and returns a new updated state. 
    - **MovieContext** updating:
        Creating *MovieProvider* component, and inside this, *useReducer* hook takes this **MoviesReducer** and the initial state to return the state and the dispatch.
        We now pass these values into the **MovieContext.Provider**, and by doing this we can access the state and dispatch with the useContext hook in all othe components.
        Creating fetchData function to fetch data from TMDB API. We provide this fuction through the **MovieContext**.

- (30.04.2021)
    - Every time when user click Back link inside *DetailsPage.tsx* it returns the user back to  
      previuos state renderinside *HomePage.tsx* or *SearchPage.tsx*. Router will get back previuos value from stack.
    - Whe user type some value inside input field, router will deside and push the next route inside 
      memory stack: ``` history.push('/...') ```, so later user can go back to the previuos route state.
    - Inside *SearchPage.tsx* we check for errors and whether the state search value is empty or not, 
      so router can decide to redirect to '/' or stay on current route.
    - Created **detailsReducer** inside *detailsReducer.ts*. This reducer hook will hold the 
      following data structure :
      - loading, <- set loading state
      - movie_tv, <- object that hold selected movie/tv serie
      - errorMessage <- error message

      Actions:
      ```
        SEARCH_MOVIETV_SUCCESS, <- store object data of selected movie/tv serie
        SEARCH_MOVIETV_REQUEST, <- setting up loading states
        SEARCH_MOVIETV_FAILURE, <- setting up error value
      ```
    - Completed *DetailsPage.tsx*. This component now use state and dispatch methods from 
      *detailsReducer.ts* and in the same time state from **MovieContext**

- (01.05.2021)
    - Preventing firing useEffect’s callback function during every initial render inside NavBar.tsx.
      I realized that useEffect inside *SearchPage.tsx* is fired every time when user navigate to back from *DetailsPage.tsx*. To prevent this behaviour I added control variable:
        ```const initialRender = useRef(true);``` 
    - Changed HomePage app icon
    - Added *Footer.tsx* component

- (02.05.2021)
    - Added LoadingCircle animation while fetching movies/tv on home page and search page
    - Our react app is SPA project, which means that all our components are rendered inside one main page(*Home.tsx*), and that component inside *index.tsx*(*root* HTML element). Our document head section is not easily accessible/changeable inside react. In that purpose, the **react-helmet** package will help us to manage all changes to the document head. It also allows us to use basic HTML tags to set all the content.
        ```
            yarn add react-helmet-async
            yarn add @types/react-helmet-async 
            
        ```
        ```
            ...
            <Helmet>
                <meta charSet="utf-8" />
                <title>My title</title>
            </Helmet>
            ...
        ```


### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
