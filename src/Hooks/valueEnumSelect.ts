import { useTranslation } from 'react-i18next'

const RealEstateStatusMenu = () => {
    const { t } = useTranslation()
    const statusOptions = {
        // all: { text: 'All', status: ['APPROVED', 'PENDING', 'OPENING', 'FINISHED'] },
        approved: { text: t('approved'), status: 'APPROVED' },
        pending: { text: t('pending'), status: 'PENDING' },
        opening: { text: t('opening'), status: 'OPENING' },
        finished: { text: t('finished'), status: 'FINISHED' },
    }
    return statusOptions
}

const PurposeStatusMenu = () => {
    const { t } = useTranslation()
    const purposeOptions = {
        // all: { text: 'All', status: ['SELL', 'RENT'] },
        sell: { text: t('sell'), status: 'SELL' },
        rent: { text: t('rent'), status: 'RENT' },
        
    }
    return purposeOptions
}

export { RealEstateStatusMenu, PurposeStatusMenu }
