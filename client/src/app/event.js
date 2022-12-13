import contract from "../services/contractService";
import configureStore from ".";
import { updateProjects } from "../store/projects/pSlice";
import { isConnected } from "../store/auth/authSlice";
// import { getDonations } from "../store/donations/dSlice";

contract.listenToEvent().on("data", function (e) {
  // const formatedProjects = e.returnValues[0].map((el) => {
  //   return {
  //     ...el,
  //     realizeAmt: this.web3.utils.fromWei(el.realizeAmt, "ether"),
  //   };
  // });
  configureStore.dispatch(updateProjects(e.returnValues[0]));
});
if (window.ethereum) {
  window.ethereum.on("accountsChanged", function (accounts) {
    configureStore.dispatch(isConnected());
  });
}
