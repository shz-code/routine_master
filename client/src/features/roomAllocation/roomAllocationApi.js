import apiSlice from "../api/apiSlice";

const roomAllocationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoomAllocations: builder.query({
      query: () => ({
        url: `/roomAllocation`,
      }),
    }),
    getRoomAllocation: builder.query({
      query: (id) => ({
        url: `/roomAllocation/${id}`,
      }),
    }),
    createRoomAllocation: builder.mutation({
      query: (body) => ({
        url: `/roomAllocation`,
        method: "POST",
        body: body,
      }),
    }),
    editRoomAllocation: builder.mutation({
      query: ({ id, body }) => ({
        url: `/roomAllocation/${id}`,
        method: "PATCH",
        body: body,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;
        dispatch(
          apiSlice.util.updateQueryData(
            "getRoomAllocation",
            id.toString(),
            () => {
              return res.data;
            }
          )
        );
      },
    }),
    deleteRoomAllocation: builder.mutation({
      query: (id) => ({
        url: `/roomAllocation/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        dispatch(
          apiSlice.util.updateQueryData(
            "getRoomAllocations",
            undefined,
            (draft) => {
              return draft.filter((ra) => ra.id !== id);
            }
          )
        );
      },
    }),
  }),
});

export const {
  useGetRoomAllocationQuery,
  useGetRoomAllocationsQuery,
  useCreateRoomAllocationMutation,
  useEditRoomAllocationMutation,
  useDeleteRoomAllocationMutation,
} = roomAllocationApi;
