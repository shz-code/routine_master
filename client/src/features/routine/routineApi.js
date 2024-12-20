import apiSlice from "../api/apiSlice";

const routineApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoutine: builder.query({
      query: (data) => ({
        url: `/GetRoutine`,
        method: "POST",
        body: data,
      }),
    }),
    getTeacherRoutine: builder.query({
      query: (data) => ({
        url: `/GetTeacherRoutine`,
        method: "POST",
        body: data,
      }),
    }),
    createRoutine: builder.mutation({
      query: (body) => ({
        url: `/Routine`,
        method: "POST",
        body: body,
      }),
    }),
    createRoutineFeedback: builder.mutation({
      query: (body) => ({
        url: `/Routinefeedback`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useCreateRoutineMutation,
  useGetRoutineQuery,
  useGetTeacherRoutineQuery,
  useCreateRoutineFeedbackMutation,
} = routineApi;
