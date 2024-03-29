import { api } from "./api";
import { User } from "../models/user.model";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      // Specify the type for the query result (User[])
      query: () => "/users",
      providesTags: ["User"],
    }),
    getUserById: builder.query<User, number>({ // never used in this project because ww already have the users in the store as a list
      query: (id) => `/user/${id}`,
      providesTags: ["User"],
    }),
    addUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "/user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
      transformResponse: (response: any) => {
        return response.status === 201 ? response.status : response;
      },
      transformErrorResponse: (response: any) => {
        return response.status === 409 ? response.status : response;
      },
    }),
    updateUser: builder.mutation<User, { id: number; body: Partial<User> }>({
      query: ({ id, body }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],

      transformErrorResponse: (response: any) => {
        console.log(response);
        return response.status === 409 ? response.status : response;
      },
    }),
    deleteUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: `/user/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Export the API and types for better organization
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;

// Export types for the queries

export type { User };
