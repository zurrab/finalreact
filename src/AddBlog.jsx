import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "./Navbar";
import Footer from './Footer';


function AddBlog() {
  const [data, getData] = useState({ title: "", description: "", comments: [] });
  const { id } = useParams();
  const navigate = useNavigate();

  const [commentValue, setCommentValue] = useState("");

  const [adding, setAdding] = useState(true);
  const [addTitle, setAddTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`https://apitest.reachstar.io/blog/get/${id}`)
        .then((response) => {
          getData(response.data);
          setAddDescription(response.data.description);
          setAddTitle(response.data.title);
          setAdding(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const handleSave = () => {
    const url = adding
      ? "https://apitest.reachstar.io/blog/add"
      : `https://apitest.reachstar.io/blog/edit/${id}`;

    const payload = {
      title: addTitle,
      description: addDescription,
    };

    axios
      .post(url, payload)
      .then((response) => {
        console.log("Changes saved successfully:", response);
        navigate("/Home");
      })
      .catch((error) => {
        window.alert("Error saving changes:", error);
        console.error("Error saving changes:", error);
      });
  };

  const addComment = (event) => {
    event.preventDefault();
    axios
      .post(`https://apitest.reachstar.io/comment/add/${id}`, {
        comment: commentValue,
      })
      .then((response) => {
        console.log("Comment added successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        window.alert("There was an issue adding the comment");
      });
  };

  const deleteBlog = (blogId) => {
    axios
      .delete(`https://apitest.reachstar.io/blog/delete/${blogId}`)
      .then((response) => {
        console.log("Blog Deleted Successfully");
        navigate("/Home");
      })
      .catch((error) => {
        console.log("Blog delete error:", error);
      });
  };

  const deleteComment = (commentId) => {
    axios
      .delete(`https://apitest.reachstar.io/comment/delete/${commentId}`)
      .then((response) => {
        console.log("Comment deleted successfully:");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Comment delete error:", error);
      });
  };

  return (
    <Fragment>
      <Navbar />

      <div className="container-fluid">

        <div className="container shadow-lg p-3 mb-5 bg-body-tertiary rounded ">
        <div className="row">
          <div className="col-12 p-0 mt-1 mt-md-5" style={{ borderStyle: "none", height: "auto" }}>
            <h3 className="text-secondary-emphasis text-primary d-flex justify-content-center">Add Your Blog</h3>
            <div className="card mb-2 mt-1 mt-md-5" style={{ borderStyle: "none" }}>
              <div className="card-header mb-md-5" style={{ borderStyle: "none", backgroundColor: "white" }}>
                <label htmlFor="titleInput" className="form-label">Title</label>
                <input
                  id="titleInput"
                  type="text"
                  style={{
                    width: "100%",
                    outlineColor: "#EBEBEB",
                  }}
                  value={addTitle}
                  onChange={(e) => setAddTitle(e.target.value)}
                  placeholder="Title"
                />
              </div>
              <div className="card-body mb-1">
                <label htmlFor="descriptionInput" className="form-label">Description</label>
                <ReactQuill
                  id="descriptionInput"
                  theme="snow"
                  value={addDescription}
                  onChange={setAddDescription}
                  placeholder="Description"
                />
                <div className="d-flex justify-content-start mt-3  d-none d-sm-block ">
                  <button
                    className="btn bg-success "
                    id="buttonShadow"
                    style={{
                      fontFamily: "JosefinSans-SemiBold",
                      color: "white",
                      width : "120px",
                    }}
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
                <div className="d-flex justify-content-start mt-3  d-block d-md-none ">
                  <button
                    className="btn bg-primary "
                    id="buttonShadow"
                    style={{
                      fontFamily: "JosefinSans-SemiBold",
                      color: "white",
                      width : "100%",
                    }}
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
              {id && (
                <Fragment>
                  <form
                    onSubmit={addComment}
                    className="d-flex align-items-center ps-2 ps-md-4"
                    style={{
                      width: "100%",
                      backgroundColor: "#f8f9fa",
                      padding: "10px",
                      marginTop: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <ReactQuill
                      style={{ width: "78%", borderRadius: "5px", marginRight: "10px" }}
                      theme="snow"
                      value={commentValue}
                      onChange={setCommentValue}
                      placeholder="Write a comment..."
                    />
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        fontFamily: "JosefinSans-SemiBold",
                        fontWeight: "600",
                        fontSize: "14px",
                        color: "white",
                        borderStyle: "none",
                        outline: "none",
                      }}
                    >
                      Add Comment
                    </button>
                  </form>
                  <div
                    className="card-footer mb-1 mb-md-5"
                    style={{
                      backgroundColor: "#f8f9fa",
                      borderTopStyle: "solid",
                      borderTopColor: "#EBEBEB",
                      padding: "20px",
                      borderRadius: "5px",
                    }}
                  >
                    <h5>Comments</h5>
                    {data.comments.map((item, index) => (
                      <div
                        id="comments"
                        className="d-flex justify-content-between align-items-center mt-2 mt-md-4 ps-2 pe-2 ps-md-5 pe-md-5"
                        style={{
                          backgroundColor: "white",
                          padding: "10px",
                          borderRadius: "5px",
                          marginBottom: "10px",
                          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                        }}
                        key={index}
                      >
                        <p
                          className="p-0 m-0"
                          style={{ width: "90%" }}
                          dangerouslySetInnerHTML={{ __html: item.comment }}
                        ></p>
                        <button
                          className="btn btn-danger pt-2 pb-2 ps-3 pe-3"
                          id="buttonShadow"
                          onClick={() => deleteComment(item.id)}
                          type="button"
                          style={{
                            fontFamily: "JosefinSans-SemiBold",
                            fontWeight: "600",
                            fontSize: "14px",
                            color: "white",
                            borderStyle: "none",
                            outline: "none",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>

        </div>
        
        
      </div>

      <Footer></Footer>
    </Fragment>
  );
}

export default AddBlog;
