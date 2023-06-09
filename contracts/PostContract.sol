pragma solidity ^0.8.9;

contract PostContract {
    struct Comment {
        address commentorAdd;
        string comment;
        uint timeStamp;
        string name;
    }

    struct Post {
        uint256 id;
        address owner;
        string name;
        string description;
        string imageUrl;
        address[] likes;
        Comment[] comments;
        uint256 timeStamp;
        uint256 numberId; // updateThis Post
        bool is_private;
    }

    mapping(uint256 => Post) public posts;

    uint256 public numberOfPosts = 0;

    function createPost(
        address _owner,
        string memory _name,
        string memory _description,
        string memory _imageUrl,
        uint _timeStamp,
        bool _private
    ) public returns (uint256) {
        Post storage post = posts[numberOfPosts];
        post.owner = _owner;
        post.description = _description;
        post.imageUrl = _imageUrl;
        post.id = numberOfPosts;
        post.timeStamp = _timeStamp;
        numberOfPosts += 1;
        post.name = _name;
        post.is_private = _private;
        return numberOfPosts - 1;
    }

    function alreadyLiked(
        address _address,
        uint _id
    ) public view returns (bool) {
        Post storage post = posts[_id];
        for (uint i = 0; i < post.likes.length; i++) {
            if (post.likes[i] == _address) {
                return true;
            }
        }
        return false;
    }

    function likePost(uint256 _id) public {
        Post storage post = posts[_id];

        post.likes.push(msg.sender);
    }

    function commentPost(
        uint256 _id,
        string memory _comment,
        uint _timestamp,
        string memory _name
    ) public {
        Post storage post = posts[_id];

        post.comments.push(Comment(msg.sender, _comment, _timestamp, _name));
    }

    function getLikedBy(uint256 _id) public view returns (address[] memory) {
        return (posts[_id].likes);
    }

    function getCommentor(uint256 _id) public view returns (Comment[] memory) {
        return (posts[_id].comments);
    }

    function getPosts() public view returns (Post[] memory) {
        Post[] memory allPosts = new Post[](numberOfPosts);
        for (uint i = 0; i < numberOfPosts; i++) {
            Post storage item = posts[i];
            allPosts[i] = item;
        }

        return allPosts;
    }
}
