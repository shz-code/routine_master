import apiSlice from "../api/apiSlice";

const routineApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeacherRoutine: builder.mutation({
      query: (data) => ({
        url: `/routine/teacher`,
        method: "POST",
        body: data,
      }),
    }),
    createRoutine: builder.mutation({
      query: (body) => ({
        url: `/routine`,
        method: "POST",
        body: body,
      }),
    }),
    deleteRoutine: builder.mutation({
      query: (body) => ({
        url: `/routine`,
        method: "DELETE",
        body: body,
      }),
    }),
  }),
});

export const {
  useCreateRoutineMutation,
  useGetTeacherRoutineMutation,
  useDeleteRoutineMutation,
} = routineApi;
