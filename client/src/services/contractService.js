import Web3 from "web3";
// import abi from "../base.json";
import build from "../futfund.json";

class Contract {
  constructor() {
    let web3 = new Web3(window.ethereum || "ws://localhost:8545");
    this.web3 = web3;
    this.contract = new web3.eth.Contract(
      build.abi,
      build.networks[1337].address
      // "0x8CB99Fba9A3E8ba7e30B1f8186320ae9917030FE"
    );
  }

  async getProjects() {
    try {
      const projects = await this.contract.methods.getProjects().call();
      return projects.map((el) => {
        return {
          ...el,
          realizeAmt: this.web3.utils.fromWei(el.realizeAmt, "ether"),
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMyDonations() {
    try {
      const donations = await this.contract.methods
        .getMyDonations()
        .call({ from: this.account });
      return donations.map((el) => {
        return {
          ...el,
          amount: this.web3.utils.fromWei(el.amount, "ether"),
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async createDonation(index, value) {
    try {
      await this.requestWallet();
      await this.contract.methods.createDonation(index).send({
        from: this.account,
        value: this.web3.utils.toWei(value, "ether"),
      });
      return;
    } catch (error) {
      if (error.data) {
        const data = error.data;
        const txHash = Object.keys(data)[0]; // TODO improve
        const reason = data[txHash].reason;
        throw new Error(reason);
      }
      throw error;
    }
  }

  async createProject({ name, expectedAmt, startDate, endDate }) {
    try {
      console.log("did it?");
      await this.requestWallet();
      await this.contract.methods
        .createProject(name, expectedAmt, startDate, endDate)
        .send({ from: this.account });
      await this.getProjects();
      console.log("e reach here");
    } catch (error) {
      if (error.data) {
        const data = error.data;
        const txHash = Object.keys(data)[0]; // TODO improve
        const reason = data[txHash].reason;
        throw new Error(reason);
      }
      throw error;
    }
  }

  async requestWallet() {
    try {
      let provider = window.ethereum;
      let account;
      if (typeof provider !== "undefined") {
        account = await provider.request({ method: "eth_requestAccounts" });
        this.account = account[0];

        window.ethereum.on("accountChanged", function (accounts) {
          account = accounts[0];
        });
        console.log(account, "my address");
      } else {
        throw new Error("Please install Metamask on you browser");
      }
    } catch (error) {
      if (error.message) {
        throw new Error(error.message);
      }
      throw new Error(error);
    }
  }

  listenToEvent() {
    let self = this;
    return this.contract.events
      .newDonation({ fromBlock: "latest" })
      .on("data", function (event) {
        self.updateProjects(event.returnValues[0]);
        console.log("passed");
      })
      .on("connected", function (subscriptionId) {
        console.log(subscriptionId, "conected");
      })
      .on("changed", function (event) {
        // remove event from local database
        console.log("passed changed");
        self.updateProjects(event.returnValues.projects);
      })
      .on("error", function (error, receipt) {
        // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        console.log("error");
        console.log(error);
      });
  }

  updateProjects(projects) {
    return projects.map((el) => {
      return {
        ...el,
        realizeAmt: this.web3.utils.fromWei(el.realizeAmt, "ether"),
      };
    });
  }

  async getAdminAddress() {
    try {
      const address = await this.contract.methods.getAdminAddress().call();
      return address;
    } catch (error) {
      console.log(error);
      throw new Error("something went wrong");
    }
  }

  async getBalance() {
    try {
      const balance = await this.contract.methods.checkBalance().call();
      return balance;
    } catch (error) {
      console.log(error);
      throw new Error("something went wrong");
    }
  }

  async isConnected() {
    try {
      const provider = window.ethereum;
      if (typeof provider !== "undefined") {
        const account = await provider.request({ method: "eth_accounts" });
        if (account.length <= 0) {
          console.log(account);
          return false;
        }
        this.account = account[0];
        return account[0];
      }
      return false;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }
}

const contract = new Contract();

export default contract;
