import { useState, useEffect } from "react";
import { Loading } from "../../components";
import { useNavigate } from "react-router-dom";
import { Carousel } from "antd";
import { enlistFavWs } from "../../services/favs-ws";
import { enlistPlaylistsWs } from "../../services/playlist-ws";
import { enlistFriendsWs } from "../../services/friends-ws";
import { Card, Space, Button, Table, Tooltip, Tabs } from "antd";
import { POSTER_URL } from "../../utils/consts";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";

function Profile({ user }) {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [favs, setFavs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [friends, setFriends] = useState([]);
  const { Meta } = Card;
  const { TabPane } = Tabs;

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Overview",
      dataIndex: "overview",
      key: "overview",
    },
    {
      title: "Release date",
      dataIndex: "release_date",
      key: "release_date",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <p>Delete</p>
        </Space>
      ),
    },
  ];

  const gridStyle = {
    width: "25%",
    textAlign: "center",
  };

  const contentStyle = {
    padding: "20px",
    color: "#000",
    lineHeight: "300px",
    textAlign: "center",
    background: "#364d79",
    margin: "10px,0px",
  };

  const handleClick = (movie) => {
    navigate("/movieDetail", { state: { movie: movie } });
  };

  const handleDelete = (movie) => {
    console.log("QUIERES BORRAR LA PELI");
  };

  useEffect(() => {
    enlistFavWs()
      .then((response) => {
        if (response.status) {
          if (
            response.data.result !== "Todavia no tienes peliculas favoritas"
          ) {
            setFavs(response.data.result);
            setLoading(false);
          }
        } else {
          navigate("/login");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    enlistPlaylistsWs()
      .then((response) => {
        if (response.status) {
          setPlaylists(response.data.result);
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    enlistFriendsWs().then((response) => {
      if (response.status) {
        if (response.data.result !== "You do not follow anybody") {
          setFriends(response.data.result);
        }
      }
    });
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <h1>Welcome to your Movie - Library: </h1>
      <h3>Your Favourite Movies:</h3>
      {favs.length > 0 ? (
        <div style={contentStyle}>
          <Carousel autoplay dots dotPosition="top" effect="fade">
            {favs.map((movie) => (
              <div key={movie.id}>
                <Space direction="vertical">
                  <br></br>
                  <Card
                    style={{ width: 500 }}
                    cover={
                      <img src={POSTER_URL + movie.poster_path} alt="poster" />
                    }
                    actions={[
                      <Tooltip title="Details">
                        <Button
                          type="primary"
                          onClick={() => handleClick(movie)}
                          shape="circle"
                          icon={<QuestionCircleOutlined />}
                        />
                      </Tooltip>,
                      <Tooltip title="Drop from Favourites">
                        <Button
                          type="primary"
                          onClick={() => handleDelete(movie)}
                          shape="circle"
                          icon={<DeleteOutlined />}
                        />
                      </Tooltip>,
                    ]}
                  >
                    <Meta title={movie.title} />
                    <br></br>
                  </Card>
                </Space>
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>You still don't have favourites</h3>
          </div>
        </Carousel>
      )}
      <br></br>
      <br></br>

      <h3>Your playlists:</h3>
      {playlists.length ? (
        <div style={contentStyle}>
          <Tabs defaultActiveKey="1">
            {playlists.map((playlist, index) => (
              <TabPane tab={playlist.title} key={index}>
                <Table columns={columns} dataSource={playlist._movies} />
              </TabPane>
            ))}
          </Tabs>
        </div>
      ) : (
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>You still don't have playlists</h3>
          </div>
        </Carousel>
      )}

      <br></br>
      <br></br>

      <h3>People you follow:</h3>

      {friends.length ? (
        <Card title="Soon, you'll be able to browse people's playlists and favourite movies here">
          {friends.map((friend, index) => (
            <Card.Grid key={index} style={gridStyle}>
              {friend}
            </Card.Grid>
          ))}
        </Card>
      ) : (
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>You do not follow anybody</h3>
          </div>
        </Carousel>
      )}
      <div style={contentStyle}></div>
    </div>
  );
}

export default Profile;
