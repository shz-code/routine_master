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
} = sectionApi;
