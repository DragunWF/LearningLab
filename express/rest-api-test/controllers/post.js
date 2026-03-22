let posts = [
  { id: 1, title: "Atomic Habits" },
  { id: 2, title: "The Psychology of Money" },
  { id: 3, title: "The Lean Startup" },
];

export const getPosts = (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(posts.slice(0, limit));
  } else {
    res.status(200).json(posts);
  }
};

export const getPost = (req, res, next) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id === parseInt(id));
  if (post) {
    res.status(200).json(post);
  } else {
    next(new Error("Post not found"));
  }
};

export const createPost = (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    next(new Error("Title is required"));
  }
  const newPost = {
    id: posts.length + 1,
    title,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
};

export const updatePost = (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;
  if (!title) {
    next(new Error("Title is required"));
  }
  const post = posts.find((post) => post.id === parseInt(id));
  if (post) {
    post.title = title;
    res.status(200).json(post);
  } else {
    next(new Error("Post not found"));
  }
};

export const deletePost = (req, res, next) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id === parseInt(id));
  if (post) {
    posts = posts.filter((post) => post.id !== parseInt(id));
    res.status(200).json(post);
  } else {
    next(new Error("Post not found"));
  }
};
