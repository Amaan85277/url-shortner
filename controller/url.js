const shortid = require("shortid");
const URL = require("../model/url");

async function handleGenerateShortURL(req, res) {
  const body = req?.body;
  if (!body.url) res.status(400).json({ error: "URL is required!" });
  const shortID = shortid.generate(); //length of short id to be 8
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.status(200).json({ id: shortID });
}

async function handleGetOriginalURL(req, res) {
  const shortId = req?.params?.shortId;
  if (!shortId) res.status(400).json({ error: "URL is required!" });
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  return res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res) {
  const body = req?.body;
  if (!body.shortId) res.status(400).json({ error: "shortId is required!" });

  const shortId = body?.shortId;
  const entry = await URL.findOne({ shortId });
  return res.status(200).json({
    totalClicks: entry?.visitHistory.length,
    analytics: entry?.visitHistory,
  });
}

module.exports = {
  handleGenerateShortURL,
  handleGetOriginalURL,
  handleGetAnalytics,
};
