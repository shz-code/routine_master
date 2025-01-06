import apiSlice from "../api/apiSlice";

const sectionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSections: builder.query({
      query: () => ({
        url: `/section`,
      }),
    }),
    getSection: builder.query({
      query: (id) => ({
        url: `/section/${id}`,
      }),
    }),
    getTeacherAssignedSections: builder.mutation({
      query: (body) => ({
        url: `/section/teacher`,
        method: "POST",
        body: body,
      }),
    }),
    createSections: builder.mutation({
      query: (body) => ({
        url: `/section`,
        method: "POST",
        body: body,
      }),
    }),
    createSingleSection: builder.mutation({
      query: (body) => ({
        url: `/section/single`,
        method: "POST",
        body: body,
      }),
    }),
    assignTeacher: builder.mutation({
      query: ({ id, body }) => ({
        url: `/section/assign/${id}`,
        method: "PATCH",
        body: body,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;
        dispatch(
          apiSlice.util.updateQueryData("getSections", undefined, (draft) => {
            return draft.map((section) => {
              return section.id === id ? res.data : section;
            });
          })
        );
        dispatch(
          apiSlice.util.updateQueryData(
            "getSection",
            id.toString(),
            (draft) => {
              return res.data;
            }
          )
        );
      },
    }),
    removeTeacher: builder.mutation({
      query: (id) => ({
        url: `/section/remove/${id}`,
        method: "PATCH",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;
        dispatch(
          apiSlice.util.updateQueryData("getSections", undefined, (draft) => {
            return draft.map((section) => {
              return section.id === id ? res.data : section;
            });
          })
        );
        dispatch(
          apiSlice.util.updateQueryData(
            "getSection",
            id.toString(),
            (draft) => {
              return res.data;
            }
          )
        );
      },
    }),
    editSection: builder.mutation({
      query: ({ id, body }) => ({
        url: `/section/${id}`,
        method: "PATCH",
        body: body,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;
        dispatch(
          apiSlice.util.updateQueryData(
            "getSection",
            id.toString(),
            (draft) => {
              return res.data;
            }
          )
        );
      },
    }),
    deleteSection: builder.mutation({
      query: (id) => ({
        url: `/section/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;

        dispatch(
          apiSlice.util.updateQueryData("getSections", undefined, (draft) => {
            return draft.filter((section) => section.id !== id);
          })
        );
      },
    }),
  }),
});

export const {
  useGetSectionsQuery,
  useCreateSectionsMutation,
  useCreateSingleSectionMutation,
  useGetSectionQuery,
  useEditSectionMutation,
  useDeleteSectionMutation,
  useAssignTeacherMutation,
  useRemoveTeacherMutation,
  useGetTeacherAssignedSectionsMutation,
} = sectionApi;
