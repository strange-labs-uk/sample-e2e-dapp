module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: "100",
      gas:4712388,
      from: '0x8ac39e4cd6842d62bee41c9718161d5096d437c5'
    }
  }
};
