import { useContext } from "react"
import {TransactionContext} from "../context/TransactionContext"
import { shortenAddress } from "../utils/ShortenAddress";

const Transactions = () => {
  const {CurrentAccount} = useContext(TransactionContext);
  console.log(CurrentAccount)
  return (
    <div className="flex w-full justify-center items-center 2xl:p-20 gradient-bg-transactions">
        <div className="flex flex-col md:p-12 py-12 px-4">
              {/* Latest transaction */}
              {CurrentAccount ? (
                  <h3 className="text-white text-3xl text-center my-2">
                      Latest transaction 
                  </h3>
              ) : (
                    <h3 className="text-white text-3xl text-center my-2">
                      Connect your account to see the latest transactions
                    </h3>
              )}
              {/* Connect your account to see the latest transaction */}
        </div>
    </div>
  )
}

export default Transactions