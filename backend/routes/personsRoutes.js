import express from "express";

import { verifyToken } from "../middleware/auth.js";

import {
  addOrUpdatePersonAndWork,
  deleteMediaById,
  deleteMultiplePersons,
  deletePerson,
  deleteWorkById,
  getAllPersonsWithData,
  getPersonBasics,
  getPersonWithWorksAndMedia,
  getPersonWithWorksAndMediaById,
  getPersonWithWorksById,
  getWorkWithMediaById,
  insertWorkView,
  searchPersonsByPartialName,
  updatePersonBasicById,
  updateWorkById,
  uploadMedia,
  uploadPersonBasicFeature,
} from "../controllers/personController.js";
import pool from "../db/config.js";
import { slugify } from "../utils/slugify.js";

const router = express.Router();

async function fetchTitle(req, res, next) {
  const workId = req.params.workId;
  try {
    const [rows, fields] = await pool.query(
      "SELECT title FROM works WHERE id = ?",
      [workId]
    );
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "Work not found" });
    }
    req.workTitle = slugify(rows.title);
    next();
  } catch (error) {
    console.error("Failed to fetch title:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

router.get("/basic", getPersonBasics);

router.get("/list", getAllPersonsWithData);
// Route to delete multiple persons

router.get("/data", getPersonWithWorksAndMedia);

router.get("/find", searchPersonsByPartialName);
router.post("/delete-multiply", verifyToken, deleteMultiplePersons);

router.get("/:personId", getPersonWithWorksById);
router.put(
  "/:personId",
  uploadPersonBasicFeature.single("featuredImage"),
  updatePersonBasicById
);
router
  .route("/:title/:fullName")
  .post(verifyToken, uploadMedia, addOrUpdatePersonAndWork);

router.delete("/media/:mediaId", deleteMediaById);

// POST route to handle media uploads for a specific work
router.post(
  "/work/:workId/:fullName/media",
  fetchTitle,
  uploadMedia,
  async (req, res) => {
    const workId = req.params.workId;
    let media = { images: [], videos: [], audios: [], documents: [] };

    const title = req.workTitle;
    const { fullName } = req.params;

    const slugifyFullName = slugify(fullName);

    let conn;
    try {
      conn = await pool.getConnection(); // Ensure pool is defined and imported properly

      const promises = [];
      ["images", "videos", "audios", "documents"].forEach((type) => {
        if (req.files && req.files[type]) {
          req.files[type].forEach((file) => {
            const url = `${req.protocol}://${req.get(
              "host"
            )}/api/person-of-interest/${slugifyFullName}/${slugify(
              title
            )}/${type}/${slugify(file.originalname)}`;
            const mediaItem = {
              url: url,
              name: file.originalname,
              fileType: file.mimetype,
              type: type,
            };

            media[type].push(mediaItem);
            promises.push(
              conn
                .query(
                  "INSERT INTO media (work_id, url, name, fileType, type) VALUES (?, ?, ?, ?, ?)",
                  [workId, url, file.originalname, file.mimetype, type]
                )
                .then((insertResult) => {
                  mediaItem.mediaId = insertResult.insertId.toString();
                })
            );
          });
        }
      });

      await Promise.all(promises);
      res.json({
        message: "Media files uploaded successfully",
        media: media,
      });
    } catch (error) {
      console.error("Failed to upload and record media:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    } finally {
    }
  }
);

async function fetchWorkDetails(workId, conn) {
  const query = `
    SELECT w.id, w.title, w.content, w.person_id, w.publishTime, w.isPublished, w.scheduledPublishTime, w.externalSource, w.work_view_count,
           m.id AS mediaId, m.url, m.name AS mediaName, m.fileType, m.type
    FROM works w
    LEFT JOIN media m ON w.id = m.work_id
    WHERE w.id = ?;
  `;
  const rows = await conn.query(query, [workId]);
  if (rows.length > 0) {
    let workDetails = {
      id: rows[0].id,
      title: rows[0].title,
      content: rows[0].content,
      person_id: rows[0].person_id,
      publishTime: rows[0].publishTime,
      isPublished: rows[0].isPublished,
      scheduledPublishTime: rows[0].scheduledPublishTime,
      externalSource: rows[0].externalSource,
      work_view_count: rows[0].work_view_count,
      media: { images: [], videos: [], audios: [], documents: [] },
    };

    rows.forEach((row) => {
      if (row.mediaId) {
        let mediaType = row.type.toLowerCase();
        if (workDetails.media.hasOwnProperty(mediaType)) {
          workDetails.media[mediaType].push({
            mediaId: row.mediaId,
            url: row.url,
            name: row.mediaName,
            fileType: row.fileType,
          });
        }
      }
    });

    return workDetails;
  } else {
    throw new Error("Work not found");
  }
}

router.get("/works/:workId", async (req, res) => {
  if (!req.params || !req.params.workId) {
    return res.status(400).send("Work ID is required");
  }
  const { workId } = req.params;
  const ipAddress = req.ip;

  let conn;
  try {
    conn = await pool.getConnection();
    // Record the view

    await insertWorkView(workId, ipAddress);

    // Fetch and send the work details
    const workDetails = await fetchWorkDetails(workId, conn);
    res.json(workDetails);
  } catch (error) {
    console.error("Error handling request for work details:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

router.get("/data/:personId", getPersonWithWorksAndMediaById);
router.get("/work/:workId", getWorkWithMediaById);
router.put("/work/:workId/:fullName", updateWorkById);
router.delete("/work/:workId", deleteWorkById);
// Route to delete a single person
router.delete("/:personId", deletePerson);

export default router;
