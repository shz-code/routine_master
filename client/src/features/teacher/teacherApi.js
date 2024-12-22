import apiSlice from "../api/apiSlice";

const teacherApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTeacher: builder.mutation({
      query: (body) => ({
        url: `/teacher`,
        method: "POST",
        body: body,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    getTeachers: builder.query({
      query: () => ({
        url: `/teacher`,
      }),
    }),
    getTeacherInfo: builder.query({
      query: (id) => ({
        url: `/teacher/${id}`,
      }),
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useAddTeacherMutation,
  useGetTeacherInfoQuery,
} = teacherApi;
