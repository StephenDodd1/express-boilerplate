const lyricsService = {
  searchLyrics(knex, search) {
    return knex("lyrics")
      .select("lyrics.id", "lyrics.artist", "lyrics.title")
      .where("artist", "like", `%${search}%`)
      .orWhere("title", "like", `%${search}%`);
  },
  getLyrics(knex, id) {
    return knex("lyrics")
      .select("lyrics.id", "lyrics.artist", "lyrics.title", "lyrics.lyrics")
      .where("id", "=", id);
  },
  createLyric(knex, added) {
    return knex('lyrics')
      .insert(added)
      .returning("*")
  },
};

module.exports = lyricsService;
