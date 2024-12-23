import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import classes from "./answer.module.css";
const SingleQuestion = () => {
  const { questionid } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `/questions/all-questions/${questionid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQuestion(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching question:", error);
        setError("Error fetching question. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, [questionid]);

  return (
    <>
      <div className={classes.container}>
        <h3>Question Details</h3>
        <hr />
        {loading ? (
          <p>Loading question...</p>
        ) : question ? (
          <div>
            {/* Using Optional Chaining */}
            <h4>Title: {question.title}</h4>
            <p>Question: {question.description}</p>
          </div>
        ) : (
          <p>No question found.</p>
        )}
      </div>
    </>
  );
};

export default SingleQuestion;
