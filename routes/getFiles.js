const stream = require("stream");
const express = require("express");
const multer = require("multer");
const path = require("path");
const store = require("store");

// Encryption
const encrypt = require("../controller/encrypt");

// Database Schemas
const Courses = require("../model/Courses");
const Referal_codes = require("../model/Refernal_code");
const mongoose = require("mongoose");

var links = [];
var vdoLinks;
var fileList = [];
var downloads = [];
const { google } = require("googleapis");

// MiddleWares
const uploadRouter = express.Router();
const upload = multer();

const KEYFILEPATH = path.join(__dirname, "..", "config", "credentials.json");
const SCOPES = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.readonly",
];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

// First, create a new instance of the Drive API client
const drive = google.drive({
  version: "v3",
});

// Define the ID of the folder you want to retrieve files from
var folderId = "";

// Upload Function
const uploadFile = async (fileObject) => {
  console.log("Into Upload");
  try {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const { data } = await google
      .drive({
        version: "v3",
        auth: auth,
      })
      .files.create({
        media: {
          mimeType: fileObject.mimeType,
          body: bufferStream,
        },
        requestBody: {
          name: fileObject.originalname,
          parents: ["1fYvQdpYxFdUaakSvkSwSqu0zFmBTfDFY"],
        },
        fields: "id,name",
      });
    console.log(`Uploaded file ${data.name} ${data.id}`);
  } catch (e) {
    console.warn("Error 2", e);
  }
};

// Routing
uploadRouter.post("/", async (req, res) => {
  try {
    var result = await Courses.create({
      course_banner: "../images/course_1.png",
      course_name: req.body.course_name,
      course_description: req.body.course_description,
      course_link: req.body.course_link,
    });
  } catch (e) {
    return console.log("Error ", e);
  }
  res.redirect(`/courses/${result._id}`);
});

uploadRouter.get(`/:id`, async (req, res) => {
  const session = req.session;

  var fullUrl = req.protocol + "://" + req.get("host") + "/verifyReferal";
  if (req.params.id != "main.js" && req.params.id != "shareCourse") {
    console.error(req.url);
    // course = {};
    // Courses.findOne({ _id: req.params.id }, function(err, course) {
    //     this.course = course;
    // });

    // const id = mongoose.Types.ObjectId(req.params.id.trim());
    console.log("Link ", fullUrl);
    course = await Courses.findOne({ _id: req.params.id });
    folderId = `${course.course_link}`;
    console.log(course.course_link);
    // console.log("ARRAY ", a)
    if (store.get("links")) {
      console.log("Into If");
      links = store.get("link").link;
      files = store.get("link").fileList;
    } else {
      // Flush Before Links
      console.log("Info Else");
      links = [];
      fileList = [];
      downloads = [];
      var client = await auth.getClient();
      drive.files.list(
        {
          q: `'${folderId}' in parents`,
          fields: "files(name, webContentLink)",
          auth: client,
        },
        (err, myData) => {
          if (err)
            return console.error("The API returned an error:", err.message);

          const files = myData.data.files;
          // console.log(files);

          if (files.length) {
            console.log("Files:");
            files.forEach((file, index, arr) => {
              // downloads.push(file.webContentLink);
              fileList.push(file.name);
              links.push(file.webContentLink.split("&")[0]);
            });
            // Using LocalStorage
            store.set("vdoLinks", {
              links: links,
              files: fileList,
            });
            try {
              res.render(
                path.join(__dirname, "..", "views", "subViews", "search.pug"),
                {
                  links: links,
                  files: fileList,
                  course: course,
                  url: fullUrl,
                }
              );
              // res.redirect(`/courses/course/c${req.params.course_id}`);
            } catch (err) {
              console.log(err);
            }
          } else {
            console.log("No files found.");
            res.render(
              path.join(__dirname, "..", "views", "subViews", "search.pug"),
              {
                links: links,
                files: fileList,
                course: course,
                noData: true,
              }
            );
          }
        }
      );
    }
  } else if (req.params.id == "shareCourse") {
    const refer_exist = await Referal_codes.findOne({
      referer: session.username,
    });
    if (session.username) {
      if (!refer_exist) {
        console.log("new Referring");
        const refer_code = require("crypto").randomBytes(16).toString("hex");
        var result = await Referal_codes.create({
          referer: session.username,
          referal_code: refer_code,
        });

        console.log("Result ", result);
        if (result) {
          res.render(
            path.join(__dirname, "..", "views", "subViews", "shareCourse.pug"),
            {
              url: fullUrl,
              refer_code: refer_code,
            }
          );
        } else {
          res.json({ message: "Unable TO Refer" });
        }
      } else {
        var refer_code = refer_exist.referal_code;
        res.render(
          path.join(__dirname, "..", "views", "subViews", "shareCourse.pug"),
          {
            url: fullUrl,
            refer_code: refer_code,
          }
        );
      }
    } else {
      res.redirect("/login_signIn.html");
    }
  }
});

// uploadRouter.get('/course/c:course_id', async(req, res) => {
//     console.log(req.url);
//     res.render(path.join(__dirname, '..', 'views', 'subViews', 'search.pug'), {
//         links: links,
//         files: fileList
//     });
// })

// Upload Section
// upload.any() - multer
uploadRouter.post("/upload", upload.any(), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);
    const { body, files } = req;
    for (let f = 0; f < files.length; f += 1) {
      await uploadFile(files[f]);
    }

    console.log(body);
    res.status(200).send("Form Submitted");
  } catch (f) {
    res.send(f.message);
  }
});

module.exports = {
  uploadRouter,
  links,
};
