const uri = "mongodb://localhost:27017";
import { MongoClient } from "mongodb";
const client = new MongoClient(uri);

let articles

export async function main() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("connected");
    const database = client.db("articles");
    articles = database.collection("articlename");
    // await articles.insertOne({ name: "abhishek" });
    // Make the appropriate DB calls
  } catch (e) {
    console.error(e);
  } 
  // finally {
  //   await client.close();
  // }
}
export function addArticles(){
  return articles;
}

