const express = require('express')
const router = express.Router();

const alternative_recommendations = require('../../controller/alternative_recommendations/alternative_recommendations');

router.get('/get_alternative_recommendations', alternative_recommendations.getAlternativeRecommendations)
router.get('/get_recommendationById', alternative_recommendations.getRecommendationById)
router.put('/update_alternative_recommendations', alternative_recommendations.updateAlternativeRecommendation)
router.post('/create_alternative_recommendations', alternative_recommendations.createAlternativeRecommendations)


module.exports = router;