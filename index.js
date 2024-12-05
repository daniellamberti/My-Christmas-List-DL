/*
Grandpa has a Christmas wish list to keep track of all the gifts he wants to ask for. But there’s a problem: if he forgets he’s already added something, the list gets clogged up with duplicates. This happened last year, and he ended up with 8 talking picture frames on Christmas Day!

Your task is to complete the `checkDuplicate()` function 👇 to ensure no duplicates are added to the list. But here’s the tricky part: Grandpa sometimes hits the spacebar more than once, making it harder to spot duplicates.

For example, only one of these entries should be added to the list — the others should be flagged as duplicates:

- "talking picture frames"
- "talking  picture frames"
- "talking picture    frames"
- " talking picture frames "

**Your tasks:**
1. Ensure no duplicates can be added to the list.
2. Account for extra spaces at the beginning/end and between words.
 
**Stretch Goals:**
1. Case Sensitivity: Handle cases where capitalization differs. For example:
   - `"Cat Hammock"` should be flagged as a duplicate of `"cat hammock"`.
   - Preserve Grandpa’s original capitalization (e.g., if `"Cat Hammock"` is added first, that should be added to the list). Do not simply convert all entries to lower case - Grandpa might well want to capitalize some words.

2. Additional Features: Add functionality to delete or edit items on the list.
*/

// Get references to DOM elements
const itemInput = document.getElementById('item-input')
const addItemButton = document.getElementById('add-item-button')
const shoppingList = document.getElementById('shopping-list')
const clearFullList = document.getElementById("reset-full-list-button");

// initialization of two arrays for original item list and processed items list for comparison:

let itemsForComparison = [];
let itemsForDisplay = [];

// Function to check item is not duplicate
function checkDuplicate() {

    /* ⚠️ You need to add code to this function! ⚠️*/ 

    let itemText = itemInput.value
    let newItem; // item to be processed for comparison

    newItem = itemText.trim().replace(/\s+/g, ' ').toLowerCase();

    if(!newItem) {
        alert("You need to insert an item to be shown in the list"); // validation to avoid entering an empty string to the list
    } else if(itemsForComparison.length === 0) { // make sure first item is included in the list, no other item to be compared with
        itemsForDisplay.push(itemText);
        itemsForComparison.push(newItem);
        setTimeout(alertMessage, 800);
    } else if(itemsForComparison.includes(newItem)) { // make sure there is no duplicated items to be displayed
        alert("The item is already in the list");
    } else {
        itemsForComparison.push(newItem);
        itemsForDisplay.push(newItem);
        setTimeout(alertMessage, 800);
    }

    renderList()
}

// Function to add an item to the shopping list:

function renderList() {
    shoppingList.innerHTML = ''
    itemsForDisplay.forEach((gift, index) => {
        const listItem = document.createElement('li')
        listItem.textContent = gift
        listItem.style.cursor = "pointer";
        listItem.addEventListener('click', () => deleteItem(index));
        shoppingList.appendChild(listItem)
    })
    itemInput.value = ''; // Clear the input field
}

// Function for delete items from the list:

function deleteItem(index) {
    itemsForDisplay.splice(index, 1);
    itemsForComparison.splice(index, 1);
    renderList();
}

// Function for clear all Item List:

function resetFullList(list1, list2) {
    list1.length = 0;
    list2.length = 0;
    renderList();
}

// Function to send the user an alert when the item was sucessfully added to the list

function alertMessage () {
    alert("Your item was sucessfully included in the list");
}


// Add event listener to button
addItemButton.addEventListener('click', checkDuplicate)

// Allow adding items by pressing Enter key
itemInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkDuplicate()
    }
})

// Add event listener to clear Items List:

clearFullList.addEventListener("click", function () {
resetFullList(itemsForDisplay, itemsForComparison)
});