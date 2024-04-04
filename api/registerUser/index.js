const { CosmosClient } = require("@azure/cosmos");

const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const client = new CosmosClient({ endpoint, key });

const database = client.database('UserRegistration');
const container = database.container('Users');

module.exports = async function (context, req) {
    try {
        const { email, name, phone, password } = req.body;
        const { resource: createdItem } = await container.items.create({
            email, name, phone, password // Ensure you hash the password in a real app
        });

        context.res = {
            status: 200,
            body: "User registered successfully!"
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: "Error registering user"
        };
    }
};
