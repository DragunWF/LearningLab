import express from "express";

const router = express.Router();

let posts = [
  { id: 1, title: "Atomic Habits" },
  { id: 2, title: "The Psychology of Money" },
  { id: 3, title: "The Lean Startup" },
];

router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(posts.splice(0, limit));
  } else {
    res.status(200).json(posts);
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id === Number(id));
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

router.post("/create", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  const newPost = { id: posts.length + 1, title };
  posts.push(newPost);
  res.status(201).json(newPost);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  const post = posts.find((post) => post.id === Number(id));
  if (post) {
    post.title = title;
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id === Number(id));
  if (post) {
    posts = posts.filter((post) => post.id !== Number(id));
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

export default router;
