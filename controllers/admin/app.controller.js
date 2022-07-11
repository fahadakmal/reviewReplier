var gplay = require("google-play-scraper");
const config = require("../../config/keys.config");

const { google } = require("googleapis");
const publisher = google.androidpublisher("v3");

exports.get_sub_category = async (req, res) => {
  const { sub_category_model } = req.models;
  sub_category_model
    .find()
    .populate("category")
    .populate("created_by")
    .populate("updated_by")
    .then((data) => {
      res.render("./dashboard/pages/sub-category", {
        page: "sub-category",
        sub_categories: data,
        message: "",
      });
    });
};

exports.get_add_sub_category = async (req, res) => {
  const { category_model } = req.models;
  category_model
    .find()
    .then((data) => {
      res.render("./dashboard/pages/add_sub_category", {
        page: "sub category",
        categories: data,
      });
    })
    .catch((err) => {});
};

exports.add_sub_category = async (req, res) => {
  if (req.user) {
    try {
      const { category_model, sub_category_model } = req.models;
      const { errors, isValid } = sub_category_validator(req.body);
      // validating inputs
      if (!isValid)
        return res.status(200).json({
          success: false,
          message: "Missing or invalid fields",
          errors: { ...errors },
        });

      sub_category_model
        .find({ name: req.body.name, is_deleted: false })
        .then((cat) => {
          if (cat.length)
            return res.status(200).json({
              success: false,
              message:
                "Sub Category with this name already exist, Try different Name",
            });
          else {
            category_model
              .find({ _id: req.body.category, is_deleted: false })
              .then((category) => {
                if (!category.length) {
                  res.status(200).json({
                    success: false,
                    message: "selected primary category is not available",
                    error_message: err,
                  });
                } else {
                  const new_sub_category = new sub_category_model({
                    ...req.body,
                    created_by: req.user._id,
                    updated_by: req.user._id,
                  });
                  new_sub_category
                    .save()
                    .then(() => {
                      res.status(200).json({
                        success: true,
                        message: "category added successfully",
                      });
                    })
                    .catch((err) => {
                      res.status(200).json({
                        success: false,
                        message:
                          "Some unknown Error Occured please try again later",
                        error_message: err,
                      });
                    });
                }
              });
          }
        })
        .catch((err) =>
          res.status(200).json({
            success: false,
            message: "Some unknown Error Occured please try again later",
            error_message: err,
          })
        );
    } catch (err) {
      res.status(200).json({
        success: false,
        message: "Some unknown Error Occured please try again later",
        error_message: err,
      });
    }
  } else {
    return res.status(400).json({
      authentication: "unbale to authenticate.",
    });
  }
};

exports.get_add_app = async (req, res) => {
  res.render("./dashboard/pages/add_category", { page: "category" });
};

exports.search_app = async (req, res) => {
  try {
    gplay
      .app({ appId: req.body.bundleId })
      .then((result) => {
        return res.status(200).json({
          success: true,
          result: result,
        });
      })
      .catch((err) => {
        return res.status(200).json({
          success: false,
          message: "App not found",
          errors: err,
        });
      });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Some unknown Error Occured please try again later",
      errors: err,
    });
  }
};

exports.add_app = async (req, res) => {
  if (req.user) {
    try {
      const { app_model } = req.models;
      app_model
        .find({ name: req.body.name })
        .then((app) => {
          if (app.length)
            return res.status(200).json({
              success: false,
              message: "App with this name already exist, Try different App",
            });
          else {
            const new_app = new app_model({
              ...req.body,
            });
            new_app
              .save()
              .then(() => {
                res.status(200).json({
                  success: true,
                  message: "App added successfully",
                });
              })
              .catch((err) => {
                res.status(200).json({
                  success: false,
                  message: "Some unknown Error Occured please try again later",
                  error_message: err,
                });
              });
          }
        })
        .catch((err) =>
          res.status(200).json({
            success: false,
            message: "Some unknown Error Occured please try again later",
            error_message: err,
          })
        );
    } catch (err) {
      res.status(200).json({
        success: false,
        message: "Some unknown Error Occured please try again later",
        error_message: err,
      });
    }
  } else {
    return res.status(400).json({
      authentication: "unbale to authenticate.",
    });
  }
};

exports.delete_app = async (req, res) => {
  const id = req.body.id;
  const { app_model, review_model, deployedReview_model } = req.models;
  try {
    const app = await app_model.findByIdAndDelete(id);

    if (!app) {
      res.status(404).send("No App found");
    } else {
      await review_model.remove({ appId: id });
      await deployedReview_model.remove({ appId: id });
      res.status(200).json({
        success: true,
        message: "App deleted successfully",
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Some unknown Error Occured please try again later",
      error_message: err,
    });
  }
};

exports.fetchReviews = async (req, res) => {
  const { app_model, review_model } = req.models;
  await app_model
    .find()
    .then((apps) => {
      const jwtClient = new google.auth.JWT(
        config.googleApi.SERVICE_ACCOUNT_EMAIL,
        null,
        config.googleApi.SERVICE_ACCOUNT_PRIVATE_KEY,
        ["https://www.googleapis.com/auth/androidpublisher"],
        null
      );
      apps.forEach((singleApp) => {
        google.options({ auth: jwtClient });

        //  Authorize and request reviews list
        jwtClient.authorize(function (err, token) {
          if (err) {
            return console.log(err);
          }

          publisher.reviews.list(
            {
              auth: jwtClient,
              packageName: singleApp.appId,
            },
            function (err, resp) {
              if (err) {
                return console.log(err);
              }

              resp.data.reviews.forEach((fetchedReview) => {
                const filter = { rewiewId: fetchedReview.reviewId };
                let deeloperComment = "";
                let developerContentExist = false;
                if (fetchedReview.comments[1]?.developerComment.text) {
                  deeloperComment =
                    fetchedReview.comments[1].developerComment.text;
                  developerContentExist = true;
                }
                const update = {
                  rewiewId: fetchedReview.reviewId,
                  reviewAurther: fetchedReview.authorName,
                  reviewRating:
                    fetchedReview.comments[0].userComment.starRating,
                  reviewLanguage: fetchedReview.comments[0].userComment
                    .reviewerLanguage
                    ? fetchedReview.comments[0].userComment.reviewerLanguage
                    : "",
                  reviewUserComment: fetchedReview.comments[0].userComment.text,
                  reviewDeveloperComment: deeloperComment,
                  reviewRepliedStatus: developerContentExist,
                  reviewRepliedByAutoReplier: false,
                  appId: singleApp._id,
                  publishedDate: new Date(
                    fetchedReview.comments[0].userComment.lastModified.seconds *
                      1000
                  ),
                };
                review_model
                  .findOneAndUpdate(filter, update, {
                    new: true,
                    upsert: true, // Make this update into an upsert
                  })
                  .then(() => {})
                  .catch((err) => {
                    res.status(200).json({
                      success: false,
                      message:
                        "Some unknown Error Occured please try again later",
                      error_message: err,
                    });
                  });
              });
              res.status(200).json({
                success: true,
                message: "Reviews fetched Successfully",
              });
            }
          );
        });
      });
    })
    .catch((err) => {
      res.status(200).json({
        success: false,
        message: "Some unknown Error Occured please try again later",
        error_message: err,
      });
    });
};

function containsAny(str, substrings) {
  for (var i = 0; i != substrings.length; i++) {
    var substring = substrings[i];
    if (str.indexOf(substring) != -1) {
      return substring;
    }
  }
  return null;
}

exports.get_app = async (req, res) => {
  const { app_model, review_model } = req.models;

  app_model.find().then((data) => {
    let currentApp = data.filter((singleApp) => singleApp._id == req.params.id);
    review_model
      .find({ appId: req.params.id })
      .sort({ publishedDate: "desc" })
      .then((reviews) => {
        res.render("./dashboard/pages/reviews", {
          page: currentApp[0].name,
          apps: data,
          currentApp: currentApp,
          reviewsData: reviews,
        });
      });
  });
};

const updateReviewStatus = async (req, reviewId) => {
  const { review_model } = req.models;
  await review_model.findByIdAndUpdate(
    reviewId,
    { reviewRepliedByAutoReplier: true },
    { new: true }
  );
};

exports.replyAll = async (req, res) => {
  const appId = req.body.appId;
  const { deployedReview_model, review_model, reply_model } = req.models;
  let replyCondtions = await reply_model.find({ supportedApps: appId });
  review_model
    .find({
      appId: appId,
      reviewRepliedStatus: false,
      reviewRepliedByAutoReplier: false,
    })
    .then((reviews) => {
      //lopp for reviews
      reviews.forEach((singleReview) => {
        //loop for reply condition
        replyCondtions.forEach((replyCondition) => {
          let ratingArray = replyCondition.supportedStars.split("|");

          if (ratingArray.includes(singleReview.reviewRating)) {
            if (singleReview.reviewLanguage !== "") {
              let selectedLanguageObj = replyCondition.replyByLanguage.filter(
                (replyConditionForLanguage) =>
                  replyConditionForLanguage.lang.toUpperCase() ===
                  singleReview.reviewLanguage.toUpperCase()
              );

              //language not exist in reply condition

              if (selectedLanguageObj.length > 0) {
                //lanugae exist in reply condition

                //reply keywords exist
                if (selectedLanguageObj[0].keyWords != "") {
                  let replyLangkeyWordsList =
                    selectedLanguageObj[0].keyWords.split(",");
                  //keywords matched
                  if (
                    containsAny(
                      singleReview.reviewUserComment,
                      replyLangkeyWordsList
                    ) !== null
                  ) {
                    let newEntryWithReplyLang = new deployedReview_model({
                      rewiewId: singleReview._id,
                      reviewDeveloperComment: selectedLanguageObj[0].reply,
                      deployedStatus: false,
                      appId: appId,
                    });
                    newEntryWithReplyLang.save();
                    //update review
                    updateReviewStatus(req, singleReview._id);
                  }
                } else {
                  let newEntryWithReplyLang = new deployedReview_model({
                    rewiewId: singleReview._id,
                    reviewDeveloperComment: selectedLanguageObj[0].reply,
                    deployedStatus: false,
                    appId: appId,
                  });
                  newEntryWithReplyLang.save();
                  //update review
                  updateReviewStatus(req, singleReview._id);
                }
              }
            } else {
              let englishLangObj = replyCondition.replyByLanguage.filter(
                (replyConditionForLanguage) =>
                  replyConditionForLanguage.lang.toUpperCase() ===
                  "en".toUpperCase()
              );
              if (englishLangObj.length > 0) {
                if (englishLangObj[0].keyWords !== "") {
                  let keyWordsList = englishLangObj[0].keyWords.split(",");

                  if (
                    containsAny(
                      singleReview.reviewUserComment,
                      keyWordsList
                    ) !== null
                  ) {
                    //add in db with english
                    let newEntryWithEnglish = new deployedReview_model({
                      rewiewId: singleReview._id,
                      reviewDeveloperComment: englishLangObj[0].reply,
                      deployedStatus: false,
                      appId: appId,
                    });
                    newEntryWithEnglish.save();
                    //update review
                    updateReviewStatus(req, singleReview._id);
                  }
                } else {
                  let newEntryWithEnglish = new deployedReview_model({
                    rewiewId: singleReview._id,
                    reviewDeveloperComment: englishLangObj[0].reply,
                    deployedStatus: false,
                    appId: appId,
                  });
                  newEntryWithEnglish.save();
                  updateReviewStatus(req, singleReview._id);
                }
              }
            }
          }
        });
      });
      res.status(200).json({
        success: true,
        message: "Reviews Added in Deployed Successfully",
      });
    })
    .catch((error) => {
      res.status(200).json({
        success: true,
        message: "Reviews Added in Deployed Successfully",
        errors: error,
      });
    });
};
