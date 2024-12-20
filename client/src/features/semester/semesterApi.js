import apiSlice from "../api/apiSlice";

const semesterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSemesters: builder.query({
      query: () => ({
        url: `/Semester`,
      }),
    }),
    createSemesters: builder.mutation({
      query: (body) => ({
        url: `/Semester`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useGetSemestersQuery, useCreateSemestersMutation } = semesterApi;
