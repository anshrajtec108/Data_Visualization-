import { Router } from 'express';
import {  FilterMutiple, endingDate, getAllValue, getFilter, quickSearchBaseonField, recentPublished, topEvents } from '../controllers/dashboard.controller.js';


const router = Router()

router.route('/getFilter/:field').get(getFilter)
router.route('/getAllData').get(getAllValue)
router.route('/topEvents').get(topEvents)
router.route('/recentPublished').get(recentPublished)
router.route('/endingDate').get(endingDate)
router.route('/mutipleFilter').post(FilterMutiple)
router.route('/quickSearchBaseonField').post(quickSearchBaseonField)


export default router