import apiSlice from "../api/apiSlice";

const timeSlotApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTImeSlots: builder.query({
      query: () => ({
        url: `/timeSlot`,
      }),
    }),
    getTimeSlot: builder.query({
      query: (id) => ({
        url: `/timeSlot/${id}`,
      }),
    }),
    createTimeSlot: builder.mutation({
      query: (body) => ({
        url: `/timeSlot`,
        method: "POST",
        body: body,
      }),
    }),
    editTimeSlot: builder.mutation({
      query: ({ id, body }) => ({
        url: `/timeSlot/${id}`,
        method: "PATCH",
        body: body,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;
        dispatch(
          apiSlice.util.updateQueryData("getTimeSlot", id.toString(), () => {
            return res.data;
          })
        );
      },
    }),
    deleteTimeSlot: builder.mutation({
      query: (id) => ({
        url: `/timeSlot/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        dispatch(
          apiSlice.util.updateQueryData("getTImeSlots", undefined, (draft) => {
            return draft.filter((timeSlot) => timeSlot.id !== id);
          })
        );
      },
    }),
  }),
});

export const {
  useGetTImeSlotsQuery,
  useCreateTimeSlotMutation,
  useGetTimeSlotQuery,
  useEditTimeSlotMutation,
  useDeleteTimeSlotMutation,
} = timeSlotApi;
