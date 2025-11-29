import NEXT_PUBLIC_NEWS_API_KEY from '../../next-env'

// packages/web/src/shared/api/newsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { NewsItem, NewsResponse } from '../entities/news/types';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/' }),
  endpoints: (build) => ({
    topHeadlines: build.query<NewsResponse, { page?: number; q?: string }>({
      query: ({ page = 1, q = '' }) =>
        `top-headlines?country=us&pageSize=10&page=${page}${q ? `&q=${encodeURIComponent(q)}` : ''}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
    }),
  }),
});

export const { useTopHeadlinesQuery } = newsApi;
