import { SET_CURRENT_MEAL } from "../actions/actionTypes";

const initialState = {
  currentMeal: null,
  sections: [
    {
      name: "Section 1",
      id: 1,
      meals: [
        {
          id: 1,
          name: "Bacon & Egg Sandwich",
          ingredients: ["Bacon", "Eggs", "Sandwich"]
        },
        {
          id: 2,
          name: "Mashed Potatoes",
          ingredients: ["Potatoes", "Milk", "Butter"]
        }
      ]
    },
    {
      name: "Section 2",
      id: 2,
      meals: [
        {
          id: 3,
          name: "Chicken & Rice",
          ingredients: ["Chicken", "Rice"]
        }
      ]
    }
  ]
};

export default function mealReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_CURRENT_MEAL:
      return { ...state, currentMeal: payload };
    default:
      return state;
  }
}
