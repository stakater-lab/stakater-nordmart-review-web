import { Epic } from "redux-observable";
import {Reducer} from "redux";

export interface IRedux {
  key: string;
  reducer: Reducer<any, any>;
  epics: Epic[];
}
