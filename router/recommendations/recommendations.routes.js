const express = require('express')
const router = express.Router();

const recommendations = require('../../controller/recommendations/recommendations.controller');

router.get('/get_recommendations', recommendations.getRecommendations)
router.get('/get_impactData', recommendations.get_impactData)
router.get('/system_recommendations', recommendations.get_systemData)
router.get('/get_recommendationByUseCase', recommendations.getRecommendationByUseCases)
router.put('/update_recommendations', recommendations.updateRecommendation)
router.post('/create_recommendations', recommendations.createRecommendations)


module.exports = router;