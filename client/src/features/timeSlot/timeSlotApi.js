import apiSlice from "../api/apiSlice";

const timeSlotApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTImeSlots: builder.query({
      query: () => ({
        url: `/timeSlot`,
      }),
    }),
    createTimeSlot: builder.mutation({
      query: (body) => ({
        url: `/timeSlot`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useGetTImeSlotsQuery, useCreateTimeSlotMutation } = timeSlotApi;
