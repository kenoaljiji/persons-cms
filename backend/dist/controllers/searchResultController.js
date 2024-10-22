"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchItems = void 0;
var _config = _interopRequireDefault(require("../db/config.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var searchItems = exports.searchItems = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      sort,
      words: searchTerm,
      phrase,
      anyWords,
      excludeWords,
      includeExternalSources: externalSources,
      categories,
      createdStartDate,
      createdEndDate,
      publishStartDate,
      publishEndDate,
      page,
      limit = 4
    } = req.body.query;
    try {
      var tables = ['news', 'works', 'persons'];
      var sqlParts = [];
      var countParts = [];
      var params = [];
      var countParams = [];
      tables.forEach(table => {
        var queryPart = '';
        var countPart = '';
        // Customize SQL based on the table structure
        if (table === 'persons') {
          queryPart = "(SELECT 'persons' AS source_table, id, CONCAT(firstName, ' ', lastName) AS title, aboutPerson AS content, createdBy, created_at, externalSource, category, scheduledPublishTime FROM persons WHERE 1=1";
        } else if (table === 'works') {
          // Join the persons table to get firstName and lastName for each work
          queryPart = "(SELECT 'works' AS source_table, CONCAT(persons.firstName, ' ', persons.lastName) AS person_id, works.title, works.content, works.createdBy, works.created_at, works.externalSource, works.category, works.scheduledPublishTime\n                FROM works \n                JOIN persons ON works.person_id = persons.id WHERE 1=1";
        } else {
          queryPart = "(SELECT '".concat(table, "' AS source_table, id, title, content, createdBy, created_at, externalSource, category, scheduledPublishTime FROM ").concat(table, " WHERE 1=1");
        }

        // Copy the setup for queryPart, modify as needed for counting
        countPart = "(SELECT COUNT(*) FROM ".concat(table, " WHERE 1=1");
        if (searchTerm) {
          var words = Array.isArray(searchTerm) ? searchTerm : [searchTerm];
          if (words.length > 0) {
            queryPart += ' AND ('; // Start the group of OR conditions
            countPart += ' AND (';
            words.forEach((term, index) => {
              var fields = table === 'persons' ? "(firstName LIKE ? OR lastName LIKE ?)" : "(title LIKE ? OR content LIKE ?)";
              if (index > 0) {
                // Add OR only if it's not the first term
                queryPart += ' OR ';
                countPart += ' OR ';
              }
              queryPart += fields;
              countPart += fields;
              params.push("%".concat(term.trim(), "%"), "%".concat(term.trim(), "%"));
              countParams.push("%".concat(term.trim(), "%"), "%".concat(term.trim(), "%"));
            });
            queryPart += ')'; // Close the group of OR conditions
            countPart += ')';
          }
        }
        if (phrase) {
          var fields = table === 'persons' ? "(firstName LIKE ? OR lastName LIKE ?)" : "(title LIKE ? OR content LIKE ?)";
          queryPart += ' AND ' + fields;
          countPart += ' AND ' + fields;
          params.push("%".concat(phrase, "%"), "%".concat(phrase, "%"));
          countParams.push("%".concat(phrase, "%"), "%".concat(phrase, "%"));
        }
        if (anyWords && anyWords.length > 0) {
          // Start the condition string with opening parenthesis for the OR conditions
          queryPart += ' AND (';
          countPart += ' AND (';

          // Map over each word to create an SQL condition for it
          var conditions = anyWords.map(word => {
            // Ensure word is trimmed and non-empty
            word = word.trim();
            if (word) {
              // Push the parameters for each condition into the params array twice, once for title and once for content
              params.push("%".concat(word, "%"), "%".concat(word, "%"));
              countParams.push("%".concat(word, "%"), "%".concat(word, "%"));
              // Return the SQL condition part for this word

              var _fields = table === 'persons' ? "(firstName LIKE ? OR lastName LIKE ?)" : "(title LIKE ? OR content LIKE ?)";
              return _fields;
            }
            return null;
          }).filter(condition => condition !== null) // Filter out any null conditions if empty words were present
          .join(' OR '); // Join all conditions with 'OR'

          // Append the combined conditions to the queryPart and close the parenthesis
          queryPart += conditions + ')';
          countPart += conditions + ')';
        }
        if (excludeWords) {
          // Ensure excludeWords is treated as an array, even if it's a single string
          var wordsArray = Array.isArray(excludeWords) ? excludeWords : excludeWords.split(',');
          wordsArray.forEach(word => {
            word = word.trim();
            if (word) {
              // Check if the word is not empty after trimming
              if (table === 'persons') {
                // Using firstName and lastName for persons
                queryPart += " AND firstName NOT LIKE ? AND lastName NOT LIKE ?";
                countPart += " AND firstName NOT LIKE ? AND lastName NOT LIKE ?";
                params.push("%".concat(word, "%"), "%".concat(word, "%"));
                countParams.push("%".concat(word, "%"), "%".concat(word, "%"));
              } else {
                // Using title and content for other tables, specifying the table name to avoid ambiguity
                queryPart += " AND ".concat(table, ".title NOT LIKE ? AND ").concat(table, ".content NOT LIKE ?");
                countPart += " AND ".concat(table, ".title NOT LIKE ? AND ").concat(table, ".content NOT LIKE ?");
                params.push("%".concat(word, "%"), "%".concat(word, "%"));
                countParams.push("%".concat(word, "%"), "%".concat(word, "%"));
              }
            }
          });
        }
        if (categories && categories.length > 0) {
          var categoryList = categories.map(() => '?').join(', ');
          queryPart += " AND ".concat(table, ".category IN (").concat(categoryList, ")");
          countPart += " AND ".concat(table, ".category IN (").concat(categoryList, ")");
          params.push(...categories);
          countParams.push(...categories);
        }
        if (externalSources) {
          queryPart += " AND ".concat(table, ".externalSource IS NOT NULL AND ").concat(table, ".externalSource <> \"\"");
          countPart += " AND ".concat(table, ".externalSource IS NOT NULL AND ").concat(table, ".externalSource <> \"\"");
        }
        // Date range filters
        if (createdStartDate) {
          queryPart += " AND ".concat(table, ".created_at >= ?"); // Specify the table name explicitly
          countPart += " AND ".concat(table, ".created_at >= ?"); // Specify the table name explicitly
          params.push(createdStartDate);
          countParams.push(createdStartDate);
        }
        if (createdEndDate) {
          queryPart += " AND ".concat(table, ".created_at <= ?"); // Specify the table name explicitly
          countPart += " AND ".concat(table, ".created_at <= ?"); // Specify the table name explicitly
          params.push(createdEndDate);
          countParams.push(createdEndDate);
        }
        if (publishStartDate) {
          // Ensure 'scheduledPublishTime' is a valid column in the respective tables
          if (table === 'works' || table === 'news') {
            queryPart += " AND ".concat(table, ".scheduledPublishTime >= ?"); // Specify the table name
            countPart += " AND ".concat(table, ".scheduledPublishTime >= ?"); // Specify the table name explicitly
            params.push(publishStartDate);
            countParams.push(publishStartDate);
          }
        }
        if (publishEndDate) {
          if (table === 'works' || table === 'news') {
            queryPart += " AND ".concat(table, ".scheduledPublishTime <= ?"); // Specify the table name
            countPart += " AND ".concat(table, ".scheduledPublishTime <= ?"); // Specify the table name explicitly
            params.push(publishEndDate);
            countParams.push(publishEndDate);
          }
        }

        // Append the dynamic ORDER BY clause

        queryPart += ')'; // Closing the subquery
        countPart += ')'; // Closing the subquery
        sqlParts.push(queryPart);
        countParts.push(countPart);
      });

      // Execute the count queries to determine the total number of results

      var totalCountQueries = countParts.join(' UNION ALL ');
      var countResults = yield _config.default.query(totalCountQueries, countParams);

      // Sum up all counts returned by the UNION ALL query
      var totalResults = countResults.reduce((acc, curr) => acc + Number(curr['COUNT(*)']), 0);
      var parsPage = parseInt(page);
      var parsLimit = parseInt(limit);

      // Calculate total pages
      var pages = Math.ceil(totalResults / parsLimit);

      // Adjust page number if out of bounds
      var currentPage = Math.min(parsPage, pages) || 1;
      var offset = (currentPage - 1) * parsLimit;

      // Construct final SQL query for fetching data
      var fullSql = "".concat(sqlParts.join(' UNION ALL '), " ORDER BY ").concat(determineGlobalOrderBy(sort), " LIMIT ? OFFSET ?");
      var queryResults = yield _config.default.query(fullSql, [...params, parsLimit, offset]);

      // Send response with data and pagination info
      res.json({
        data: queryResults,
        totalResults,
        pages
      });
    } catch (error) {
      console.error('Search error:', error.message);
      res.status(500).send('Error during search');
    }
  });
  return function searchItems(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var determineGlobalOrderBy = sort => {
  switch (sort) {
    case 'document_desc':
      return 'created_at DESC';
    case 'document_asc':
      return 'created_at ASC';
    case 'release_desc':
      return 'scheduledPublishTime DESC';
    case 'release_asc':
      return 'scheduledPublishTime ASC';
    default:
      return 'created_at DESC';
    // Default fallback when no specific sort is provided
  }
};