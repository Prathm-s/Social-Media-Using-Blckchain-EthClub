pragma solidity ^0.8.9;

contract UserContract {
    uint public numberOfUsers = 0;

    struct User {
        address owner;
        string name;
        string email;
        string password;
        address[] friends;
        address[] friendRequests;
        uint256 id;
        string imageUrl;
    }

    mapping(uint256 => User) public users;

    function createUser(
        address _owner,
        string memory _name,
        string memory _email,
        string memory _password,
        string memory _imageUrl
    ) public returns (uint256) {
        User storage user = users[numberOfUsers];
        user.owner = _owner;
        user.name = _name;
        user.email = _email;
        user.password = _password;
        user.id = numberOfUsers;
        user.imageUrl = _imageUrl;
        numberOfUsers += 1;
        return numberOfUsers;
    }

    function sendFriendRequest(uint256 _id) public {
        User storage user = users[_id];
        user.friendRequests.push(msg.sender);
    }

    function acceptRequest(
        uint256 _id,
        uint256 _friendId
    ) public returns (bool) {
        User storage currenUser = users[_id];
        User storage friend = users[_friendId];
        currenUser.friends.push(friend.owner);
        friend.friends.push(currenUser.owner);
        bool isFound = false;
        for (uint i = 0; i < currenUser.friendRequests.length - 1; i++) {
            if (isFound) {
                currenUser.friendRequests[i] = currenUser.friendRequests[i + 1];
                continue;
            }
            if (currenUser.friendRequests[i] == friend.owner) {
                currenUser.friendRequests[i] = currenUser.friendRequests[i + 1];
                isFound = true;
            }
        }
        currenUser.friendRequests.pop();
        users[_id] = currenUser;

        return isFound;
    }

    function unfriendRequest(uint256 _id, uint256 _friendId) public {
        User storage currenUser = users[_id];
        User storage friend = users[_friendId];

        bool isFound = false;
        for (uint i = 0; i < currenUser.friends.length - 1; i++) {
            if (isFound) {
                currenUser.friends[i] = currenUser.friends[i + 1];
                continue;
            }
            if (currenUser.friends[i] == friend.owner) {
                currenUser.friends[i] = currenUser.friends[i + 1];
                isFound = true;
            }
        }
        currenUser.friends.pop();
        users[_id] = currenUser;
        users[_friendId] = friend;

    }

    function getCurrentUser(address _owner) public view returns (User memory) {
        for (uint i = 0; i < numberOfUsers; i++) {
            if (users[i].owner == _owner) {
                return users[i];
            }
        }
         
    }

    function updateProfile(
        uint256 _id,
        address _owner,
        string memory _name,
        string memory _email,
        string memory _password,
        string memory _imageUrl
    ) public {
        User storage user = users[_id];
        user.owner = _owner;
        user.name = _name;
        user.email = _email;
        user.password = _password;
        user.imageUrl = _imageUrl;
        users[_id] = user;
    }

    function getAllUsers() public view returns (User[] memory) {
        User[] memory allUsers = new User[](numberOfUsers);
        for (uint i = 0; i < numberOfUsers; i++) {
            User storage item = users[i];
            allUsers[i] = item;
        }
        return allUsers;
    }
}
