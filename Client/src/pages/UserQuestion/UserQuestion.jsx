import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import Layout from "../Layout/Layout";
import { AppState } from "../../App";
import QsherPage from "../Qsher/QsherPage.jsx";
import classes from "./userPage.module.css";

const UserQuestion = () => {
  const { user } = useContext(AppState);
  const userid = user.userid;
  const [question, setQuestion] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    const fetchQuestion = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`/questions/my-questions/${userid}`, {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        });
        setQuestion(response.data);
      } catch (error) {
        console.error("Error fetching question:", error);
        setError("Error fetching question. Please try again.");
      }
    };
    fetchQuestion();
  }, [userid]);

  return (
    <>
      <Layout>
        <QsherPage />
        <div className={classes.title}>
          <h3>{user.username}: All the questions you have submitted.</h3>
          <hr />

          {question?.length > 0 ? (
            <div>
              {question?.map((q, i) => (
                <div key={q.id} className={classes.post}>
                  <small>Question: {++i}</small>
                  <h4>Title: {q.title}</h4>
                  <p>Desription:- {q.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className={classes.title}>
              <h3>No question found.</h3>
            </div>
          )}
          <button className={`${classes.btn} butn`}>
            <Link to="/home">Back to Home</Link>
          </button>
        </div>
      </Layout>
    </>
  );
};

export default UserQuestion;
