const { app } = require("google-play-scraper");
const config = require("../../config/keys.config");

const { google } = require("googleapis");
const publisher = google.androidpublisher("v3");

exports.get_add_reply = async (req, res) => {
  try {
    const { app_model } = req.models;
    app_model
      .find()
      .then((data) => {
        res.render("./dashboard/pages/add_reply", {
          page: "Add Reply",
          apps: data,
        });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

exports.add_reply = async (req, res) => {
  try {
    const { reply_model } = req.models;
    const newReply = reply_model({
      supportedStars: req.body.supportedStars,
      replyByLanguage: [...req.body.replyByLanguage],
      supportedApps: [...req.body.supportedApps],
    });
    const result = await newReply.save();
    if (result) {
      res.status(200).json({
        success: true,
        message: "Reply added successfully",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "some error occured",
      });
    }
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "error occured",
    });
  }
};

exports.updateReply = async (req, res) => {
  try {
    let replyId = req.body.replyId;
    const { reply_model } = req.models;
    const result = await reply_model.findByIdAndUpdate(
      { _id: replyId },
      {
        supportedStars: req.body.supportedStars,
        replyByLanguage: [...req.body.replyByLanguage],
        supportedApps: [...req.body.supportedApps],
      },
      { new: true }
    );
    if (result) {
      res.status(200).json({
        success: true,
        message: "Reply Updated successfully",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "some error occured",
      });
    }
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "error occured",
    });
  }
};

exports.get_edit_reply = async (req, res) => {
  const replyId = req.params.id;
  try {
    const { reply_model, app_model } = req.models;
    const data = await app_model.find();
    const reply = await reply_model.findById(replyId).populate("supportedApps");
    res.render("./dashboard/pages/edit_reply.ejs", {
      page: "Edit Reply",
      apps: data,
      reply: reply,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.get = async (req, res) => {
  try {
    const { reply_model, app_model } = req.models;
    const data = await app_model.find();
    const replies = await reply_model.find().populate("supportedApps");
    res.render("./dashboard/pages/reply", {
      page: "All Replies",
      apps: data,
      replies: replies,
    });
  } catch (error) {}
};

exports.get_deployed_reply = async (req, res) => {
  try {
    const appId = req.params.appId;
    const { deployedReview_model, app_model } = req.models;
    const data = await app_model.find();
    const deployedReplies = await deployedReview_model
      .find({ appId: appId,deployedStatus: false })
      .populate("supportedApps")
      .populate("rewiewId");
    res.render("./dashboard/pages/deployed_reply", {
      page: "All Deploy Able Replies",
      apps: data,
      replies: deployedReplies,
      currentAppId: appId,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateReplyBeforeDeply = async (req, res) => {
  const replyId = req.body.replyId;
  const updatedReply = req.body.updatedReply;
  try {
    const { deployedReview_model } = req.models;
    const updated = await deployedReview_model.findByIdAndUpdate(
      { _id: replyId },
      { reviewDeveloperComment: updatedReply },
      { new: true }
    );
    if (!updated) {
      return res
        .status(404)
        .json({ status: false, message: "updated not found" });
    }
    res.status(200).json({
      success: true,
      message: req.body.replyId + " updated successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json("Un Known Error Occured" + error);
  }
};

exports.deployAllReply = async (req, res) => {
  const appId = req.body.appId;
  const { deployedReview_model, app_model } = req.models;
  const app = await app_model.find({ _id: appId });
  const PACKAGE_NAME = app[0].appId;

  deployedReview_model
    .find({ appId: appId, deployedStatus: false })
    .populate("rewiewId")
    .populate("appId")
    .then((readyForDeployReplies) => {
      const jwtClient = new google.auth.JWT(
        config.googleApi.SERVICE_ACCOUNT_EMAIL,
        null,
        config.googleApi.SERVICE_ACCOUNT_PRIVATE_KEY,
        ["https://www.googleapis.com/auth/androidpublisher"],
        null
      );
      google.options({ auth: jwtClient });

      readyForDeployReplies.forEach((singleReply) => {
        // jwtClient.authorize(function (err, token) {
        //   if (err) {
        //     return console.log(err);
        //   }
        // publisher.reviews.reply(
        //   {
        //     packageName: singleReply.appId.appId,
        //     reviewId: singleReply.rewiewId.rewiewId,
        //     requestBody: {
        //       replyText: singleReply.reviewDeveloperComment,
        //     },
        //   },
        //   function (err, resp) {
        //     if (err) {
        //       return console.log(err);
        //     }
        //     let replyId = singleReply._id;
        //
        //       await deployedReview_model.findByIdAndUpdate(
        //         { replyId },
        //         { deployedStatus: true },
        //         { new: true }
        //       );
        //   }
        // );
        // });
      });
      res
        .status(200)
        .json({ success: true, message: "All replies updated successfully" });
    })
    .catch((error) => {
      res.status(500).json("Un Known Error Occured" + error);
    });
};
