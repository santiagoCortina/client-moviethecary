import "../../App.css";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { Meta } = Card;
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px",
      }}
    >
      <h1>ARE YOU SICK OF NOT KNOWING WHAT TO WATCH ON TV?!</h1>

      <Card
        hoverable
        style={{ width: "80%", allignItems: "center" }}
        cover={
          <img
            alt="example"
            src="https://res.cloudinary.com/dgi8kcsdk/image/upload/v1647833249/proyectoFinal/Captura_de_Pantalla_2022-03-20_a_la_s_21.18.02_qf8qdu.png"
          />
        }
      >
        <Meta
          title="YOU FEEL AS IF THERE IS NOTHING NEW ON TV?"
          description="Look no more, here at the Moviethecary you'll find something right away! You might even create playlists to watch later"
        />
      </Card>

      <br></br>

      <Card
        hoverable
        style={{ width: "40%", allignItems: "center" }}
        cover={
          <img
            alt="example"
            src="https://res.cloudinary.com/dgi8kcsdk/image/upload/v1647833247/proyectoFinal/Captura_de_Pantalla_2022-03-20_a_la_s_21.18.58_i1sfu5.png"
          />
        }
      >
        <Meta
          title="ARE YOU TIRED OF SPENDING HOURS BROWSING FOR MOVIES?"
          description="Save your favourites, follow people, share playlists! All in one place"
        />
      </Card>
      <br></br>
      <br></br>
      <h1>LOOK NO MORE!!</h1>
      <Button
        type="danger"
        size="large"
        shape="round"
        onClick={() => navigate("/signup")}
      >
        SIGN UP FOR FREE!!
      </Button>
      <br></br>
      <br></br>
    </div>
  );
}

export default HomePage;
