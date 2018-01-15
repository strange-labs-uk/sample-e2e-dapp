pragma solidity ^0.4.4;

contract Interact {

  //Storage variables
  string message;
  address lastSentAddress;

  event MessageWritten();

  function Interact(string initMessage) {
    // constructor
    message = initMessage;
  }


  //Setting and getting storage variables
  function setMessage(string sentMessage) {
    message = sentMessage;
    setLastSentAddress();

    // Calling the message written event, this should notify the observing UI
    MessageWritten();
  }

  function getMessage() returns (string) {
    return message;
  }

  function setLastSentAddress() internal {
    lastSentAddress = msg.sender;
  }

  function getLastAddress() returns (address) {
    return lastSentAddress;
  }
}
