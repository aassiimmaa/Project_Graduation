import { ALIGN_CENTER, FONT_WEIGHT_BOLD } from '../constant'
import { DateRange } from '../enum/DateRange'

const styleGridContainer = { px: 1, pb: 4, justifyContent: 'space-between' }

const responsiveFilterContiainer = (dateType: DateRange) => ({
  xs: 12,
  md: 5,
  lg: dateType == DateRange.All ? 4 : 5.4
})

const stylePaperFilter = {
  display: 'flex',
  alignItems: ALIGN_CENTER,
  justifyContent: 'space-evenly',
  gap: 2,
  p: 2,
  backgroundColor: '#f9f9f9',
  borderRadius: 3,
  flexWrap: 'wrap',
  minHeight: 88
}

const responsiveStatisticContainer = (dateType: DateRange) => ({
  xs: 12,
  md: 7,
  lg: dateType == DateRange.All ? 8 : 6.6
})

const styleStatisticContainer = { display: 'flex', gap: 2 }

const responsiveCountOrders = (dateType: DateRange) => ({
  lg: dateType == DateRange.All ? 6 : 5.5
})

const styleCountOrders = {
  display: 'flex',
  alignItems: ALIGN_CENTER,
  justifyContent: 'space-between',
  background: 'linear-gradient(90deg, #e3f2fd, #ffffff)',
  borderRadius: 4,
  px: 3,
  height: 88,
  color: '#1565c0',
  boxShadow: '0 6px 20px rgba(0,0,0,0.08)'
}

const styleCountOrderTitle = {
  display: 'flex',
  alignItems: ALIGN_CENTER,
  gap: 1
}

const styleCountOrderValue = {
  fontWeight: 700,
  fontSize: '1.25rem',
  color: '#1976d2'
}

const responsiveRevenue = (dateType: DateRange) => ({
  lg: dateType == DateRange.All ? 6 : 6.5
})

const styleRevenueContainer = {
  display: 'flex',
  alignItems: ALIGN_CENTER,
  gap: 1
}

const styleRevenue = {
  display: 'flex',
  alignItems: ALIGN_CENTER,
  justifyContent: 'space-between',
  background: 'linear-gradient(90deg, #d7f5dc, #ffffff)',
  borderRadius: 4,
  px: 3,
  height: 88,
  color: '#2e7d32',
  boxShadow: '0 6px 20px rgba(0,0,0,0.08)'
}

const styleRevenueValue = {
  fontWeight: 700,
  fontSize: '1.25rem',
  color: '#2e7d32'
}

const styleLabelAxis = {
  fontWeight: FONT_WEIGHT_BOLD,
  fontSize: 20,
  color: '#444'
}
const styleErrorIcon = { fontSize: 60, mb: 2, color: 'error.main' }
const styleErrorContent = {
  fontWeight: 'medium',
  letterSpacing: 0.5,
  color: 'error.dark'
}

const styleErrorHelp = { mt: 1, color: 'error.dark', maxWidth: 360 }

const styleTooltipContainer = {
  background: '#fff',
  border: '1px solid #ccc',
  padding: 1
}

export {
  styleGridContainer,
  responsiveFilterContiainer,
  stylePaperFilter,
  responsiveStatisticContainer,
  styleStatisticContainer,
  responsiveCountOrders,
  styleCountOrders,
  styleCountOrderTitle,
  styleCountOrderValue,
  responsiveRevenue,
  styleRevenueContainer,
  styleRevenue,
  styleRevenueValue,
  styleLabelAxis,
  styleErrorIcon,
  styleErrorContent,
  styleErrorHelp,
  styleTooltipContainer
}
