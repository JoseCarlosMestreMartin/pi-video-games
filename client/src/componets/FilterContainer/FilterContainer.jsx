import React from "react";

import styles from "./FilterContainer.module.css";
import Filter from "../Filter/Filter";

const FilterContainer = ({ data, addField, setValue }) => {
  
  return (
    <div className={styles.container}>
      <span className={styles.filterBy}>| Filter by:</span>
      <ul className={styles.filterList}>
        {data.map((element, index) => (
          <Filter key={index} item={element} />
        ))}
      </ul>
    </div>
  );
};


export default FilterContainer;
