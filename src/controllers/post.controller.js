const postService = require("../services/post.service");
// import service buat post
const { successResponse } = require("../utils/response");
// import helper buat response sukses, biar format responsnya konsisten dan ga repetisi

exports.createPost = async (req, res, next) => { // export function bernama createPost
  try {
    const post = await postService.createPost(req.user.id, req.body);
    //req.user.id diambil dari middleware authAny
    //data dari body dikirim ke postService.createPost, habis itu dicek dlu baru dimasukkin ke db
    //kalau berhasil, post yang baru dibuat bakal di return, kalau gagal throw error

    return successResponse(res, 201, "Post created", post);
    // kalo berhasil, return respons sukses dan data = post yang baru dibuat
  } catch (error) {
    next(error); // kalau ada error, lempar ke middleware error handler
  }
};

exports.getAllPosts = async (req, res, next) => { // export function bernama getAllPosts
  try {
    const page = parseInt(req.query.page) || 1; // ambil query paramter dari url, kalau ga ada default ke 1
    const limit = parseInt(req.query.limit) || 10; //limit jumlah data, default 10

    const result = await postService.getAllPosts(page, limit);
    //data page dan limit dikirim ke postService.getAllPosts, 
    //abis itu data post yang sesuai dengan page dan limit akan di return, kalau gagal throw error

    return successResponse(res, 200, "Posts retrieved", result);
    // kalo berhasil, return respons sukses, msg dan data = post 

  } catch (error) {
    next(error); // kalau ada error, lempar ke middleware error handler
  }
};

exports.getPostById = async (req, res, next) => { // export function bernama getPostById
  try {
    const post = await postService.getPostById(req.params.id);
    // req.params.id, id diambil dari url
    // cari di database post yg idnya sesuai, kalau ketemu return post
    // kalau ga throw error

    return successResponse(res, 200, "Post retrieved", post);
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => { // export function bernama updatePost
  try {
    const updated = await postService.updatePost( 
      req.params.id,
      req.user,
      req.body
    );
    // data id diambil dari url, data user diambil dari middleware authAny
    // req.body itu buat ambil data yang mau di update
    // req.user buat ngecek, usernya pemilik post atau admin. kalau bukan kedua maka gabole

    return successResponse(res, 200, "Post updated", updated);
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => { // export function bernama deletePost
  try {
    await postService.deletePost(req.params.id, req.user);
    // sama dengan updatePost, tapi gaperlu body

    return successResponse(res, 200, "Post deleted");
  } catch (error) {
    next(error);
  }
};
