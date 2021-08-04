import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Container from "@material-ui/core/Container";
import PostPreview from "../../components/postPreview";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getCurrentPost, resetCurrentPostSlice } from "./currentPostSlice";
import { deletePostFromUser } from "../profileContainer/userSlice";
export default function PostContainer() {
  const [currentPostDetails, currentPostDetailsSetter] = useState(null);
  let currentPost = useSelector((state) => state.currentPost);
  let auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPost.deleteStatus === "fullfilled") {
      dispatch(deletePostFromUser({ postId: currentPost.currentPost._id }));
      toast.success(currentPost.message);
      navigate(`/profile/${auth.userKey}`);
    } else if (currentPost.deleteStatus === "rejected") {
      toast.error(currentPost.message);
    }
  }, [currentPost]);

  useEffect(() => {
    if (currentPost.status === "fullfilled") {
      currentPostDetailsSetter(currentPost.currentPost);
    } else if (currentPost.status === "rejected") {
      toast.error(currentPost.message);
      navigate("/");
    }
  }, [currentPost]);

  useEffect(() => {
    dispatch(getCurrentPost(postId));
    return () => {
      dispatch(resetCurrentPostSlice());
    };
  }, [postId]);

  return (
    <div className="main-container">
      <Navbar />
      <Container fixed maxWidth="md">
        {currentPostDetails ? (
          <PostPreview currentPost={currentPostDetails} />
        ) : (
          <h1>loading</h1>
        )}
      </Container>
    </div>
  );
}
