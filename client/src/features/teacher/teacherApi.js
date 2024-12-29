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
    getTeacher: builder.query({
      query: (id) => ({
        url: `/teacher/${id}`,
      }),
    }),
    editTeacher: builder.mutation({
      query: ({ id, body }) => ({
        url: `/teacher/${id}`,
        method: "PATCH",
        body: body,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;
        dispatch(
          apiSlice.util.updateQueryData(
            "getTeacher",
            id.toString(),
            (draft) => {
              return res.data;
            }
          )
        );
      },
    }),
    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/teacher/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;

        dispatch(
          apiSlice.util.updateQueryData("getTeachers", undefined, (draft) => {
            return draft.filter((teacher) => teacher.id !== id);
          })
        );
      },
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useAddTeacherMutation,
  useGetTeacherQuery,
  useEditTeacherMutation,
  useDeleteTeacherMutation,
} = teacherApi;
