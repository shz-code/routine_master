import apiSlice from "../api/apiSlice";

const timeSlotApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTImeSlots: builder.query({
      query: () => ({
        url: `/TimeSlot`,
      }),
    }),
    createTimeSlot: builder.mutation({
      query: (body) => ({
        url: `/TimeSlot`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useGetTImeSlotsQuery, useCreateTimeSlotMutation } = timeSlotApi;
