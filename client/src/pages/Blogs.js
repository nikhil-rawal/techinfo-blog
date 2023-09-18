import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  //get blogs
  const getAllBlogs = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Blogs Page</h1>
    </>
  );
};

export default Blogs;
