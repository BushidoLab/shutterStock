pragma solidity ^0.4.24;
import "./asset.sol";

contract ImageTracker {
    string id;

    function setId(string memory serial) public {
        id = serial;
    }

    function getId() public view returns (string memory) {
        return id;
    }

    mapping(string => Asset) private assetStore;
    assetStore[uuid] = Asset(name, description, true, manufacturer);
    mapping(address => mapping(string => bool)) private walletStore;
    walletStore[msg.sender][uuid] = true;

    event AssetCreate(address account, string uuid, string manufacturer);
    event RejectCreate(address account, string uuid, string message);
    event AssetTransfer(address from, address to, string uuid);
    event RejectTransfer(address from, address to, string uuid, string message);

    function createAsset(string name, string description, string uuid, string manufacturer) {
        if(assetStore[uuid].initialized) {
            RejectCreate(msg.sender, uuid, "Asset with this UUID already exists.");
            return;
        }
    
        assetStore[uuid] = Asset(name, description, true, manufacturer);
        walletStore[msg.sender][uuid] = true;
        AssetCreate(msg.sender, uuid, manufacturer);
    }
}
