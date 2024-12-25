import apiSlice from "../api/apiSlice";

const semesterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSemesters: builder.query({
      query: () => ({
        url: `/semester`,
      }),
    }),
    createSemesters: builder.mutation({
      query: (body) => ({
        url: `/semester`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useGetSemestersQuery, useCreateSemestersMutation } = semesterApi;
