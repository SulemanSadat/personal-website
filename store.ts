import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./features/ui/uiSlice";
import portfolioReducer from "./features/portfolio/portfolioSlice";
export const makeStore = () => configureStore({ reducer: { ui: uiReducer, portfolio: portfolioReducer } });
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
