import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import { SlLike } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { SlDislike } from "react-icons/sl";
import img1 from "../../assets/10002.svg";
import img2 from "../../assets/10003.svg";
import img3 from "../../assets/10001.png";
import { IoSearchOutline } from "react-icons/io5";
import { AppState } from "../../App";
import classes from "./home.module.css";
import LeftProfile from "./LeftProfile";

const QuestionDesplay = () => {
  const { questionid } = useParams();
  const user = useContext(AppState);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [answer, setAnswer] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [questionBy, setQuestionsBy] = useState([]);
  const [whoAsk, setWhoAsk] = useState([]);
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("/questions/all-questions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(data);
        setQuestions(data.task);
        const userIds = data.task.map((question) => question.userid);
        // setQuestionsBy(userIds);
        // console.log(data.task);
        // console.log(userIds);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

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
        // console.log(userMapping);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = questions
      ? questions.filter((question) =>
          question.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
    setFilteredQuestions(filtered);
  }, [searchTerm, questions]);

  const handleSearch = () => {
    setFilteredQuestions(
      questions.filter((question) =>
        question.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const fetchAnswer = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`/answer/getanswers/${questionid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnswer(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching question:", error);
        setError("Error fetching question. Please try again.");
      }
    };

    fetchAnswer();
  }, []);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.bg}>
        <div className={classes.img_display}>
          <div className={classes.first_img_cont}>
            <img src={img1} alt="" />
          </div>
          <div className={classes.therd_img_cont}>
            <input
              className={classes.search}
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className={classes.search_icon}>
              <IoSearchOutline size={35} onClick={handleSearch} />
            </span>
            <img src={img3} alt="" />
          </div>
          <div className={classes.second_img_cont}>
            <img src={img2} alt="" />
          </div>
        </div>
      </div>
      <div className={classes.middle_section}>
        <div className={classes.leftProfile}>
          <LeftProfile />
        </div>
        <div className={classes.question_column}>
          {filteredQuestions?.map((question) => (
            <div key={question.id}>
              <div className={classes.post}>
                <div className={classes.viewAnswers}>
                  <div className={classes.postHeader}>
                    <div>
                      <CgProfile />
                      <span className={classes.postDate}>
                        {userMap[question.userid] || "Unknown User"}
                      </span>
                    </div>
                  </div>
                  <div className={classes.postContent}>
                    <span className="">Tag:{question.title} </span>
                  </div>
                </div>
                <h4>{question.description}</h4>
                <div className={classes.viewAnswers}>
                  <Link
                    to={`/questions/all-questions/${question.questionid}`}
                    className={classes.postTotalAnswers}
                  >
                    Give an answer
                  </Link>
                  <Link to={`/answer/getanswers/${question.questionid}`}>
                    View all Answers
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionDesplay;
