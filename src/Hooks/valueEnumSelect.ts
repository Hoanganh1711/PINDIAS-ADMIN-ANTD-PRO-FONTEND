import { useTranslation } from 'react-i18next'

const RealEstateStatusMenu = () => {
    const { t } = useTranslation()
    const statusOptions = {
        // all: { text: 'All', status: ['APPROVED', 'PENDING', 'OPENING', 'FINISHED'] },
        approved: { text: 'APPROVED', status: 'APPROVED' },
        pending: { text: 'PENDING', status: 'PENDING' },
        opening: { text: 'OPENING', status: 'OPENING' },
        finished: { text: 'FINISHED', status: 'FINISHED' },
    }
    return statusOptions
}

const PurposeStatusMenu = () => {
    const { t } = useTranslation()
    const purposeOptions = {
        // all: { text: 'All', status: ['SELL', 'RENT'] },
        sell: { text: 'SELL', status: 'SELL' },
        rent: { text: 'RENT', status: 'RENT' },
    }
    return purposeOptions
}

export { RealEstateStatusMenu, PurposeStatusMenu }
