import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";
import MesTchats from "../MesTchats/MesTchats";
import UserList from "../UserList/UserList";
import { Row } from "react-bootstrap";

const Home = () => {
  const [usersList, setUsersList] = useState([]);
  const { get, post, status } = useFetch();
  const [user, setUser] = useContext(UserContext);
  const token = Cookies.get("auth");

  const getUsersList = async () => {
    const res = await get("/users", null, { Authorization: token });

    if (status.current.ok) {
      setUsersList(res.users);
    }
  };

  const handleClick = async (userId) => {
    const response = await post(`/ping/${userId}`, null, {
      Authorization: token,
    });
    if (status.current.ok) {
      console.log(response);
    }
  };

  const users = usersList.map((u) => {
    return (
      <div key={u.id} onClick={() => handleClick(u.id)}>
        {u.username}
      </div>
    );
  });

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <React.Fragment>
      <Row className="no-gutters h-100">
        <MesTchats/>
        <UserList/>
      </Row>
    </React.Fragment>
  );
};

export default Home;
