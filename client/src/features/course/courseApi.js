import apiSlice from "../api/apiSlice";

const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => ({
        url: `/GetAllCourses`,
      }),
    }),
    addCourse: builder.mutation({
      query: (body) => ({
        url: `/Courses`,
        method: "POST",
        body: body,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getCourses", undefined, (draft) => {
              return [...draft, res.data];
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useGetCoursesQuery, useAddCourseMutation } = courseApi;
