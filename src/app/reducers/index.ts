// ActionReducerMap, combine all reducers are return them as a single reducer object
import {ActionReducerMap } from "@ngrx/store";

import { IAppCategoryState } from "../state";

import {booksReducers} from './../reducers/bookReducers';

export const mainReducers:ActionReducerMap<IAppCategoryState,any>  ={
   customerStore: booksReducers,
};
