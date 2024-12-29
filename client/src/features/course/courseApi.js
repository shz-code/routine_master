import apiSlice from "../api/apiSlice";

const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => ({
        url: `/course`,
      }),
    }),
    getCourse: builder.query({
      query: (id) => ({
        url: `/course/${id}`,
      }),
    }),
    addCourse: builder.mutation({
      query: (body) => ({
        url: `/course`,
        method: "POST",
        body: body,
      }),
    }),
    editCourse: builder.mutation({
      query: ({ id, body }) => ({
        url: `/course/${id}`,
        method: "PATCH",
        body: body,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;
        dispatch(
          apiSlice.util.updateQueryData("getCourse", id.toString(), (draft) => {
            return res.data;
          })
        );
      },
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/course/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        dispatch(
          apiSlice.util.updateQueryData("getCourses", undefined, (draft) => {
            return draft.filter((course) => course.id !== id);
          })
        );
      },
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useAddCourseMutation,
  useGetCourseQuery,
  useEditCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
