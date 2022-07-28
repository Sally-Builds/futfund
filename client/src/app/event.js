import contract from "../services/contractService";
import configureStore from ".";
import { updateProjects } from "../store/projects/pSlice";
import { isConnected } from "../store/auth/authSlice";
// import { getDonations } from "../store/donations/dSlice";

contract.listenToEvent().on("data", function (e) {
  configureStore.dispatch(updateProjects(e.returnValues.projects));
});
if (window.ethereum) {
  window.ethereum.on("accountsChanged", function (accounts) {
    configureStore.dispatch(isConnected());
  });
}
