// var Owners = artifacts.require("./Owners.sol");
// var PermissionExtender = artifacts.require("./PermissionExtender.sol");
var KYC = artifacts.require("./KYC.sol");
var Regulator = artifacts.require("./Regulator.sol");

var account;
var accounts;







contract('Regulator', function(accounts) {

    console.log("accounts",accounts);
    accounts=accounts;
    var Registry_instance;
    it("should be empty at the beginning", function() {
        return Regulator.deployed().then(function (instance) {
            Registry_instance = instance;
            // console.log("instance",instance);
            return Registry_instance.getCompaniesList.call();
        }).then(function (companies_list) {
            console.log("companies_list", companies_list);
            assert.equal(companies_list.length, 1, "Registry wasn't empty!");
            Registry_instance.getCompany(companies_list[0])
        }).then(function (company_data) {
            console.log("company_data", company_data);
        }).catch(function (error) {
            console.error(error);
            assert.equal(error.toString(), '',
                'Error detected')
        });

    });




    it("should add customer at the beginning", function() {
        var Registry_instance;
        var tz='039342444';
        return Regulator.deployed().then(function(instance) {
            Registry_instance = instance;
            return Registry_instance.getOwner.call();
        }).then(function (regulatorAddress) {
            account=regulatorAddress;
            console.log("regulatorAddress:"+account);
            return Registry_instance.submitConsumer(account ,tz,{from: account});
        }).then(function (result) {
            console.log("result:",result);
            for (var i = 0; i < result.logs.length; i++) {
                var log = result.logs[i];
                // console.log("log:",log);
                if (log.event == "AddConsumer") {
                    // We found the event!
                    console.log("AddConsumer:");
                    console.log(log.args);
                    // break;
                    return Registry_instance.getConsumerAddress.call(tz);
                }
            }
            console.log("call getConsumerAddress:",tz);
            // assert.fail("can't add consumer");
            return Registry_instance.getConsumerAddress.call(tz);

        }).then(function (customerAddress) {
            console.log("customer");
            console.log(customerAddress);
            assert.equal(customerAddress, account, "Registry wasn't empty!");
        }).catch(function(error) {
            console.error(error);
            assert.equal(error.toString(),'',
                'Error detected')
        });
    });

    it("should add test company ", function() {
        var Registry_instance;
        return Regulator.deployed().then(function(instance) {
            Registry_instance = instance;
            return Registry_instance.submitCompany(accounts[1] ,'test company','test address',{from: account});
        }).then(function (result) {
            var addedCompany=false;
            for (var i = 0; i < result.logs.length; i++) {
                var log = result.logs[i];

                if (log.event == "AddCompany") {
                    // We found the event!
                    console.log("AddCompany:");
                    console.log(log.args);
                    addedCompany=true;
                    break;
                }
            }
            if(!addedCompany) assert.fail("can't add company");
            // console.log(tx_id);
            Registry_instance.getCompany(accounts[1])
        }).then(function (company_data) {
            console.log("test company_data", company_data);
        }).catch(function(error) {
            console.error(error);
            assert.equal(error.toString(),'',
                'Error detected')
        });
    });






    it("create basecompany KYC and relation", function() {
        var Registry_instance;
        var tz='039342444';
        var firevent=false;
        return Regulator.deployed().then(function(instance) {
            Registry_instance = instance;
            return (KYC.new(account,"test cast",tz,'herzel 12 TA', "213232", "2134 1234 1234 2132", "smoking",false));

            // .then(assert.fail("index is not found"))
            }).then(function (kycExtender) {
                return Registry_instance.addCompanyRelation(tz,kycExtender.address,{from: account });
            }).then(function (result) {
                // console.log("addCompanyRelation:",result);
                for (var i = 0; i < result.logs.length; i++) {
                    var log = result.logs[i];

                    if (log.event == "AddCompanyRelation") {
                        // We found the event!
                        console.log("AddCompanyRelation:");
                        console.log(log.args);
                        firevent=true;
                        break;
                    }
                }
            if(!firevent) assert.fail("can't add Company Relation");
                return Registry_instance.addCompanionPermissionByBaseCompany(tz , accounts[1],'*' ,{from: account });
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

            if(!firevent)  assert.fail("can't add CompanionPermissionByBaseCompany");
            // .then(assert.fail("getNumActivePDFs  failed"))
            }).catch(function(error) {
                console.log("error "+error)
                assert.equal(error.toString(),'',
                    'Error detected')
            });
    });




    it("test companion  relation ", function() {
        var Registry_instance;
        var tz='039342444';
        return Regulator.deployed().then(function(instance) {
            Registry_instance = instance;
            return Registry_instance.getConsumerAttributePermission(tz,account,'tz',{from: accounts[1]});
        }).then(function (attrperm) {
            console.log("attrperm:",attrperm.valueOf());
            assert.equal(attrperm, 1, "attrvalue should be 1 !");
            return Registry_instance.getConsumerAttributeValue.call(tz,account,'tz',{from: accounts[1]});
        }).then(function (attrvalue) {
                    console.log("attrvalue:",web3.toUtf8(attrvalue));
                    assert.equal(web3.toUtf8(attrvalue), tz, "expected tz!");

            // assert.equal(attrvalue, 1, "attrvalue should be 1 !");

        }).catch(function(error) {
                console.log("error "+error)
                assert.equal(error.toString(),'',
                    'Error detected')
            });

    });


    it("test bad companion  relation ", function() {
        var Registry_instance;
        var tz='039342444';
        return Regulator.deployed().then(function(instance) {
            Registry_instance = instance;
            return Registry_instance.getConsumerAttributePermission(tz,account,'tz',{from: accounts[2]});
        }).then(function (attrperm) {
            console.log("attrperm:",attrperm.valueOf());
             assert.equal(attrperm, 0, "attrvalue should be 1 !");
            return Registry_instance.getConsumerAttributeValue.call(tz,account,'tz',{from: accounts[2]});
        }).then(function (attrvalue) {
            console.log("attrvalue:",web3.toUtf8(attrvalue));
            assert.equal(web3.toUtf8(attrvalue), 'not permited', "Registry wasn't empty!");

            // assert.equal(attrvalue, 1, "attrvalue should be 1 !");

        }).catch(function(error) {
            console.log("error "+error)
            assert.equal(error.toString(),'',
                'Error detected')
        });

    });

    it("test bed customer  permission change   ", function() {
        var Registry_instance;
        var tz='039342444';
        return Regulator.deployed().then(function(instance) {
            Registry_instance = instance;
            return Registry_instance.getConsumerAttributePermission(tz,account,'tz',{from: accounts[2]});
        }).then(function (attrperm) {
            console.log("attrperm:",attrperm.valueOf());
            assert.equal(attrperm, 0, "attrvalue should be 0 !");
            return Registry_instance.getConsumerAttributeValue.call(tz,account,'tz',{from: accounts[2]});
        }).then(function (attrvalue) {
            console.log("attrvalue:",web3.toUtf8(attrvalue));
            assert.equal(web3.toUtf8(attrvalue), 'not permited', "Registry wasn't empty!");

            // assert.equal(attrvalue, 1, "attrvalue should be 1 !");

        }).catch(function(error) {
            console.log("error "+error)
            assert.equal(error.toString(),'',
                'Error detected')
        });

    });

    it("test companion  permission change ", function() {
        var Registry_instance;
        var tz='039342444';
        return Regulator.deployed().then(function(instance) {
            Registry_instance = instance;
            return Registry_instance.getConsumerAttributePermission(tz,account,'tz',{from: accounts[1]});
        }).then(function (attrperm) {
            console.log("attrperm:",attrperm.valueOf());
            assert.equal(attrperm, 1, "attrvalue should be 1 !");
            return Registry_instance.changeCompanionPermissionByCustomer(tz,account,accounts[1],'tz',0,{from: account});
        }).then(function (tx) {
            return Registry_instance.getConsumerAttributePermission(tz,account,'tz',{from: accounts[1]});
        }).then(function (attrperm) {
            console.log("attrperm:",attrperm.valueOf());
            assert.equal(attrperm.valueOf(), 0, "attrvalue should be 0 !");

        }).catch(function(error) {
            console.log("error "+error)
            assert.equal(error.toString(),'',
                'Error detected')
        });
    });

    it("test companion  permission change by customer", function() {
        var Registry_instance;
        var tz = '039342444';
        return Regulator.deployed().then(function (instance) {
            Registry_instance = instance;
            console.log("begin:");
            return Registry_instance.getConsumerAttributePermission(tz, account, 'tz', {from: accounts[1]});
        }).then(function (attrperm) {
            console.log("attrperm:", attrperm);
            assert.equal(attrperm.valueOf(), 0, "attrvalue should be 0 !");
            return Registry_instance.changeCompanionPermissionByCustomer(tz, account, accounts[1], 'tz', 1, {from: account});
        }).then(function (done) {
            return Registry_instance.getConsumerAttributePermission(tz, account, 'tz', {from: accounts[1]});
        }).then(function (attrperm) {
            console.log("attrperm:", attrperm);
            assert.equal(attrperm.valueOf(), 1, "attrvalue should be 0 !");

        }).catch(function (error) {
            console.log("error " + error)
            // assert.equal(error.toString(),'',
            //     'Error detected')
        });




    });


    it("test   permission request by customer", function () {
        var Registry_instance;
        var tz = '039342444';
        return Regulator.deployed().then(function (instance) {
            Registry_instance = instance;
            console.log("begin:");
            return Registry_instance.setRequestCompanionByCustomer(tz, account, accounts[1], true, {from: account});
        }).then(function (done) {
            return Registry_instance.getRequestCompanionByCustomer.call(tz, account, accounts[1],  {from: account});
        }).then(function (done) {
            console.log("requested:", done);
            assert.equal(done, true, "attrvalue should be true !");
         }).catch(function (error) {
            console.log("error " + error)
            // assert.equal(error.toString(),'',
            //     'Error detected')
        });
    });






    // it("test show all attributes", function() {
    //     var Registry_instance;
    //     var tz='039342444';
    //     var attrnum_loop
    //     return Regulator.deployed().then(function(instance) {
    //         Registry_instance = instance;
    //         return Registry_instance.getAttributeLength(tz,account,{from: accounts[1]});
    //     }).then(function (attrnum) {
    //         attrnum_loop=attrnum;
    //         console.log("attrnum:",attrnum.valueOf());
    //         assert.equal(attrnum, 6, "attrvalue should be 6 !");
    //         for (i=0 ;i<attrnum;i++) {
    //             function () {
    //                 return Registry_instance.getConsumerAttributeName.call(tz, account, i, {from: accounts[1]});
    //             }
    //             .then(function (attrvalue) {
    //                     console.log("attrvalue:", web3.toUtf8(attrvalue));
    //                     assert.equal(web3.toUtf8(attrvalue), 'not permited', "Registry wasn't empty!");
    //
    //                     // assert.equal(attrvalue, 1, "attrvalue should be 1 !");
    //
    //                 }).catch(function (error) {
    //                     console.log("error " + error)
    //                     assert.equal(error.toString(), '',
    //                         'Error detected')
    //                 });
    //
    //         }
    //
    //
    //     }).catch(function(error) {
    //         console.log("error "+error)
    //         assert.equal(error.toString(),'',
    //             'Error detected')
    //     });
    //
    // });






});

