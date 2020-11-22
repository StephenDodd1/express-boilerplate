const express = require("express");

const lyricsRouter = express.Router();
const lyricsService = require("../lyrics/lyrics-service");

const jsonBodyParser = express.json();
const xss = require("xss");

const serializeLyrics = (lyrics) => ({
  id: lyrics.id,
  title: xss(lyrics.title),
  lyrics: xss(lyrics.lyrics),
  artist: xss(lyrics.artist),
});

lyricsRouter.route("/api/lyrics/:search").get((req, res, next) => {
  const knex = req.app.get("db");
  const search = req.params.search;
  console.log('passed')
  lyricsService.searchLyrics(knex, search).then((lyrics) => {
    if (!lyrics) {
      res.status(404).json({
        error: { message: "no lyrics found" },
      });
    }
    console.log('retrieved data')
    res.status(200).json(lyrics.map(serializeLyrics));
    next();
  });
});

lyricsRouter.route("/api/lyric/:id").get((req, res, next) => {
  const knex = req.app.get("db");
  const id = req.params.id;
  lyricsService.getLyrics(knex, id).then((lyrics) => {
    if (!lyrics) {
      res.status(404).json({
        error: { message: "lyrics couldn't be retrieved" },
      });
    }    
    res.status(200).json(lyrics.map(serializeLyrics));
    next();
  });
});

lyricsRouter.route("/api/lyric/:id").patch((req, res, next) => {
  const knex = req.app.get("db");
  const id = req.params.id;
  const {artist, title, lyrics} = req.body;
  const updated = {id, artist, title, lyrics}
  lyricsService.updateLyric(knex, updated).then((lyric) =>{
    if(!lyric){
      res.status(400).json({
        error: { message: "Bad Request" }
      })
    }
    res.status(200).json(lyric.map(serializeLyrics))
  })
});

lyricsRouter.route("/api/lyrics/create").post(jsonBodyParser, (req, res, next) => {
  const knex = req.app.get("db");
  console.log(req.body);
  const { artist, title, lyrics } = req.body;
  const added = {artist, title, lyrics};
  lyricsService.createLyric(knex, added).then(lyric => {
    if(!lyric){
      res.status(400).json({
        error: { message: "Bad Request" }
      })
    }
    console.log(lyric)
    res.status(200).json(lyric.map(serializeLyrics))
  })
});

module.exports = lyricsRouter;