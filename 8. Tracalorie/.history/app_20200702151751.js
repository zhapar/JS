// Storage Controller

// Item Controller
const ItemCtrl = (function () {
  // Item constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calorie = calorie;
  };

  // Data structure / State
  const data = {
    items: [
      { id: 0, name: "Steak Dinner", calories: 1200 },
      { id: 1, name: "Cookies", calories: 400 },
      { id: 2, name: "Eggs", calories: 300 },
    ],
    currentState: null,
    totalCalories: 0,
  };

  // Public Methods
  return {
    logData: function () {
      console.log(data);
    },
  };
})();
// UI Controller
const UICtrl = (function () {})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {
  // Public Methods
  return {
    init() {
      console.log("Initialing...");
    },
  };
})(ItemCtrl, UICtrl);
