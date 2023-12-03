document.addEventListener("DOMContentLoaded", function () {

    let friends = [];
    let gstAmount = 0;
    let serviceCharge = 0;
    let discountAmount = 0;
    let totalAmount = 0;

    let sharedGstAmount = 0;
    let sharedServiceCharge = 0;
    let sharedDiscountAmount = 0;

    function isNumber(str) {
        if (isNaN(str)) {
            return false;
        }
        return true;
    }

    function showTotal() {
        let formatedTotal = (Math.round(totalAmount * 100) / 100).toFixed(2);
        document.querySelector('#total-amount').innerHTML = `MVR ${formatedTotal}`;
    }

    function zeroCorrection(amount) {
        if ( amount == '' ) {
            return 0;
        }
        return parseFloat(amount);
    }

    function calculate() {
        totalAmount = gstAmount + serviceCharge + discountAmount;

        if (friends.length > 0) {

            let totalFriends = friends.length;

            // calculate shared amounts
            if (discountAmount > 0) {
                sharedDiscountAmount = discountAmount / totalFriends;
            }

            if (serviceCharge > 0) {
                sharedServiceCharge = serviceCharge / totalFriends;
            }

            if (gstAmount > 0) {
                sharedGstAmount = gstAmount / totalFriends;
            }

            // Calculate friends total
            for (let i = 0; i < totalFriends; i++) {
                let newTotal = 0;
                for (let j = 0; j < friends[i].items.length; j++) {
                    newTotal = newTotal + Math.floor(friends[i].items[j].amount);
                }
                friends[i].total = (newTotal + sharedGstAmount + sharedServiceCharge) - sharedDiscountAmount;
                totalAmount = totalAmount + newTotal; // Update overall total
            }

        }

        // Update total amount
        showTotal();

    }

    function addFriend(friendName) {
        friends.push({
            "name": friendName,
            "total": 0,
            "items": [],
            "shared": []
        });
        console.log('friend added', friends);
        showFriends();
    }

    function showFriends() {
        let h = '';
        if (friends.length > 0) {
            for (let i = 0; i < friends.length; i++) {
                h += `<div class="row">
                    <div class="col-4">${friends[i].name}</div>
                    <div class="col-4">${friends[i].total}</div>
                    <div class="col-4">
                        <button type="button" class="edit-friend-btn btn btn-light" data-friend-index="${i}">Update</button>
                        <button type="button" class="remove-friend-btn btn btn-light" data-friend-index="${i}">T</button>
                    </div>
                </div>`;
            }
        }
        document.querySelector('#friends-list').innerHTML = h;
    }

    function addItem(friendIndex) {
        const addItemBtn = offCanvas.querySelector('#add-item-btn');
        if (addItemBtn !== null) {
            addItemBtn.addEventListener('click', function (ex) {
                let itemName = offCanvas.querySelector('#item-name');
                let amount = offCanvas.querySelector('#item-price');

                // Validate 
                if (itemName.value == '') {
                    alert("Please enter item name");
                    return false;
                }

                if (amount.value == '') {
                    alert("Please enter amount. Amount cannot be below 0.")
                    return false;
                }

                if (!isNumber(Math.floor(amount.value))) {
                    alert("Amount must be a number");
                    return false;
                }

                friends[friendIndex].items.push({
                    "description": itemName.value,
                    "amount": amount.value
                });
                itemName.value = '';
                amount.value = '';
                console.log('item added', friends);
                showItems(friendIndex);
                calculate(); // Recalculate amounts
                showFriends(); // Refresh friends list
            });
        }
    }

    function showItems(friendIndex) {
        let items = friends[friendIndex].items;
        let h = '';
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                h += `<div class="row my-3">
                    <div class="col-4">${items[i].description}</div>
                    <div class="col-4">${items[i].amount}</div>
                    <div class="col-4">
                        <button type="button" data-item-index="${i}" class="remove-item-btn btn btn-light">T</button>
                    </div>
                </div>`;
            }
        }
        offCanvas.querySelector('#item-list').innerHTML = h;

        // Remove Item
        let removeItemBtn = offCanvas.querySelectorAll('.remove-item-btn');
        if (removeItemBtn.length > 0) {
            for (let i = 0; i < removeItemBtn.length; i++) {
                removeItemBtn[i].addEventListener('click', function (e) {
                    let itemIndex = e.target.dataset.itemIndex;
                    friends[friendIndex].items.splice(itemIndex, 1);
                    showItems(friendIndex);
                    calculate(); // Recalculate amounts
                    showFriends(); // Refresh friends list
                });
            }
        }

    }

    const lookupFields = document.querySelectorAll('.lookup-field');
    for (let i = 0; i < lookupFields.length; i++) {
        lookupFields[i].addEventListener('keyup', function (e) {

            if (e.keyCode == 9 || e.keyCode == 13) {
                return false;
            }

            let field = e.target.id;
            let amount = e.target.value;

            // todo: validate amount to check if a number

            if (field == 'discount-amount') {
                if (!isNumber(amount)) {
                    alert("Discount amount must be a number");
                    return false;
                }
                discountAmount = zeroCorrection(amount);
            }

            if (field == 'service-charge') {
                if (!isNumber(amount)) {
                    alert("Service charge must be a number");
                    return false;
                }
                serviceCharge = zeroCorrection(amount);
            }

            if (field == 'gst-amount') {
                if (!isNumber(amount)) {
                    alert("GST amount must be a number");
                    return false;
                }
                gstAmount = zeroCorrection(amount);
            }

            // Recalculate
            calculate();
            showFriends();

        });
    }

    const offCanvas = document.querySelector('#offcanvas');

    // Adding Friends
    document.querySelector('#add-friend-init-btn').addEventListener('click', function (e) {

        const bsOffCanvas = new bootstrap.Offcanvas(offCanvas);
        offCanvas.querySelector('#offcanvasLabel').innerHTML = 'Add Friend';

        const stepOne = `
            <div class="mb-3">
                <label class="form-label" for="friend-name">Friend Name</label>
                <input type="text" id="friend-name" class="form-control" autocomplete="off" />
            </div>
            <button type="button" id="add-friend-btn" class="btn btn-primary">Add Friend</button>
        `;

        let stepTwo = `
            <p>Enter items for {::FRIEND_NAME::}</p>
            <div class="mb-3">
                <label class="form-label" for="item-name">Item Name</label>
                <input type="text" id="item-name" class="form-control" autocomplete="off" />
            </div>
            <div class="mb-3">
                <label class="form-label" for="item-price">Item Price</label>
                <input type="text" id="item-price" class="form-control" autocomplete="off" />
            </div>
            <button type="button" id="add-item-btn" class="btn btn-primary">Add Item</button>
            <div id="item-list"></div>
        `;

        offCanvas.querySelector('.offcanvas-body').innerHTML = stepOne;

        bsOffCanvas.show();

        let lastFriendIndex = 0;

        offCanvas.querySelector('#add-friend-btn').addEventListener('click', function (ex) {
            let friendName = offCanvas.querySelector('#friend-name').value;
            if (friendName == '') {
                alert("please enter friend name");
            } else {
                addFriend(friendName);
                lastFriendIndex = friends.length - 1;
                stepTwo = stepTwo.replace('{::FRIEND_NAME::}', friendName);
                offCanvas.querySelector('.offcanvas-body').innerHTML = stepTwo;
                console.log('last friend index', lastFriendIndex);
                addItem(lastFriendIndex);
            }
        });

    });

});