// Storage Controller
const StorageCtrl = (function () {
  // Public Methods
  return {
    addToStorage: function (item) {
      let items;
      if (localStorage.getItem("items") === null) {
        items = [];

        items.push(item);

        // Set it to LocalStorage
        localStorage.setItem("items", JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem("items"));

        items.push(item);

        // Set it to LocalStorage
        localStorage.setItem("items", JSON.stringify(items));
      }
    },
    getFromStorage: function () {
      let items;
      if (localStorage.getItem("items") === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("items"));
      }

      return items;
    },
    updateItemStorage: function (updatedItem) {
      let items = JSON.parse(localStorage.getItem("items"));

      items.forEach(function (item, index) {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });

      // Set it to LocalStorage
      localStorage.setItem("items", JSON.stringify(items));
    },
    deleteItemFromStorage: function (id) {
      let items = JSON.parse(localStorage.getItem("items"));

      items.forEach(function (item, index) {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });

      // Set it to LocalStorage
      localStorage.setItem("items", JSON.stringify(items));
    },
    clearItemsFromStorage: function () {
      localStorage.removeItem("items");
    },
  };
})();

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
    items: StorageCtrl.getFromStorage(),
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
    getTotalCalories: function () {
      let totalCalories = 0;
      data.items.forEach(function (item) {
        totalCalories += item.calories;
      });
      data.totalCalories = totalCalories;

      return data.totalCalories;
    },
    getItemById: function (id) {
      let found = null;
      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    setCurrentItem: function (item) {
      data.currentState = item;
    },
    getCurrentItem: function () {
      return data.currentState;
    },
    updateItem: function (name, calories) {
      // Calories ti Int
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function (item) {
        if (item.id === data.currentState.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },
    clearItems: function () {
      data.items = [];
    },
    deleteItem: function (id) {
      const ids = data.items.map(function (item) {
        return item.id;
      });

      const index = ids.indexOf(id);

      data.items.splice(index, 1);
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
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    clearBtn: ".clear-btn",
    nameInput: "#item-name",
    caloriesInput: "#item-calories",
    totalCalories: ".total-calories",
    listItems: "#item-list li",
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
      document.querySelector(UISelectors.itemList).style.display = "block";
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
    addItemToForm: function () {
      document.querySelector(
        UISelectors.nameInput
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.caloriesInput
      ).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditForm();
    },
    // hide ul if there no items
    hideListItem: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    getSelectors: function () {
      return UISelectors;
    },
    showTotalCalories: function (totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    clearEditForm: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditForm: function () {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    updateListItem: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // turn it into an array
      listItems = Array.from(listItems);

      listItems.forEach(function (listItem) {
        const itemID = listItem.getAttribute("id");
        if (itemID === `item-${item.id}`) {
          listItem.innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil-alt"></i>
            </a>`;
        }
      });
    },
    removeItem: function (id) {
      const itemID = `#item-${id}`;

      document.querySelector(itemID).remove();
    },
    clearItems: function () {
      document.querySelector(UISelectors.itemList).innerHTML = "";
    },
  };
})();

// App Controller
const App = (function (ItemCtrl, StorageCtrl, UICtrl) {
  // All event listeners
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors();

    // Disable enter
    document.addEventListener("keypress", function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Add event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    // Edit event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);

    // Update item
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);

    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);

    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", (e) => {
        e.preventDefault();
        UICtrl.clearEditForm();
      });

    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", itemClearSubmit);
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

      // Get total calories from ItemCtrl
      const totalCalories = ItemCtrl.getTotalCalories();

      // Show this calories on UI
      UICtrl.showTotalCalories(totalCalories);

      // Save it to LocalStorage
      StorageCtrl.addToStorage(newItem);

      // Clear inputs
      UICtrl.clearInput();
    }
  };

  // Click to edit item
  const itemEditClick = function (e) {
    e.preventDefault();

    if (e.target.classList.contains("edit-item")) {
      const itemId = e.target.parentNode.parentNode.id;
      const idList = itemId.split("-");
      const id = parseInt(idList[1]);

      // Get this item from the data in the ItemCtrl
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set item to the currentItem
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }
  };

  const itemUpdateSubmit = function (e) {
    e.preventDefault();

    // Get inputs' value
    const input = UICtrl.getItemInput();

    // Update Item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Update UI
    UICtrl.updateListItem(updatedItem);

    // Get total calories from ItemCtrl
    const totalCalories = ItemCtrl.getTotalCalories();

    // Show this calories on UI
    UICtrl.showTotalCalories(totalCalories);

    // Update item on LocalStorage
    StorageCtrl.updateItemStorage(updatedItem);

    UICtrl.clearEditForm();
  };

  // Delete item
  const itemDeleteSubmit = function (e) {
    e.preventDefault();

    const currentItem = ItemCtrl.getCurrentItem();

    ItemCtrl.deleteItem(currentItem.id);

    UICtrl.removeItem(currentItem.id);

    // Get total calories from ItemCtrl
    const totalCalories = ItemCtrl.getTotalCalories();

    // Show this calories on UI
    UICtrl.showTotalCalories(totalCalories);

    // Delete item from LocalStorage
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    UICtrl.clearEditForm();

    if (ItemCtrl.getItems().length === 0) {
      UICtrl.hideListItem();
    }
  };

  // Clear all items
  const itemClearSubmit = function () {
    // Clear items from the data
    ItemCtrl.clearItems();

    // Clear items from UI
    UICtrl.clearItems();

    // Clear items from LocalStorage
    StorageCtrl.clearItemsFromStorage();

    // Get total calories from ItemCtrl
    const totalCalories = ItemCtrl.getTotalCalories();

    // Show this calories on UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.hideListItem();
  };

  // Public Methods
  return {
    init: function () {
      // Clear Edit form
      UICtrl.clearEditForm();

      // Fetch items from ItemCtrl
      const items = ItemCtrl.getItems();

      if (items.length === 0) {
        UICtrl.hideListItem();
      } else {
        // Populate Item to UICtrl
        UICtrl.populateItemList(items);
      }

      // Get total calories from ItemCtrl
      const totalCalories = ItemCtrl.getTotalCalories();

      // Show this calories on UI
      UICtrl.showTotalCalories(totalCalories);

      // Add Event Listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, StorageCtrl, UICtrl);

App.init();
