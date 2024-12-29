import apiSlice from "../api/apiSlice";

const semesterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSemesters: builder.query({
      query: () => ({
        url: `/semester`,
      }),
    }),
    getSemester: builder.query({
      query: (id) => ({
        url: `/semester/${id}`,
      }),
    }),
    createSemesters: builder.mutation({
      query: (body) => ({
        url: `/semester`,
        method: "POST",
        body: body,
      }),
    }),
    editSemester: builder.mutation({
      query: ({ id, body }) => ({
        url: `/semester/${id}`,
        method: "PATCH",
        body: body,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;
        dispatch(
          apiSlice.util.updateQueryData(
            "getSemester",
            id.toString(),
            (draft) => {
              return res.data;
            }
          )
        );
      },
    }),
    deleteSemester: builder.mutation({
      query: (id) => ({
        url: `/semester/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;

        dispatch(
          apiSlice.util.updateQueryData("getSemesters", undefined, (draft) => {
            return draft.filter((semester) => semester.id !== id);
          })
        );
      },
    }),
  }),
});

export const {
  useGetSemestersQuery,
  useCreateSemestersMutation,
  useGetSemesterQuery,
  useEditSemesterMutation,
  useDeleteSemesterMutation,
} = semesterApi;
