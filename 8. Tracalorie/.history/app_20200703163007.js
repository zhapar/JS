// Storage Controller

// Item Controller
const ItemCtrl = (function () {
  // Item constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data structure / State
  const data = {
    items: [
      // { id: 0, name: "Steak Dinner", calories: 1200 },
      // { id: 1, name: "Cookies", calories: 400 },
      // { id: 2, name: "Eggs", calories: 300 },
    ],
    currentState: null,
    totalCalories: 0,
  };

  // Public Methods
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      // Create ID
      let ID;
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      newItem = new Item(ID, name, calories);

      data.items.push(newItem);

      return newItem;
    },
    logData: function () {
      return data;
    },
  };
})();

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    nameInput: "#item-name",
    caloriesInput: "#item-calories",
  };

  // Public Methods
  return {
    populateItemList: function (items) {
      let html = "";

      items.forEach(function (item) {
        html += `
        <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil-alt"></i>
          </a>
        </li>
        `;
      });

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.nameInput).value,
        calories: document.querySelector(UISelectors.caloriesInput).value,
      };
    },
    addListItem: function (item) {
      // Create li
      const li = document.createElement("li");

      // Add className and id
      li.className = "collection-item";
      li.id = `item-${item.id}`;

      // Add item to the li
      li.innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil-alt"></i>
        </a>`;

      // Append it to the ul
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    clearInput: function () {
      document.querySelector(UISelectors.nameInput).value = "";
      document.querySelector(UISelectors.caloriesInput).value = "";
    },
    // hide ul if there no items
    hideListItem: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    getSelectors: function () {
      return UISelectors;
    },
  };
})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {
  // All event listeners
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors();

    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
  };

  const itemAddSubmit = function (e) {
    e.preventDefault();
    const input = UICtrl.getItemInput();

    // Check for input value
    if (input.name.trim() !== "" && input.calories.trim() !== "") {
      // add Item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add to the UI
      UICtrl.addListItem(newItem);

      // Clear inputs
      UICtrl.clearInput();
    }
  };

  // Public Methods
  return {
    init: function () {
      // Fetch items from ItemCtrl
      const items = ItemCtrl.getItems();

      // Populate Item to UICtrl
      UICtrl.populateItemList(items);

      // Add Event Listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

App.init();
