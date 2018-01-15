var Interact = artifacts.require("./Interact.sol");

contract('interact', function(accounts) {

  // Test #0 Default Test
  it("should assert true", function(done) {
    var interact = Interact.deployed();
    assert.isTrue(true);
    done();
  });

  // Test #1 Set and get a value
  it("should set a message", function() {
    var contract;

    return Interact.deployed().then(function(instance) {
      contract = instance;

      return contract.setMessage.sendTransaction("hello world", {from:accounts[1]});
    }).then(function(result) {
      return contract.getMessage.call();
    }).then(function(result) {
      assert.equal(result, "hello world", "Message returned should be the message sent");
    })
  }); 

  // Test #2 Set and get the senders address
  it("should set message and retrieve address of last sender", function() {
    var contract;

    return Interact.deployed().then(function(instance) {
      contract = instance;

      return contract.setMessage.sendTransaction("hello world", {from:accounts[1]});
    }).then(function(result) {
      return contract.getLastAddress.call();
    }).then(function(result) {
      assert.equal(result, accounts[1], "Should return the senders address which is the last sent address");
    })
  }); 

  // Test #3 An attacker tries to change the last sent address by calling the corresponding function
  // it("should set message and retrieve address of last sender", function() {
  //   var contract;

  //   return Interact.deployed().then(function(instance) {
  //     contract = instance;

  //     return contract.setLastSentAddress.sendTransaction({from:accounts[3]});
  //   }).then(function(result) {
  //     return contract.getLastAddress.call();
  //   }).then(function(result) {
  //     assert.equal(result, accounts[1], "Should return last sender as accounts[1]");
  //   })
  // }); 

  // Test #4 Should log events
  it("should log the event", function() {
    var contract;

    return Interact.deployed().then(function(instance) {
      contract = instance;

      return contract.setMessage.sendTransaction("good night!", {from:accounts[3]});
    }).then(function(result) {
      // console.log("Printing event: ");
      // console.log(result.logs[0].event);
      assert.equal('MessageWritten()', result, 'It should match the log of events');
    });

  }); 
});

// Truffle: you may access the log in receipt
// function  dumpEvents(result){
//   for(var i=0; i<result.logs.length;i++){
//         console.log(result.logs[i].event,'>>', result.logs[i].args.name,' ',result.logs[i].args.howmuch.toNumber())
//   }
// }