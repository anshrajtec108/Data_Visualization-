import { Router } from 'express';
import { ChartEnd_year, ChartStart_year, chartPieRegion, chartPieCountry, chartSectorAndRelevance, chartsectorAndIntensity, chartsectorAndLikelihood } from '../controllers/chart.controller.js';

const router = Router()

router.route('/start_year').get(ChartStart_year)
router.route('/end_year').get(ChartEnd_year)
router.route('/SectorAndRelevance').get(chartSectorAndRelevance)
router.route('/SectorAndLikelihood').get(chartsectorAndLikelihood)
router.route('/SectorAndIntensity').get(chartsectorAndIntensity)
router.route('/PieCountry').get(chartPieCountry)
router.route('/PieRegion').get(chartPieRegion)
export default router