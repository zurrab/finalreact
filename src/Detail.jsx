import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "./Navbar";
import Footer from './Footer';

function Details() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [commentValue, setCommentValue] = useState("");
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    axios.get(`https://apitest.reachstar.io/blog/get/${id}`)
      .then(response => {
        setData(response.data);
        setEditDescription(response.data.description);
        setEditTitle(response.data.title);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const handleEdit = () => setEditing(true);

  const handleSave = () => {
    axios.put(`https://apitest.reachstar.io/blog/edit/${id}`, {
      title: editTitle,
      description: editDescription,
    })
    .then(response => {
      window.location.reload();
    })
    .catch(error => {
      alert("Error saving changes:", error);
      window.location.reload();
    });
  };

  const addComment = event => {
    event.preventDefault();
    axios.post(`https://apitest.reachstar.io/comment/add/${id}`, { comment: commentValue })
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        alert("There was an issue adding the comment");
        window.location.reload();
      });
  };

  const deleteBlog = blogId => {
    axios.delete(`https://apitest.reachstar.io/blog/delete/${blogId}`)
      .then(response => {
        navigate("/Home");
      })
      .catch(error => {
        window.location.reload();
      });
  };

  const deleteComment = commentId => {
    axios.delete(`https://apitest.reachstar.io/comment/delete/${commentId}`)
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        window.location.reload();
      });
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <div className="row">
          <div className="col-12 p-0 mt-1 mt-md-5">
            <div className="card mb-2 mt-1 mt-md-5" style={{ borderStyle: "none" }}>
              <div className="card-header mb-md-5" style={{ backgroundColor: "white" }}>
                {editing ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                ) : (
                  <h3
                    className="card-title mt-1 mt-md-5 text-center"
                    dangerouslySetInnerHTML={{ __html: data.title }}
                    style={{ backgroundColor: "white" }}
                  ></h3>
                )}
              </div>
              <div className="card-body mb-1">
                {editing ? (
                  <ReactQuill theme="snow" value={editDescription} onChange={setEditDescription} />
                ) : (
                  <p
                    className="ps-1 ps-md-5 pe-1 pe-md-5"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                    style={{
                      borderLeftStyle: "solid",
                      borderColor: "#D6D6D6",
                      borderRightStyle: "solid",
                    }}
                  ></p>
                )}
                {editing ? (
                  <div className="d-flex justify-content-end mt-2 mt-md-4 pe-2 pe-md-4">
                    <button
                      className="btn bg-info pt-2 pb-2 ps-3 pe-3 ps-md-5 pe-md-5"
                      id="buttonShadow"
                      style={{ fontFamily: "JosefinSans-SemiBold", color: "white" }}
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-start mt-2 mt-md-4 ps-2 ps-md-4">
                    <button
                      className="btn bg-success pt-2 pb-2 ps-3 pe-3 me-1 me-md-3 ps-md-4 pe-md-4"
                      id="buttonShadow"
                      style={{ fontFamily: "JosefinSans-SemiBold", color: "white" }}
                      onClick={handleEdit}
                    >
                      Edit Blog
                    </button>
                    <button
                      className="btn bg-danger pt-2 pb-2 ps-3 pe-3 ps-md-4 pe-md-4"
                      id="buttonShadow"
                      style={{ fontFamily: "JosefinSans-SemiBold", color: "white" }}
                      onClick={() => deleteBlog(data.id)}
                    >
                      Delete Blog
                    </button>
                  </div>
                )}
              </div>
              <form
                onSubmit={addComment}
                className="d-flex flex-column flex-md-row align-items-center ps-2 ps-md-4"
                style={{ width: "100%", backgroundColor: "#f8f9fa", padding: "10px", marginTop: "10px", borderRadius: "5px" }}
              >
                <ReactQuill
                  className="flex-grow-1 mb-2 mb-md-0"
                  style={{ borderRadius: "5px", marginRight: "10px" }}
                  theme="snow"
                  value={commentValue}
                  onChange={setCommentValue}
                  placeholder="Write a comment..."
                />
                <button
                  type="submit"
                  className="btn btn-success w-100 w-md-auto rounded-0"
                  style={{
                    fontFamily: "JosefinSans-SemiBold",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "white",
                    borderStyle: "none",
                    outline: "none",
                    marginLeft: "10px",
                    width: "100%",
                    maxWidth: "120px"
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
                {data.comments && data.comments.map((item, index) => (
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default Details;
