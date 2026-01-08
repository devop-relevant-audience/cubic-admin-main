const express = require("express");
const router = express.Router();

const routeBanner = require("../modules/banner/banner.route");
const routeClub = require("../modules/club/club.route");
const routeEvent = require("../modules/event/event.route");
const routeEventtag = require("../modules/eventtag/eventtag.route");
const routeInquiry = require("../modules/inquiry/inquiry.route");
const routeOurclass = require("../modules/ourclass/ourclass.route");
const routeSeo = require("../modules/seo/seo.route");
const routeService = require("../modules/service/service.route");
const routeTag = require("../modules/tag/tag.route");
const routeTrainer = require("../modules/trainer/trainer.route");
const routeTrainertag = require("../modules/trainertag/trainertag.route");

router.use("/banner", routeBanner);
router.use("/club", routeClub);
router.use("/event", routeEvent);
router.use("/eventtag", routeEventtag);
router.use("/inquiry", routeInquiry);
router.use("/ourclass", routeOurclass);
router.use("/seo", routeSeo);
router.use("/service", routeService);
router.use("/tag", routeTag);
router.use("/trainer", routeTrainer);
router.use("/trainertag", routeTrainertag);

module.exports = router;
