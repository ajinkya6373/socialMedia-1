import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../services/apiCall";
import { current } from "immer";

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",

  async (userId, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("GET", `user/${userId}`);

    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

export let createPost = createAsyncThunk(
  "user/createPost",
  async ({ userId, postDetails }, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("POST", `post/${userId}/create`, {
      postDetails,
    });

    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

export let getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (userId, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("GET", `post/${userId}/all`);

    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: null,
    status: "idle",
    message: "null",
    userPosts: null,
  },

  reducers: {
    updateUserPosts: (state, action) => {
      if (state.userPosts) {
        state.userPosts = state.userPosts.map((post) => {
          if (post._id === action.payload.post._id) {
            return action.payload.post;
          }
          return post;
        });
      }
    },

    updateUserDetails: (state, action) => {
      if (action.payload.userDetails._id === action.payload.userDetails._id) {
        state.userDetails = action.payload.userDetails;
      }
    },
    cleartUserDetails: (state) => {
      return {
        userDetails: null,
        status: "idle",
      };
    },

    deletePostFromUser: (state, action) => {
      console.log(current(state));

      if (state.userPosts) {
        state.userPosts = state.userPosts.filter(
          (post) => post._id !== action.payload.postId
        );
      }
      if (state.userDetails) {
        state.userDetails.posts = state.userDetails.posts.filter(
          (postId) => postId !== action.payload.postId
        );
      }
      console.log(current(state));
    },
  },
  extraReducers: {
    [getUserDetails.pending]: (state) => {
      state.status = "loading";
    },
    [getUserDetails.fulfilled]: (state, action) => {
      state.userDetails = action.payload.data.userDetails;
      state.status = "fullfilled";
    },
    [getUserDetails.rejected]: (state, action) => {
      state.status = "rejected";
    },

    [createPost.pending]: (state) => {
      state.status = "loading";
    },
    [createPost.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.message = action.payload.data.message;

      if (
        state.userDetails != null &&
        state.userDetails._id === action.payload.data.post.user._id
      ) {
        state.userDetails.posts.unshift(action.payload.data.post._id);
      }

      if (
        state.userDetails != null &&
        state.userDetails._id === action.payload.data.post.user._id
      ) {
        state.userPosts.unshift(action.payload.data.post);
      }
    },
    [createPost.rejected]: (state, action) => {
      state.status = "rejected";
      state.message = action.payload.message;
    },

    [getUserPosts.pending]: (state) => {
      state.status = "loading";
    },
    [getUserPosts.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.message = action.payload.data.message;
      state.userPosts = action.payload.data.posts;
    },
    [getUserPosts.rejected]: (state, action) => {
      state.status = "rejected";
      state.message = action.payload.message;
    },
  },
});

export const { resetUserSlice, deletePostFromUser, updateUserPosts } =
  userSlice.actions;

export default userSlice.reducer;
