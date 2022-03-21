import { useState, useEffect } from "react";
import axios from "axios";
import { POSTER_URL } from "../../utils/consts";
import { getUserWs } from "../../services/auth-ws";
import { Loading } from "../../components";
import { useNavigate } from "react-router-dom";
import { Button, Tooltip, Card, Row, Space, message } from "antd";
import {
  StarFilled,
  FolderAddOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { addFavWs } from "../../services/favs-ws";

function Feed() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const { Meta } = Card;

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

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=4d1d1b7dae90381354535079d167456e&language=en-US&page=${page}`
      )
      .then((response) => {
        setMovies(response.data.results); // EN EL BOTON DE LOAD MORE, TENGO QUE HACER SET MOVIES = MOVIES.PUSH RESPUESTA
      });
  }, [page]);

  const handleClick = (movie) => {
    navigate("/movieDetail", { state: { movie: movie } });
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

  const handleLoad = () => {
    setPage(page + 1);
    window.scrollTo(0, 0);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <h1>Welcome to your Movie - Library</h1>
      <h3 id="#header">
        Here, you'll probably find something to watch; start with these ones:
      </h3>

      {page > 1 ? (
        <Button
          style={{ margin: "30px" }}
          type="primary"
          onClick={() => setPage(page - 1)}
        >
          Previous page
        </Button>
      ) : (
        <p style={{ display: "none" }}>*No previous pages*</p>
      )}

      <Row justify="space-around">
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "space-between",
            }}
          >
            <Space direction="vertical">
              <br></br>
              <Card
                style={{ width: 500 }}
                cover={
                  <img src={POSTER_URL + movie.poster_path} alt="poster" />
                }
                actions={[
                  <Tooltip title="Add to favourites">
                    <Button
                      type="primary"
                      onClick={() => handleStar(movie)}
                      shape="circle"
                      icon={<StarFilled />}
                    />
                  </Tooltip>,
                  <Tooltip title="Details">
                    <Button
                      type="primary"
                      onClick={() => handleClick(movie)}
                      shape="circle"
                      icon={<QuestionCircleOutlined />}
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
      </Row>
      <Button style={{ margin: "30px" }} type="primary" onClick={handleLoad}>
        Load More Movies
      </Button>
    </div>
  );
}

export default Feed;
