import React from "react";

import styles from "./FilterContainer.module.css";
import Filter from "../Filter/Filter";
//import Filter from "../Filter";

const FilterContainer = ({ data, addField, setValue }) => {
  console.log("data: ",data);
  return (
    <div className={styles.container}>
      <h1>Container Component</h1>
      <ul>
        {data.map((element, index) => (
          
          <Filter item ={element}/>
        ))}
      </ul>
    </div>
  );
};

export default FilterContainer;
