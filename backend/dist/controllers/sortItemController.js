"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSortedItems = exports.updateOrCreateSortItems = exports.getAllSortedItems = void 0;
var _config = _interopRequireDefault(require("../db/config.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Assumes you have a dbConnection module for pooling

function replacer(key, value) {
  if (typeof value === 'bigint') {
    return value.toString(); // Convert BigInt to string
  }
  return value;
}
var updateOrCreateSortItems = exports.updateOrCreateSortItems = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      firstRowItems,
      secondRowItems,
      userId
    } = req.body;
    if (!firstRowItems || !secondRowItems || !userId) {
      return res.status(400).json({
        error: 'Missing required fields'
      });
    }
    var connection;
    try {
      connection = yield _config.default.getConnection();
      yield connection.beginTransaction();

      // Insert or update logic for firstRowItem
      var [existingSortItem] = yield connection.query('SELECT id FROM sort_items WHERE userId = ? AND firstRowItem = ?', [userId, firstRowItems.id]);
      var sortItemId;
      if (existingSortItem) {
        sortItemId = existingSortItem.id;
        console.log('Using existing sort item ID:', sortItemId);
      } else {
        var result = yield connection.query('INSERT INTO sort_items (userId, firstRowItem) VALUES (?, ?)', [userId, firstRowItems.id]);
        sortItemId = result.insertId;
        console.log('New sort item created with ID:', sortItemId);
      }

      // Handling secondRowItems
      yield connection.query('DELETE FROM second_row_items WHERE sortItem_id = ?', [sortItemId]);
      for (var item of secondRowItems) {
        yield connection.query('INSERT INTO second_row_items (sortItem_id, personId) VALUES (?, ?)', [sortItemId, item.id]);
      }
      yield connection.commit();
      res.json({
        message: 'Sort items updated successfully',
        id: sortItemId
      });
    } catch (error) {
      yield connection.rollback();
      console.error('Error processing your request:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        details: error.message
      });
    } finally {
      if (connection) connection.release();
    }
  });
  return function updateOrCreateSortItems(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/* export const updateSortedItems = async (req, res) => {
  const { firstRowItems, secondRowItems } = req.body;

  const userId = 1;

  // Check if firstRowItems is undefined, null, or an empty object
  if (!firstRowItems || Object.keys(firstRowItems).length === 0) {
    return res
      .status(400)
      .json({ error: 'firstRowItems is required and cannot be empty.' });
  }

  let conn;

  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    // Handling firstRowItem
    // Check if an entry exists for this user
    let [existing] = await conn.query(
      'SELECT id FROM sort_items WHERE userId = ?',
      [userId]
    );

    if (existing) {
      // Update existing firstRowItem
      await conn.query(
        'UPDATE sort_items SET firstRowItem = ? WHERE userId = ?',
        [firstRowItems.id, userId]
      );
    } else {
      // Insert new firstRowItem if none exists
      await conn.query(
        'INSERT INTO sort_items (userId, firstRowItem) VALUES (?, ?)',
        [userId, firstRowItems.id]
      );
    }

    // Handling secondRowItems
    // First, delete existing secondRowItems for this user
    let sortItemId = existing
      ? existing.id
      : (await conn.query('SELECT LAST_INSERT_ID() AS id')).id;
    await conn.query('DELETE FROM second_row_items WHERE sortItem_id = ?', [
      sortItemId,
    ]);

    // Now, insert the new secondRowItems
    for (const item of secondRowItems) {
      await conn.query(
        'INSERT INTO second_row_items (sortItem_id, personId, placeholder, text) VALUES (?, ?, ?, ?)',
        [sortItemId, item.id, item.placeholder, item.text]
      );
    }

    await conn.commit();
    res.json({ message: 'Sorted items updated successfully' });
  } catch (error) {
    await conn.rollback();
    console.error('Error processing your request:', error);
    res
      .status(500)
      .json({ error: 'Internal Server Error', details: error.message });
  } finally {
    if (conn) conn.release();
  }
}; */

var updateSortedItems = exports.updateSortedItems = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var {
      firstRowItems,
      secondRowItems
    } = req.body;
    var userId = 1;
    var conn;
    try {
      conn = yield _config.default.getConnection();
      yield conn.beginTransaction();

      // Check if an entry exists for this user
      var [existing] = yield conn.query('SELECT id FROM sort_items WHERE userId = ?', [userId]);
      if (firstRowItems === null) {
        if (existing) {
          yield conn.query('UPDATE sort_items SET firstRowItem = NULL WHERE userId = ?', [userId]);
        }
      } else if (firstRowItems && Object.keys(firstRowItems).length > 0) {
        if (existing) {
          yield conn.query('UPDATE sort_items SET firstRowItem = ? WHERE userId = ?', [firstRowItems.id, userId]);
        } else {
          yield conn.query('INSERT INTO sort_items (userId, firstRowItem) VALUES (?, ?)', [userId, firstRowItems.id]);
        }
      }
      var sortItemId = existing ? existing.id : (yield conn.query('SELECT LAST_INSERT_ID() AS id'))[0].id;

      // Delete existing secondRowItems for this user
      yield conn.query('DELETE FROM second_row_items WHERE sortItem_id = ?', [sortItemId]);

      // Insert new secondRowItems
      for (var item of secondRowItems) {
        if (item.placeholder) {
          // Handling placeholders
          yield conn.query('INSERT INTO second_row_items (sortItem_id, personId, placeholder, text) VALUES (?, NULL, ?, ?)', [sortItemId, item.placeholder, item.text]);
        } else {
          // Handling real person items
          yield conn.query('INSERT INTO second_row_items (sortItem_id, personId, placeholder, text) VALUES (?, ?, FALSE, ?)', [sortItemId, item.id, item.text]);
        }
      }
      yield conn.commit();
      res.json({
        message: 'Sorted items updated successfully'
      });
    } catch (error) {
      yield conn.rollback();
      console.error('Error processing your request:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        details: error.message
      });
    } finally {
      if (conn) conn.release();
    }
  });
  return function updateSortedItems(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/* export const getAllSortedItems = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const query = `
            SELECT 
                si.id AS sortItemId, si.userId,
                p.id AS firstRowPersonId, p.firstName AS firstRowFirstName, 
                p.lastName AS firstRowLastName, p.featured AS firstRowFeatured,
                sr.personId AS secondRowPersonId, sp.firstName AS secondRowFirstName, 
                sp.lastName AS secondRowLastName, sp.featured AS secondRowFeatured
            FROM sort_items si
            JOIN persons p ON si.firstRowItem = p.id
            LEFT JOIN second_row_items sr ON si.id = sr.sortItem_id
            LEFT JOIN persons sp ON sr.personId = sp.id
        `;
    const results = await conn.query(query);
    const rows = Array.isArray(results) ? results : [results];

    const response = {
      firstRowItems: {},
      secondRowItems: [],
      userId: rows[0]?.userId ? String(rows[0].userId) : null,
    };

    rows.forEach((row) => {
      if (row.firstRowPersonId) {
        response.firstRowItems = {
          id: String(row.firstRowPersonId),
          firstName: row.firstRowFirstName,
          lastName: row.firstRowLastName,
          featured: row.firstRowFeatured,
        };
      }
      if (row.secondRowPersonId) {
        response.secondRowItems.push({
          id: String(row.secondRowPersonId),
          firstName: row.secondRowFirstName,
          lastName: row.secondRowLastName,
          featured: row.secondRowFeatured,
        });
      }
    });

    res.json(response);
  } catch (error) {
    console.error("Failed to retrieve sorted items:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  } finally {
    if (conn) conn.release();
  }
}; */

var getAllSortedItems = exports.getAllSortedItems = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var conn;
    try {
      var _rows$;
      conn = yield _config.default.getConnection();
      var results = yield conn.query("\n        SELECT \n        si.id AS sortItemId, \n        si.firstRowItem AS firstRowPersonId, \n        p.firstName AS firstRowFirstName, \n        p.lastName AS firstRowLastName, \n        p.featured AS firstRowFeatured,\n        sp.id AS secondRowPersonId, \n        sp.firstName AS secondRowFirstName, \n        sp.lastName AS secondRowLastName, \n        sp.featured AS secondRowFeatured,\n        sr.placeholder AS secondRowPlaceholder\n        FROM sort_items si\n        LEFT JOIN persons p ON si.firstRowItem = p.id\n        LEFT JOIN second_row_items sr ON si.id = sr.sortItem_id\n        LEFT JOIN persons sp ON sr.personId = sp.id;\n    ");
      var rows = Array.isArray(results) ? results : [results];
      var response = {
        firstRowItems: {},
        secondRowItems: [],
        userId: (_rows$ = rows[0]) !== null && _rows$ !== void 0 && _rows$.userId ? String(rows[0].userId) : null
      };
      rows.forEach(row => {
        if (row.firstRowPersonId && !response.firstRowItems.id) {
          response.firstRowItems = {
            id: String(row.firstRowPersonId),
            firstName: row.firstRowFirstName,
            lastName: row.firstRowLastName,
            featured: row.firstRowFeatured || '/assets/no-picture.png'
          };
        }
        if (row.secondRowPersonId || row.secondRowPlaceholder) {
          response.secondRowItems.push({
            id: row.secondRowPersonId ? String(row.secondRowPersonId) : null,
            firstName: row.secondRowFirstName,
            lastName: row.secondRowLastName,
            featured: row.secondRowFeatured || '/assets/no-picture.png',
            placeholder: row.secondRowPlaceholder
          });
        }
      });
      res.json(response);
    } catch (error) {
      console.error('Failed to retrieve sorted items:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        details: error.message
      });
    } finally {
      if (conn) conn.release();
    }
  });
  return function getAllSortedItems(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();