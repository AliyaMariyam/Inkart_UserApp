import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore,persistReducer } from "redux-persist";
import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import { inkartReducer } from "./reducer";

const persistConfig = {
    key:'Inkart',
    storage:AsyncStorage
}

const persistedReducer = persistReducer(persistConfig,inkartReducer)

const store = configureStore({
    reducer:persistedReducer,
    middleware:getDefaultMiddleware=>getDefaultMiddleware({
        immutableCheck:false,
        serializableCheck:false
    })
})

let persister = persistStore(store)

export {store,persister}


// This code is for setting up and configuring Redux in a React Native application with data persistence using AsyncStorage. Here's a simple explanation of what each part of the code does:

// Import Necessary Packages:

// Import AsyncStorage from the @react-native-async-storage/async-storage package. It is used to store data on the device.
// Import functions like persistStore and persistReducer from the redux-persist package, which helps in persisting and rehydrating Redux store data.
// Import functions like configureStore and getDefaultMiddleware from the @reduxjs/toolkit package, which are used for setting up the Redux store.
// Configure Data Persistence:

// Create a persistConfig object with configuration options.
// The key property specifies a unique key ('Inkart') for storing data in AsyncStorage.
// The storage property specifies AsyncStorage as the storage engine.
// Create a Persisted Reducer:

// Use persistReducer to wrap your Redux reducer (inkartReducer) with the persistConfig. This creates a new reducer that handles data persistence.
// Configure the Redux Store:

// Use configureStore to create the Redux store.
// Pass the persistedReducer as the reducer option to the store, which incorporates data persistence.
// The getDefaultMiddleware function is used to configure middleware for the store. In this code, it's configured to disable checks related to immutability and serializability for performance reasons.
// Create a persister:

// Use persistStore to create a persister object.
// The persister is responsible for saving and loading the Redux store's state to/from AsyncStorage.
// Export the Store and Persister:

// Finally, the code exports the Redux store (store) and the persister.
// In summary, this code sets up Redux for state management in a React Native app and configures it to persist data using AsyncStorage. It creates a store with a persisted reducer and middleware settings and exports the store and persister for use throughout the application.