import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";
import { Form, Input, Button, Modal, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { logoutWs } from "../../services/auth-ws";
import { findFriends, addFriendWs } from "../../services/friends-ws";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const loggedOut = () => {
    message.info("Log out success! Hope to see you back soon.");
  };

  const friendAdded = () => {
    message.info("Friend added successfully!");
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    props.handleLogout();
    logoutWs();
    loggedOut();
    navigate("/login");
    window.location.reload(false);
  };

  const handleAdd = (email) => {
    addFriendWs(email);
    friendAdded();
    handleOk();
  };

  const onFinish = (values) => {
    findFriends(values).then((response) => {
      if (response.status) {
        setSearchResult(response.data.result);
      }
    });
    setIsModalVisible(true);
    form.resetFields();
  };

  useEffect(() => {
    forceUpdate({});
  }, []);

  return (
    <nav>
      <Link to="/" className="nav__projectName">
        What to watch: The Moviethecary
        {props.user
          ? " welcomes you:" + props.user.email
          : " invites you to join!"}
      </Link>

      {props.user ? (
        <div>
          <Form
            form={form}
            name="horizontal_login"
            layout="inline"
            onFinish={onFinish}
          >
            <Form.Item name="email">
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Useremail"
              />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    !!form
                      .getFieldsError()
                      .filter(({ errors }) => errors.length).length
                  }
                >
                  Search people!
                </Button>
              )}
            </Form.Item>
          </Form>
          <Modal
            title="Follow people you know"
            centered
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {searchResult.length ? (
              <div>
                {searchResult.map((result) => {
                  return (
                    <Button
                      style={{ margin: "0,3px" }}
                      type="dashed"
                      block
                      onClick={() => {
                        handleAdd(result.email);
                      }}
                    >
                      {result.email}
                    </Button>
                  );
                })}
              </div>
            ) : (
              <p>Your search returned no matches</p>
            )}
          </Modal>
        </div>
      ) : (
        <p></p>
      )}
      <div className="nav__authLinks">
        {props.user ? (
          <>
            <Link to="/feed" className="authLink">
              Feed
            </Link>
            <Link to="/profile" className="authLink">
              Profile
            </Link>
            <button className="nav-logoutbtn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="authLink">
              Signup
            </Link>
            <Link to="/login" className="authLink">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
