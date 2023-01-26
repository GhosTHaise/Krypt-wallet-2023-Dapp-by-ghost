/**  
*@param {string} Address
*@returns {string}
*/
export const shortenAddress = (Address) => `${Address.slice(0,5)}...${Address.slice(Address.length - 4 , )}`