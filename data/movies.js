import getConnection from "./conn.js";
import { ObjectId } from "mongodb";
const DATABASE = "sample_mflix";
const MOVIES = "movies";
const COMMENTS = "comments";
const USERS = "users";

async function getAllMovies(pageSize, page) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(USERS)
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return movies;
}

async function getMovie(id) {
  const clientmongo = await getConnection();

  const movie = await clientmongo
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({ _id: new ObjectId(id) });

  return movie;
}

async function getAwardedMovies(pageSize, page) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ "awards.wins": { $gt: 0 } })
    .project({ title: 1, poster: 1, plot: 1, _id: 0 })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return movies;
}

async function getMoviesByLanguage(pageSize, page, language) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ languages: { $in: [language] } })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return movies;
}

async function getMoviesOrderedByFreshRating(pageSize, page) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ "tomatoes.fresh": { $exist: true } })
    .sort({ "tomatoes.fresh": -1 })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return movies;
}

// Incompleto
async function getCommentsByUser(id) {
  const clientmongo = await getConnection();

  const user_email = await clientmongo
    .db(DATABASE)
    .collection(USERS)
    .findOne({ _id: new ObjectId(id) }).email;

  const user_comments = await clientmongo
    .db(DATABASE)
    .collection(COMMENTS)
    .find({ email: user_email })
    .toArray();

  const movieIds = user_comments.map((comment) => comment.movie_id);

  const movies = await clientmongo
    .db(DATABASE)
    .collection(MOVIES)
    .find({ _id: { $in: movieIds.map((id) => new ObjectId(id)) } })
    .toArray();
}

export {
  getAllMovies,
  getMovie,
  getAwardedMovies,
  getMoviesByLanguage,
  getMoviesOrderedByFreshRating,
};
