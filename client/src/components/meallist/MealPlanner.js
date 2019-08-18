import React from "react";
import MealList from "./MealList";
import MealInfo from "./MealListInfo";

const MealPlaner = () => {
  return (
    <div className="MealPlanner">
      <MealList />
      <MealInfo />
    </div>
  );
};

export default MealPlaner;
