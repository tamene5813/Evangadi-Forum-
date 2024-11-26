import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import { Link } from "react-router-dom";
import axios from "../../axiosConfig";
import AsherPage from "../Qsher/AsherPage.jsx";
import Layout from "../Layout/Layout";
import classes from "./userPage.module.css";

const UserAnswerPage = ({ answerDisplay }) => {
  const { user } = useContext(AppState);
  const [answers, setAnswers] = useState([]);
  const [tags, setTags] = useState({});
  const userid = user.userid;

  useEffect(() => {
    const fetchAnswer = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`/answer/my-answer/${userid}`, {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        });

        const fetchedAnswers = response.data.answers;
        setAnswers(fetchedAnswers);
        console.log(fetchedAnswers);

        // Fetch tag and description for all questions linked to the answers
        const detailPromises = fetchedAnswers.map((answer) => {
          return axios.get(`/questions/question/gettag/${answer.questionid}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        });

        const detailResponses = await Promise.all(detailPromises);

        console.log("Detail responses:", detailResponses);

        // Map questionid to their respective tags and description
        const detailMap = {};
        detailResponses.forEach((res, index) => {
          detailMap[fetchedAnswers[index].questionid] = {
            tag: res.data.tag,
            description: res.data.description,
          };
        });
        setTags(detailMap);
        console.log(detailMap);
      } catch (error) {
        console.error("Error fetching answers or details:", error);
        setError("Failed to load answers or tags. Please try again.");
      }
    };

    fetchAnswer();
  }, [userid]);

  return (
    <Layout>
      <AsherPage />
      <div className={classes.title}>
        <h3>{user.username}: All the Answer you have submitted.</h3>
        <hr />
        {answers?.length > 0 ? (
          <div>
            {answers?.map((answer, i) => (
              <div key={i} className={classes.post}>
                <div className={classes.flex0}>
                  <div>
                    <small>
                      <strong>Q:</strong>{" "}
                      {tags[answer.questionid]?.description || "Loading..."}
                    </small>
                  </div>
                  <div>
                    <small>Answer {++i}:</small>
                  </div>
                </div>

                <h4>{(answerDisplay = `${answer.answer}`)}</h4>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h3>No answers found.</h3>
          </div>
        )}
        <button className={`${classes.btn} butn`}>
          <Link to="/home">Back to Home</Link>
        </button>
      </div>
    </Layout>
  );
};

export default UserAnswerPage;
