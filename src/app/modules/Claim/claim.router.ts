import express from 'express'
import { claimCollections } from './claim.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
    '/',
    auth(),
    claimCollections.createClaim
);

router.get(
    '/',
    auth(),
    claimCollections.getClaims
);

router.put(
    '/:id',
    auth(),
    claimCollections.updateClaimStatus
)

export const claimRouters = router