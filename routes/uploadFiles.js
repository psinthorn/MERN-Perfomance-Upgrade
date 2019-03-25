const AWS = require("aws-sdk");
const uuid = require("uuid/v1");
const requireLogin = require("./../middlewares/requireLogin");
const keys = require("./../config/keys");

const s3 = new AWS.S3({
  accessKeyId: keys.awsAccessKeyId,
  secretAccessKey: keys.awsSecretAccesKey
});
module.exports = app => {
  app.get("/api/upload", requireLogin, (req, res) => {
    //console.log("S3 Presign");
    const key = `${req.user.id}/${uuid()}.png`;

    s3.getSignedUrl(
      "putObject",
      {
        Bucket: "f2-images",
        ContentType: "image/png",
        Key: key
      },
      (err, url) => res.send({ key, url })
    );
  });
};
