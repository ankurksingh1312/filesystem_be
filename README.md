brew tap mongodb/brew
brew install mongodb-community@6.0

# Create MongoDB data directory
mkdir -p ~/data/db

# Start MongoDB with custom data path
mongod --dbpath ~/data/db

# In another terminal, connect to MongoDB
mongosh