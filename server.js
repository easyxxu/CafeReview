const path = require("path");

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const bodyParser = require("body-parser");

server.use(middlewares);
server.use(bodyParser.json());

server.get("/search", (req, res) => {
  const searchKeyword = req.query.searchKeyword;
  const db = router.db;
  const reviews = db.get("reviews").filter((review) => {
    if (review.title.includes(searchKeyword)) {
      return review;
    }
  });

  res.json(reviews);
});

server.post("/comments/:id", (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  const comments = router.db.get("comments");
  const comment = comments.find({ id: parseInt(id) }).value();

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (comment.password !== password) {
    return res
      .status(403)
      .json({ message: "Unauthorized: Incorrect password!" });
  }

  comments.remove({ id: parseInt(id) }).write();
  res.status(200).json({ message: "Comment deleted successfully" });
});

server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
