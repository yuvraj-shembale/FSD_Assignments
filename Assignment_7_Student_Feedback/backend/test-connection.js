const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config();

dns.setServers(['8.8.8.8', '1.1.1.1']);

const uriEncoded = "mongodb+srv://yuvrajshembale23_db_user:Yuvraj%4019213@cluster0.zf4b4c4.mongodb.net/studentFeedbackDB?appName=Cluster0";
const uriPlain = "mongodb+srv://yuvrajshembale23_db_user:Yuvraj@19213@cluster0.zf4b4c4.mongodb.net/studentFeedbackDB?appName=Cluster0";

async function test(uri, label) {
    console.log(`Testing ${label}...`);
    try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log(`✅ ${label} worked!`);
        await mongoose.connection.close();
    } catch (err) {
        console.log(`❌ ${label} failed: ${err.message}`);
    }
}

async function run() {
    await test(uriEncoded, "Encoded (@ as %40)");
    await test(uriPlain, "Plain (@ as is)");
    process.exit();
}

run();
