import apiSlice from "../api/apiSlice";

const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => ({
        url: `/course`,
      }),
    }),
    addCourse: builder.mutation({
      query: (body) => ({
        url: `/course`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useGetCoursesQuery, useAddCourseMutation } = courseApi;
