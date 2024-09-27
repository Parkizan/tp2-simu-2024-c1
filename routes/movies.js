import express from "express";
import {
  getAllMovies,
  getMovie,
  getAwardedMovies,
  getMoviesByLanguage,
  getMoviesOrderedByFreshRating,
} from "../data/movies.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllMovies(pageSize, page));
});

router.get("/id/:id", async (req, res) => {
  const movie = await getMovie(req.params.id);
  res.json(movie);
});

router.get("/winners", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAwardedMovies(pageSize, page));
});

router.get("/language/:language", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getMoviesByLanguage(pageSize, page, req.params.language));
});

router.get("/freshRanking", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getMoviesOrderedByFreshRating(pageSize, page));
});

export default router;
