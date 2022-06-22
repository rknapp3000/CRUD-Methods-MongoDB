const connection = require("./config/mongoConnection");
const bands = require("./data/bands");



async function main() {
    const db = await connection.dbConnection();
    await db.dropDatabase(); // might have to take this out

    // 1) create a band of your choice
    console.log('Let\'s add our first band........ \n\n')
    try {
        rhcp = await bands.create(
            "Red Hot Chili Peppers",
            ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
            "http://www.redhotchilipeppers.com",
            "EMI",
            ["Anthony Keidis", "John Frusciante", "Flea", "Chad Smith"],
            1983);
        console.log(rhcp);
    } catch (e) {
        console.log(e);
    }


    //2) log the newly created band
    console.log('\n\n--------------------------------------------------------------------------------------------------------');
    console.log('Now let\'s log our newly created band........ \n\n');
    try {
        const band = await bands.get(rhcp._id.toString());
        console.log(band);
    } catch (e) {
        console.log(e);
    }


    // 3) create another band of your choice
    console.log('\n\n--------------------------------------------------------------------------------------------------------');
    console.log('Now let\'s create another band of our choice........ \n\n');
    try {
        pinkFloyd = await bands.create(
            "Pink Floyd",
            ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
            "http://www.pinkfloyd.com",
            "EMI",
            ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett"],
            1965);
        console.log(pinkFloyd);
    } catch (e) {
        console.log(e);
    }

    // 4) query all bands and log them all
    console.log('\n\n--------------------------------------------------------------------------------------------------------');
    console.log('Now let\'s query all bands and log them all........ \n\n');
    try {
        const allBands = await bands.getAll();
        console.log(allBands);
    } catch (e) {
        console.log(e);
    }

    // 5) create a 3rd band of your choice
    console.log('\n\n--------------------------------------------------------------------------------------------------------'); 
    console.log('Now let\'s create a third band of our choice........ \n\n');
    try {
        eagles = await bands.create(
            "The Eagles",
            ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
            "http://www.theeagles.com",
            "EMI",
            ["Don Henley", "Joe Walsh", "Glenn Frey", "Don Felder", "Randy Meisner"],
            1971);
        console.log(eagles);
    } catch (e) {
        console.log(e);
    }

    // 6) log the created band above and not the other ones
    console.log('\n\n--------------------------------------------------------------------------------------------------------');
    console.log('Now let\'s log only the 3rd band we just created........ \n\n');
    try {
        const band = await bands.get(eagles._id.toString());
        console.log(band);
    } catch (e) {
        console.log(e);
    }

    //7) rename the first band 
    console.log('\n\n--------------------------------------------------------------------------------------------------------');
    console.log('Now let\'s rename the first band that we created........ \n\n');
    try {
        const renamedBand = await bands.rename(rhcp._id.toString(), "Ryan's New Band");
        console.log(renamedBand);
    } catch (e) {
        console.log(e);
    }

    // 8) log the first band with the updated name.
    console.log('\n\n--------------------------------------------------------------------------------------------------------');  
    console.log('Now let\'s log the renamed band........ \n\n');
    try {
        const renamedBand = await bands.get(rhcp._id.toString());
        console.log(renamedBand);
    } catch (e) {
        console.log(e);
    }

    // 9) Remove the second band you created.  TODO - figure out this connection pool issue
    console.log('\n\n--------------------------------------------------------------------------------------------------------');
    console.log('Now let\'s remove the second band that we created........ \n\n');
    try {
        const laterPF = await bands.remove(pinkFloyd._id.toString());
        console.log(laterPF);
    } catch (e) {
        console.log(e);
    }


    //10) Query all bands, and log them all 
    console.log('\n\n--------------------------------------------------------------------------------------------------------');
    console.log('Now let\'s query all bands, and log them all ........ \n\n');
    try {
        const allBands = await bands.getAll();
        console.log(allBands);
    } catch (e) {
        console.log(e);
    }

    //     //TODO there was an error here when trying to test bad input.

    // 11) Try to create a band with bad input parameters to make sure it throws errors.
    console.log('\n\n--------------------------------------------------------------------------------------------------------');
    console.log('\nERROR HANDLING TESTING: \n');
    console.log('Let\'s create a band with bad input and make sure it throws an error ........ \n\n');
    try {
        const pinkFloyd = await bands.create(
            "Pink Floyd",
            ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
            "http://www.pi.com",
            1,
            ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett"],
            1965);
        console.log(pinkFloyd);
    } catch (e) {
        console.log(e);
    }

    //TODO test this one after you get the remove working with proper input
    //12) Try to remove a band that does not exist to make sure it throws errors.
    console.log('\n\n--------------------------------------------------------------------------------------------------------');
    console.log('Let\'s try to remove a band that does not exist and make sure it throws an error ........ \n\n'); 
    try {
        const removeb = await bands.remove("asdf");
        console.log(removeb);
    } catch (e) {
        console.log(e);
    }

    //13) Try to rename a band that does not exist to make sure it throws errors.
    console.log('\n\n--------------------------------------------------------------------------------------------------------');
    console.log('Let\'s try to rename a band that does not exist and make sure it throws an error ........ \n\n'); 
    try {
        const renamee = await bands.rename("62b09538af36e84536de8898", "Ryan's New Band");
        console.log(renamee);
    } catch (e) {
        console.log(e);
    }

        // //14) Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
        console.log('\n\n--------------------------------------------------------------------------------------------------------');
        console.log('Let\'s try to rename a band while passing invalid data and make sure it throws an error ........ \n\n')
        try {
            const renamedBand = await bands.rename(123, "Ryan's New Band");
            console.log(renamedBand);
        } catch (e) {
            console.log(e);
        }

        //15) Try getting a band by ID that does not exist to make sure it throws errors.
        console.log('\n\n--------------------------------------------------------------------------------------------------------');
        console.log('Let\'s try to get a band that does not exist and make sure it throws an error ........ \n\n')
        try {
            const errorBand = await bands.get("62b09538af36e84536de8999");
            console.log(errorBand);
        } catch (e) {
            console.log(e);
        }





    //***************************** MORE TESTING *********************************

    //     console.log("testing method 1 create ---------------------------------------------------------------->");
    // try {
    //     const pinkFloyd = await bands.create("Pink Floyd", ["Progressive Rock", "Psychedelic rock", "Classic Rock"], "http://www.pinkfloyd.com", "EMI", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ], 1965);
    //     console.log(pinkFloyd);
    // } catch (e) {
    //     console.log(e);
    // }  


    //     console.log("\n"); 
    //     console.log("testing method 2 getAll ---------------------------------------------------------------->")
    // try {
    //     const allBands = await bands.getAll();
    //     console.log(allBands);
    // } catch (e) {
    //     console.log(e);
    // }  

    // console.log("\n"); 
    // console.log("testing method 3 get ---------------------------------------------------------------->")

    // try {
    //     const pinkfloyd = await bands.get("62b09538af36e84536de0967"); 
    //     console.log(pinkfloyd); 
    // } catch (e) {
    //     console.log(e); 
    // }

    // console.log("\n"); 
    // console.log("testing method 4 remove ---------------------------------------------------------------->")

    // try {
    //     const removePinkFloyd = await bands.remove("62b109eda38bd75fb4dd9241"); 
    //     console.log(removePinkFloyd); 
    // } catch (e) {
    //     console.log(e); 
    // }

    // console.log("\n"); 
    // console.log("testing method 5 rename ---------------------------------------------------------------->")

    // try {
    //     const renamedBand = await bands.rename("62afea2cdf7d25ef50116767", "Red Hot Chili Peppers"); 
    //     console.log(renamedBand); 
    // } catch (e) {
    //     console.log(e); 
    // }

    await connection.closeConnection();

}

main();