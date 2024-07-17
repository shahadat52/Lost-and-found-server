import express from 'express';
import validateRequest from "../../middlewares/validateRequest";
import { foundValidations } from "./found.Validation";
import { foundCollections } from "./found.collection";
import auth from '../../middlewares/auth';

const router = express.Router()
router.post(
    '/found-item-categories',

    auth(),
    validateRequest(foundValidations.createFoundCategorySchema),
    foundCollections.createFoundItemCategory
);


router.post(
    '/found-items',
    auth(),
    validateRequest(foundValidations.createFoundItemSchema),
    foundCollections.createFoundItem
);


router.get(
    '/',
    auth(),
    foundCollections.getFoundItems
)

export const foundRoutes = router