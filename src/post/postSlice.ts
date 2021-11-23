import { createSlice, createAsyncThunk, isFulfilled } from "@reduxjs/toolkit";
import axios from "axios";
import { IQueryParams, Post } from "./model";

const headers = {
  Authorization: "Bearer " + localStorage.getItem("access_token"),
};

export const searchPostList = createAsyncThunk(
  'post/searchPostList', 
  async(search: string) => {
    const url = `http://192.168.1.210:8080/api/_search/products?query=${search}`;
    return axios.get<Post>(url, { headers: headers })
  }
)

export const getPostList = createAsyncThunk(
  "post/getPostList",
  async ({ page, limit, search }: IQueryParams) => {
    const url = `http://192.168.1.210:8080/api/products?page=${page}&size=${limit}`;

    return axios.get<Post>(url, { headers: headers });
  }
);

export const getOnePost = createAsyncThunk(
  "post/getOnePost",
  async (id: string | number) => {
    const url = `http://192.168.1.210:8080/api/products/${id}`;
    return await axios.get<Post>(url, { headers: headers });
  }
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async (entity: Post, thunkAPI) => {
    const url = `http://192.168.1.210:8080/api/products`;
    // thunkAPI.dispatch(getPostList({}));
    console.log(entity);

    return await axios.post<Post>(url, entity, { headers: headers });
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (entity: Post, thunkAPI) => {
    const url = `http://192.168.1.210:8080/api/products/${entity.id}`;
    return await axios.put<Post>(url, entity, { headers: headers });
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id: number | string, thunkAPI) => {
    const url = `http://192.168.1.210:8080/api/products/${id}`;
    const result = await axios.delete<Post>(url, { headers: headers });
    thunkAPI.dispatch(getPostList({ page: 0, limit: 5, search:'' }));
    
    return result;
  }
);

export interface PostState {
  status: string;
  list: Post[];
  click: number;
}

const initialState: PostState = {
  status: "",
  list: [],
  click: -1,
};

const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getOnePost.fulfilled, (state: any, action) => {
        state.status = "...";
        state.list = action.payload.data;
      })
      .addCase(deletePost.fulfilled, (state: any, action) => {
        state.status = "delete done";
      })
      .addMatcher(isFulfilled(getPostList,searchPostList), (state: any, action) => {
        return {
          ...state,
          list: action.payload.data,
          status: "load done",
        };
      })
      .addMatcher(isFulfilled(createPost), (state: any, action) => {
        state.list.push(action.payload.data);
      })
      .addMatcher(isFulfilled(updatePost), (state: any, action) => {
        const tempCategory = state.list.map((item: any, index: number) =>
          item.id === action.payload.data.id ? action.payload.data : item
        );
        console.log(tempCategory);
        return {
          ...state,
          list: tempCategory,
        };
      });
  },
});

export default PostSlice.reducer;
