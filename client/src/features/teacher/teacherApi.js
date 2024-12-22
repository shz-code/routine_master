import toast from "react-hot-toast";
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
        } catch (err) {
          console.error(err);
          toast.error(err.error?.data?.detail);
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
