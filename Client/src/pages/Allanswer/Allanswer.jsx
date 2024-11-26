import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import classes from "./Allanswer.module.css";
import Layout from "../Layout/Layout";

const Allanswer = () => {
  const { questionid } = useParams();
  const [answers, setAnswers] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    const fetchQuestion = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `questions/all-questions/${questionid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQuestion(response.data[0].description);
        console.log(response.data[0].description);
      } catch (error) {
        console.error("Error fetching question:", error);
        setError("Error fetching question. Please try again.");
      }
    };
    fetchQuestion();
  }, [questionid]);

  useEffect(() => {
    const fetchAnswer = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`/answer/getanswers/${questionid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnswers(response.data.answers);
        console.log(response.data.answers);
      } catch (error) {
        console.error("Error fetching question:", error);
        setError("Error fetching question. Please try again.");
      }
    };
    fetchAnswer();
  }, [questionid]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("/users/allUsers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userMapping = {};
        data.users.forEach((user) => {
          userMapping[user.userid] = user.username;
        });
        setUserMap(userMapping);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Layout>
      <div className={classes.allAnswerContainer}>
        <h3>Question: {question}</h3>
        <hr /> <hr />
        <h3>Answer provided by the community</h3>
        <hr />
        {answers.length > 0 ? (
          <div>
            {answers.map((answer, index) => (
              <div key={index}>
                <h4>
                  Answer {index + 1} <br />
                  <p>
                    Answered{" "}
                    <span>By: {userMap[answer.userid] || "Unknown user"}</span>{" "}
                  </p>
                  <ul>
                    <strong>{answer.answer}</strong>
                  </ul>
                  <hr />
                </h4>
              </div>
            ))}
          </div>
        ) : (
          <p>No answers found.</p>
        )}
      </div>
      <div className={classes.allAnswerContainer}>
        <button className={classes.nav_butn}>
          <Link to="/home">Back to Home</Link>
        </button>
      </div>
    </Layout>
  );
};

export default Allanswer;
