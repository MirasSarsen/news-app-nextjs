import { configureStore } from "@reduxjs/toolkit";
import { newsApi } from "../../../../mobile/src/shared/api/newsApi";

export const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(newsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
