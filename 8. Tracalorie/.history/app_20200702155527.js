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
    getItems: function () {
      return data.items;
    },
    logData: function () {
      return data;
    },
  };
})();

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list'
  }
  
  // Public Methods
  return {
    populateItemList: function(items) {
      let html;

      items.forEach(function(item){
        html += `
        <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil-alt"></i>
          </a>
        </li>
        `
      });

      document.querySelector(UISelectors.)
    }
  };
})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {
  // Public Methods
  return {
    init: function () {
      // Fetch items from ItemCtrl
      const items = ItemCtrl.getItems();

      // Populate Item to UICtrl
      UICtrl.populateItemList(items);
    },
  };
})(ItemCtrl, UICtrl);

App.init();
