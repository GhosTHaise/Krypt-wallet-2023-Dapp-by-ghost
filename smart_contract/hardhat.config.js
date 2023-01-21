

require("@nomiclabs/hardhat-waffle")

module.exports = {
  solidity : "0.8.0",
  path : {
      artifacts : ""
  },
  networks : {
     goerli : {
        url : "https://eth-goerli.g.alchemy.com/v2/phH-asnZGgkpdxa6hRwPhYimQN7Vb5Vk",
        accounts : [
            "a29c512c737d94f5a018128054c4cd5f26fd9a87e786903edc0c81c4dea32eb4"
        ]
     }
  }

}