import styles from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  const { id, name, imag, genres } = props;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Link to={`/detail/${id}`} className={styles.navLink}>
          <h3>{name}</h3>
          <img src={imag} />
          {genres.map(genre => <div>{genre}</div>)}
        </Link>
      </div>
    </div>
  );
};

export default Card;
