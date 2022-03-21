import { POSTER_URL } from "../../utils/consts";
import { useLocation, Link } from "react-router-dom";
import { Button, Tooltip, Card, message, Modal, Form, Input } from "antd";
import { StarFilled, FolderAddOutlined } from "@ant-design/icons";
import { addFavWs } from "../../services/favs-ws";
import { useState, useEffect } from "react";
import { getUserWs } from "../../services/auth-ws";
import { updatePlaylistAddWs } from "../../services/playlist-ws";
import { enlistPlaylistsWs } from "../../services/playlist-ws";
import { createPlaylistWS } from "../../services/playlist-ws";
import { Loading } from "../../components";
import { useNavigate } from "react-router-dom";
import "./movieDetail.css";

function MovieDetail() {
  const location = useLocation();
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { movie } = location.state;
  const { Meta } = Card;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  const playlistCreated = () => {
    message.info("Playlist created successfully!");
  };

  const playlistUpdated = () => {
    message.info("Playlist updated successfully!");
  };

  const initData = () => {
    getUserWs().then((response) => {
      if (response.status) {
        setLoading(false);
        setUser(response.data.user._id);
      } else {
        navigate("/login");
      }
    });
  };

  const handleStar = async (movie) => {
    try {
      const { data, status, errorMessage } = await addFavWs(movie, user);
      if (status) {
        message.info(data.result);
      } else {
        message.info(errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    const data = {
      _user: user,
      title: values.title,
      _movies: {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      },
    };

    createPlaylistWS(data);
    playlistCreated();
    handleOk();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const upDateData = (movie, playlist) => {
    const data = {
      id: playlist._id,
      _movies: {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      },
    };
    updatePlaylistAddWs(data);
    playlistUpdated();
    handleOk();
  };

  useEffect(() => {
    initData();
    enlistPlaylistsWs()
      .then((response) => {
        if (response.status) {
          setPlaylists(response.data.result);
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      key={movie.id}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <br></br>
      <Card
        style={{ width: 450, margin_top: "10px" }}
        cover={<img src={POSTER_URL + movie.poster_path} alt="poster" />}
        actions={[
          <Tooltip title="Add to a playlist">
            <Button
              type="primary"
              onClick={() => handleAdd(movie)}
              shape="circle"
              icon={<FolderAddOutlined />}
            />
          </Tooltip>,
          <Tooltip title="Add to favourits">
            <Button
              type="primary"
              onClick={() => handleStar(movie)}
              shape="circle"
              icon={<StarFilled />}
            />
          </Tooltip>,
        ]}
      >
        <Modal
          title="Available playlists for you"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {playlists.length ? (
            <div>
              <p>Select the playlist you want to add the movie to:</p>
              <ul className="no-bullets">
                {playlists.map((playlist) => {
                  return (
                    <li>
                      <Button
                        style={{ margin: "0,3px" }}
                        type="dashed"
                        block
                        onClick={() => {
                          upDateData(movie, playlist);
                        }}
                      >
                        {playlist.title}
                      </Button>
                    </li>
                  );
                })}
              </ul>
              <p>Or create a new one</p>
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                initialValues={{
                  remember: false,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Playlist Title"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please input your playlist's name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          ) : (
            <div>
              <p>You still don't have any playlists.</p>
              <p>Please input a name for the playlist:</p>
              <div>
                <Form
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  initialValues={{
                    remember: false,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Playlist Title"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Please input your playlist's name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          )}
        </Modal>
        <Meta title={movie.title} description={movie.overview} />
        <br></br>
        <p>
          <span>Rating:</span> {movie.vote_average}
        </p>
        <p>
          <span>Release date:</span> {movie.release_date}
        </p>
      </Card>
    </div>
  );
}

export default MovieDetail;
