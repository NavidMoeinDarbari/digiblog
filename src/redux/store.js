import { legacy_createStore as createStore } from "redux";
import { archiveReducer } from "./archive/archiveReducer";

const store = createStore(archiveReducer) 

export default store;