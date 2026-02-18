const prisma = require("../lib/prisma"); 

exports.createPost = async (userId, data) => {
  const { title, content, published } = data;

  if (!title || !content) { // cek kosong atau ga, kalo kosong throw error
    const error = new Error("Title and content are required");
    error.statusCode = 400;
    throw error;
  }

  const post = await prisma.post.create({ // simpen data post baru ke database
    data: {
      title,
      content,
      published: published || false, // defaultnya false kalo ga dikirim
      userId,
    },
  });

  return post;
};

exports.getAllPosts = async (page, limit) => {
  const skip = (page - 1) * limit; //page 1 -> (1-1)*10 = 0, page 2 -> (2-1)*10 = 10

  const posts = await prisma.post.findMany({ // ambil data post dari database dengan pagination
    skip, // offsetnya
    take: limit, // jumlah data
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true, // ambil data user tapi ga masukin password juga, biar aman
        },
      },
    },
    orderBy: {
      createdAt: "desc", // post terbaru muncul paling atas
    },
  });

  const total = await prisma.post.count(); // totaljumlah post

  return {
    posts,
    total,
    page,
    totalPages: Math.ceil(total / limit), // klo misal 26 post, limit 10, 2.6 dibuletin jadi 3
  };
};

exports.getPostById = async (id) => {
  const post = await prisma.post.findUnique({
    where: { id }, // cari post di database berdasarkan id
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!post) { // kalo ga ketemu, throw error
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  return post; 
};

exports.updatePost = async (id, user, data) => {
  const post = await prisma.post.findUnique({
    where: { id }, // cari post di database berdasarkan id
  });

  if (!post) { // kalo ga ketemu, throw error
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  // Cuman pemilik or admin can update
  if (post.userId !== user.id && user.role !== "admin") {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  }

  const updated = await prisma.post.update({
    where: { id },
    data, // data yang mau di update, apa aja yg dimodel post
  });

  return updated;
};

exports.deletePost = async (id, user) => {
  const post = await prisma.post.findUnique({
    where: { id }, // cari post di database berdasarkan id
  });

  if (!post) { // kalo ga ketemu, throw error
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  if (post.userId !== user.id && user.role !== "admin") { // Cuman pemilik or admin can delete
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  }

  await prisma.post.delete({ // hapus post dari database berdasarkan id
    where: { id },
  });

  return true;
};
