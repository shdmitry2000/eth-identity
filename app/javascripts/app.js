// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';



// Import our contract artifacts and turn them into usable abstractions.
import  KYC_artifact from '../../build/contracts/KYC.json'
import  Regulator_artifact from '../../build/contracts/Regulator.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.

var Regulator = contract(Regulator_artifact);
var KYC = contract(KYC_artifact);

const http=require('http');
const web3providera=new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var tz='039342444';
var varA = true;
var varB = true;
var varC = true;
var varD = true;
var varE = true;

// var watcherReq;
// var watcherSign;
//
// var latestWatched;

window.App = {
  start: function () {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    Regulator.setProvider(web3.currentProvider);
    KYC.setProvider(web3.currentProvider);

    // web3.eth.getBlock(48, function(error, result){
    //   if(!error)
    //     console.log(result)
    //   else
    //     console.error(error);
    // })

    console.log(web3.eth.accounts);
    accounts=web3.eth.accounts;
    account = accounts[0];

    // Get the initial account balance so it can be displayed.
    web3providera.eth.getAccounts(function (error, accs) {
      console.log(error, accs);
      if (error != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      // latestWatched        =0;
      // self.refreshBalance();


    });

    

    // web3.eth.getBlock('latest', function(error, result){
    //   if (error != null) {
    //     alert("There was an error fetching last block .");
    //     latestWatched        =0;
    //     return;
    //   }
    //
    //   latestWatched        = 0;//result.number.valueOf();
    //
    //   self.startSignListener();
    //   self.startRequestListener();
    //
    //
    // });
  },

  getBCAccounts: function () {
    return accounts;
  },

  getTz: function () {
    return tz;
  },

  initCreateCustomer:function()
  {
    App.submitConsumerCall(
        document.getElementById("account").value,
        document.getElementById("SSN").value);
  },

  initSetupPage:function()
  {
    document.getElementById("accounts").innerHTML = App.getBCAccounts();
    document.getElementById("SSN").value = App.getTz();

    document.getElementById("SSN").value = App.getTz();
    document.getElementById("tz").value = App.getTz();
    document.getElementById("account").value = App.getBCAccounts()[0];
    document.getElementById("useraccount").value = App.getBCAccounts()[0];
    document.getElementById("basecompanyaccount").value = App.getBCAccounts()[0];
    document.getElementById("companioncompanyaccount").value = App.getBCAccounts()[1];
    document.getElementById("companioncompanyaccount1").value = App.getBCAccounts()[1];

  },
  
  initDemoPage:function()
  {
    var self = this;
    var varA = true;
    var varB = true;
    var varC = true;
    var varD = true;
    var varE = true;

    self.getAttributePermition(self.getBCAccounts()[0], self.getBCAccounts()[1], tz, 'address')
        .then(function(attpermission) {
          if (attpermission==0) varA=false;
        }).catch(function (e) {
          // console.log(e);
            self.setRegisterStatus("Unable to get permission; see log.",e);
        });

      self.getAttributePermition(self.getBCAccounts()[0], self.getBCAccounts()[1], tz, 'bank_account')
          .then(function(attpermission) {
            if (attpermission==0) varA=false;

          }).catch(function (e) {
        // console.log(e);
        self.setRegisterStatus("Unable to get permission; see log.",e);
      });

      self.getAttributePermition(self.getBCAccounts()[0], self.getBCAccounts()[1], tz, 'creadit_card_number')
          .then(function(attpermission) {
            if (attpermission==0) varA=false;

          }).catch(function (e) {
        // console.log(e);
        self.setRegisterStatus("Unable to get permission; see log.",e);
      });

      self.getAttributePermition(self.getBCAccounts()[0], self.getBCAccounts()[1], tz, 'smoking')
          .then(function(attpermission) {
            if (attpermission==0) varA=false;

          }).catch(function (e) {
        // console.log(e);
        self.setRegisterStatus("Unable to get permission; see log.",e);
      });

      self.getAttributePermition(self.getBCAccounts()[0], self.getBCAccounts()[1], tz, 'alergic')
          .then(function(attpermission) {
            if (attpermission==0) varA=false;

          }).catch(function (e) {
        // console.log(e);
        self.setRegisterStatus("Unable to get permission; see log.",e);
      });


  },

  initClal: function (account) {
    var self = this;
    self.submitCompanyCall(accounts[1], "כלל", "ראול ואלנברג 36");
  },


  // createKYCDemo: function () {
  //   var self = this;
  //   self.createBaseCompanyRelationAllAttrib(
  //       document.getElementById("useraccount").value
  //       ,document.getElementById("basecompanyaccount").value
  //       ,document.getElementById("companioncompanyaccount").value
  //       ,document.getElementById("fname").value
  //       ,document.getElementById("tz").value
  //       ,document.getElementById("address").value
  //       ,document.getElementById("bankaccount").value
  //       ,document.getElementById("creditcart").value
  //       ,document.getElementById("smoking").value
  //       ,false);
  // },

  connectDemo: function () {
    var self = this;
   
    self.createBaseCompanyRelationAllAttrib(
    document.getElementById("useraccount").value
    ,document.getElementById("basecompanyaccount").value
    ,document.getElementById("companioncompanyaccount").value
    ,document.getElementById("fname").value
    ,document.getElementById("tz").value
    ,document.getElementById("address").value
    ,document.getElementById("bankaccount").value
    ,document.getElementById("creditcart").value
    ,document.getElementById("smoking").value
    ,false);
     // account, account,accounts[1], "יעקב פריד", tz, "הבשן 33 ת״א,651451", "פועלים 123, מח 987654", "14-24 5326 1234 1234 4154", "2 סיגריות ביום" ,false);
  },

  checkDemoAttributes: function () {
    var self = this;
    self.getActiveAttributes(
       document.getElementById("tz").value,
      document.getElementById("useraccount").value,
      document.getElementById("companioncompanyaccount").value);
   },
  

  submitConsumerCall: function (theAccount, thetz) {

    var self = this;
    var seccesed = false;
    var Registry_instance;
    Regulator.deployed().then(function (instance) {
      Registry_instance=instance;
      console.log("submitConsumerCall ");
      return Registry_instance.submitConsumer(theAccount, thetz, {from: account});
    }).then(function (result) {
      console.log("result:", result);
      for (var i = 0; i < result.logs.length; i++) {
        var log = result.logs[i];
        // console.log("log:",log);
        if (log.event == "AddConsumer") {
          // We found the event!
          console.log("AddConsumer:");
          console.log(log.args);
          seccesed = true;
          break;
        }
      }
      if (!seccesed) //error
      {
        self.setRegisterStatus("Unable to submitCustomer ; see log.");
        throw("Unable to submitCustomer ; see log.");
      }
      return Registry_instance.getConsumerAddress.call(thetz);
    }).then(function (customerAddress) {
      console.log("customer");
      console.log(customerAddress);
    }).catch(function (e) {
      console.log(e);
      self.setRegisterStatus("Unable to submitCustomer ; see log.", e);
    });

  },

  submitCompanyCall: function (theAccount, theName, theAddress) {

    var self = this;
    Regulator.deployed().then(function (instance) {
      console.log("submitCompanyCall ");
      return instance.submitCompany(theAccount, theName, theAddress, {from: account});
    }).then(function (result) {
      console.log("result:", result);
      var addedCompany = false;
      for (var i = 0; i < result.logs.length; i++) {
        var log = result.logs[i];

        if (log.event == "AddCompany") {
          // We found the event!
          console.log("AddCompany:");
          console.log(log.args);
          addedCompany = true;
          break;
        }
      }
      if (!addedCompany) throw("can't add company");
    }).catch(function (e) {
      console.log(e);
      self.setRegisterStatus("Unable to submit company ; see log.", e);
    });

  },

  createBaseCompanyRelationAllAttrib: function (theCustomerAccount, thaBaseCompanyAddress,thaCompanionCompanyAddress, theFullname, theTz, theAddress, theBankAccount, theCreaditCardNumber, smocking , alergic)
  {

    var self = this;
    self.createKYCAndConnectionCall(theCustomerAccount, thaBaseCompanyAddress, theFullname, theTz, theAddress, theBankAccount, theCreaditCardNumber, smocking,alergic)
      .then(function(kyccreated) {
        if (kyccreated) {
          self.createCompanionPermissionCall(thaBaseCompanyAddress, thaCompanionCompanyAddress, theTz, '*')
              .then(function() {

              }).catch(function (e) {
                console.log(e);
                self.setRegisterStatus("Unable to submitCustomer ; see log.", e);
                return false;
              });
        }
        }).catch(function (e) {
      console.log(e);
      self.setRegisterStatus("Unable to submitCustomer ; see log.", e);
      return false;
    });
  },

  createKYCAndConnectionCall: function (theCustomerAccount, thaBaseCompanyAddress, theFullname, theTz, theAddress, theBankAccount, theCreaditCardNumber, smocking,alergic) {
    var self = this;
    var Registry_instance;
    var firevent = false;
    return Regulator.deployed().then(function (instance) {
      Registry_instance = instance;
      console.log("create KYC:",theCustomerAccount, thaBaseCompanyAddress, theFullname, theTz, theAddress, theBankAccount, theCreaditCardNumber, smocking,alergic);
      return (KYC.new(theCustomerAccount, theFullname, theTz, theAddress, theBankAccount, theCreaditCardNumber, smocking,alergic, {from: thaBaseCompanyAddress , gas:5900000}));
    }).then(function (kycExtender) {
      console.log("kycExtender:",kycExtender);
      return Registry_instance.addCompanyRelation(theTz, kycExtender.address, {from: thaBaseCompanyAddress});
    }).then(function (result) {
      console.log("addCompanyRelation:",result);
      for (var i = 0; i < result.logs.length; i++) {
        var log = result.logs[i];

        if (log.event == "AddCompanyRelation") {
          // We found the event!
          console.log("AddCompanyRelation:",log.args);

          firevent = true;
          break;
        }
      }
      if (!firevent) throw("can't add Company Relation");
      return true;
    }).catch(function (e) {
      console.log(e);
      self.setRegisterStatus("Unable to submitCustomer ; see log.", e);
      return false;
    });
  },



    createCompanionPermissionCall: function(thaBaseCompanyAddress,thaCompanionCompanyAddress,theTz,theAttrName) {
      var self = this;
      var firevent=false;
      return Regulator.deployed().then(function(instance) {
        console.log("addCompanionPermissionByBaseCompany:",theTz,thaCompanionCompanyAddress,theAttrName);

        return instance.addCompanionPermissionByBaseCompany(theTz , thaCompanionCompanyAddress,theAttrName ,{from: thaBaseCompanyAddress });
      }).then(function (result) {
        firevent=false;
        console.log("addCompanyRelation:",result);
        for (var i = 0; i < result.logs.length; i++) {
          var log = result.logs[i];

          if (log.event == "AddCompanionPermissionByBaseCompany") {
            // We found the event!
            console.log("AddCompanionPermissionByBaseCompany:");
            console.log(log.args);
            firevent=true;
            break;
          }
        }

        if(!firevent)  throw("can't add CompanionPermissionByBaseCompany");
        // .then(assert.fail("getNumActivePDFs  failed"))

    }).catch(function (e) {
      console.log(e);
      self.setRegisterStatus("Unable to submitBeneficiary ; see log.",e);
    });
  },


  getAttributeValue: function(thaBaseCompanyAddress,thaCompanionCompanyAddress,theTz,theAttrName) {
    var self = this;
    var Registry_instance;
    return Regulator.deployed().then(function(instance) {
      Registry_instance = instance;
      return Registry_instance.getConsumerAttributePermission(theTz,thaBaseCompanyAddress,theAttrName,{from: thaCompanionCompanyAddress});
    }).then(function (attrperm) {
      console.log("attrperm:",attrperm.valueOf());
      return Registry_instance.getConsumerAttributeValue.call(theTz,thaBaseCompanyAddress,theAttrName,{from: thaCompanionCompanyAddress});
    }).then(function (attrvalue) {
      console.log("attrvalue:",web3.toUtf8(attrvalue));
      return web3.toUtf8(attrvalue);
    
    }).catch(function (e) {
      console.log(e);
      self.setRegisterStatus("Unable to submitBeneficiary ; see log.",e);
    });
  },

  getAttributePermition: function(thaBaseCompanyAddress,thaCompanionCompanyAddress,theTz,theAttrName) {
    var self = this;

    return Regulator.deployed().then(function(instance) {
      console.log('getAttributePermition',theTz,thaBaseCompanyAddress,theAttrName,' from',thaCompanionCompanyAddress);
      return instance.getConsumerAttributePermission(theTz,thaBaseCompanyAddress,theAttrName,{from: thaCompanionCompanyAddress});
      // return instance.getConsumerAttributePermission(theTz,thaBaseCompanyAddress,theAttrName,{from: thaCompanionCompanyAddress});
    }).then(function (attrperm) {
      console.log("attrperm:",attrperm.valueOf());

      return attrperm;
      

    }).catch(function (e) {
      console.log(e);
      self.setRegisterStatus("Unable to submitBeneficiary ; see log.",e);
    });
  },

  setAttributePermition: function(thaBaseCompanyAddress,thaCompanionCompanyAddress,theTz,theAttrName,theNewPermission) {
    var self = this;
    var Registry_instance;
    console.log("setAttributePermition:",thaBaseCompanyAddress,thaCompanionCompanyAddress ,theTz,theAttrName,theNewPermission);
    return Regulator.deployed().then(function(instance) {
      Registry_instance=instance;
      return Registry_instance.changeCompanionPermissionByCustomer(theTz,thaBaseCompanyAddress,thaCompanionCompanyAddress,theAttrName,theNewPermission,{from: thaBaseCompanyAddress});
    }).then(function (attrperm) {
      console.log("attrperm set:",attrperm.valueOf());

    //   return Registry_instance.getConsumerAttributePermission(theTz,thaBaseCompanyAddress,theAttrName,{from: thaCompanionCompanyAddress});
    //   // return instance.getConsumerAttributePermission(theTz,thaBaseCompanyAddress,theAttrName,{from: thaCompanionCompanyAddress});
    // }).then(function (attrperm) {
    //   console.log("attrperm get:",attrperm.valueOf());

      return attrperm;

    }).catch(function (e) {
      console.log(e);
      self.setRegisterStatus("Unable to submitBeneficiary ; see log.",e);
    });
  },

 
 

  setRegisterStatus: function(message,error) {
    console.log(error);
    var status = document.getElementById("registerStatus");
    status.innerHTML = message + " =>"+ error;
  },



  getAttributeName: function(theTz, theBaseCompanyAddress,theRow) {
    var self = this;
    return Regulator.deployed().then(function(instance) {
      return instance.getConsumerAttributeName(theTz,theBaseCompanyAddress,theRow,{from: account});
    }).then(function (attrname) {
      console.log("attrname:",web3.toUtf8(attrname));
      return web3.toUtf8(attrname);

    }).catch(function (e) {
      console.log(e);
      self.setRegisterStatus("Unable to submitBeneficiary ; see log.",e);
    });
  },



  getActiveAttributes: function (theTz,theBaseCompanyAddress,thaCompanionCompanyAddress) {
    var self = this;
    var attname,attpermission,attvalue;
    // theTz=123456789;
    // theBaseCompanyAddress=account;
    document.getElementById("activeAttributes").innerHTML = '';
    console.log("begin");
    Regulator.deployed().then(function (instance) {
      console.log("instance",theTz,theBaseCompanyAddress);
      return instance.getAttributeLength(theTz,theBaseCompanyAddress,{from: theBaseCompanyAddress});
    }).then(function (attrnum) {
      console.log("attrnum",attrnum);
      for (var i = 0; i < attrnum.valueOf(); i++) {
        self.getAttributeName(theTz,theBaseCompanyAddress,i)
            .then(function(attname) {
              self.getAttributePermition(theBaseCompanyAddress, thaCompanionCompanyAddress, theTz, attname)
                  .then(function(attpermission) {
                    self.getAttributeValue(theBaseCompanyAddress,thaCompanionCompanyAddress,theTz,attname)
                        .then(function(attvalue) {
                          var button1= " <button onclick=\"App.setAttributePermition(\'"+theBaseCompanyAddress+"\',\'"+thaCompanionCompanyAddress+"\',\'"+theTz+"\',\'"+attname+"\',0);\">change to 0</button>";
                          var button2= " <button onclick=\"App.setAttributePermition(\'"+theBaseCompanyAddress+"\',\'"+thaCompanionCompanyAddress+"\',\'"+theTz+"\',\'"+attname+"\',1);\">change to 1</button>";


                          document.getElementById("activeAttributes").innerHTML += "<br> attribute: "  + " name: " + attname + " value:" + attvalue + " prerm:"+ attpermission +
                              "  "+
                              button1 + " " + button2
                              +"<br />";
                        }).catch(function (e) {
                      // console.log(e);
                      self.setRegisterStatus("Unable to refresh balance; see log.",e);
                    });

                  }).catch(function (e) {
                // console.log(e);
                self.setRegisterStatus("Unable to refresh balance; see log.",e);
              });
            }).catch(function (e) {
          // console.log(e);
          self.setRegisterStatus("Unable to refresh balance; see log.",e);
        });
         }
    }).catch(function (e) {
      // console.log(e);
      self.setRegisterStatus("Unable to refresh balance; see log.",e);
    });
  },






  diffImage_1:function (img)
  {
    var self = this;
    if(img.src.match("not")){
      // self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'fullname',1);
      img.src = "images/s2_data_04.jpg";
      varA = true;

      console.log('A='+varA);
    }
    else{
      // self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'fullname',0);
      img.src = "images/s3_data_not_04.jpg";
      varA = false;
      console.log('A='+varA);
    }

  } ,

  diffImage_2:function (img)
{
  var self = this;
  if(img.src.match("not")){
    // self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'tz',1);
    img.src = "images/s2_data_05.jpg";
    varB = true;
    console.log('B='+varB);
  }
  else{
    // self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'tz',0);
    img.src = "images/s3_data_not_05.jpg";
    varB = false;
    console.log('B='+varB);
  }
},

  diffImage_3:function (img)
{
  var self = this;
  if(img.src.match("not")){
    // self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'address',1);
    img.src = "images/s2_data_06.jpg";
    varC = true;
    console.log('C='+varC);
  }
  else{
    // self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'address',0);
    img.src = "images/s3_data_not_06.jpg";
    varC = false;
    console.log('C='+varC);
  }
},

  diffImage_4:function (img)
{
  var self = this;
  if(img.src.match("not")){
    // self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'bank_account',1);
    img.src = "images/s2_data_07.jpg";
    varD = true;
    console.log('D='+varD);
  }
  else{
    // self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'bank_account',0);
    img.src = "images/s3_data_not_07.jpg";
    varD = false;
    console.log('D='+varD);
  }
},

  diffImage_5:function (img)
{
  var self = this;
  if(img.src.match("not")){
    // self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'creadit_card_number',1);
    img.src = "images/s2_data_08.jpg";
    varE = true;
    console.log('E='+varE);
  }
  else{
    // self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'creadit_card_number',0);
    img.src = "images/s3_data_not_08.jpg";
    varE = false;
    console.log('E='+varE);
  }
},



  VarsAlert:function () {
    var self = this;
    if (varA)
    {
      self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'address',1);
    }
    else
    {
      self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'address',0);
    }

    if (varB)
    {
      self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'bank_account',1);
    }
    else
    {
      self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'bank_account',0);
    }

    if (varC)
    {
      self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'creadit_card_number',1);
    }
    else
    {
      self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'creadit_card_number',0);
    }

    if (varD)
    {
      self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'smoking',1);
    }
    else
    {
      self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'smoking',0);
    }

    if (varE)
    {
      self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'alergic',1);
    }
    else
    {
      self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'alergic',0);
    }

    // self.setAttributePermition(self.getBCAccounts()[0],self.getBCAccounts()[1],tz,'creadit_card_number',1);

    // alert('look for the VarsAlert function \n' + varA + ' ' + varB + ' ' +varC + ' ' +varD + ' ' +varE);
  window.location.href = "s3.html";
},



};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  var web3provider;
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    console.warn("Use Mist/MetaMask's provider");

    web3provider= new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3provider=new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  window.web3 =web3provider;


  App.start();
});
