import React, { useCallback, useEffect, useState } from 'react'
import {
  Paper,
  Button,
  Typography,
  Divider,
  TextField,
  Box,
  MenuItem,
  Grid2,
  CircularProgress
} from '@mui/material'
import {
  ALIGN_CENTER,
  COUNT_ORDERS,
  FONT_WEIGHT_BOLD,
  INFO_COLOR,
  KEY_COMPONENT,
  REVENUE,
  REVENUE_CHART_TITLE,
  SEARCH_TEXT_BTN,
  STATISTIC_LOADING,
  STATISTIC_NULL_ERR,
  STATISTIC_NULL_HELP,
  STATISTICAL,
  SUFFIX_COUNT_ORDERS,
  SUFFIX_REVENUE,
  TABLE_TITLE_VARIANT,
  TOTAL_RENT_VEHICLE,
  TOTAL_REVENUE,
  VARIANT_BUTTON,
  VEHICLE_NAME
} from '~/app/shared/constant'
import {
  styleDivider,
  styleSearchButton,
  styleSelectStatus
} from '~/app/shared/styles/AdminTable'
import SearchIcon from '@mui/icons-material/Search'
import toast from 'react-hot-toast'
import { OrderStatistic } from '~/app/shared/inteface'
import { formatPrice } from '~/lib/formatPrice'
import { DATE_RANGE, DateRange } from '~/app/shared/enum/DateRange'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import DriveEtaIcon from '@mui/icons-material/DriveEta'
import {
  getRevenueAllTime,
  GetRevenueInMonth,
  getRevenueInYear,
  GetRevenueOnDate
} from '~/actions/order.action'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import {
  responsiveCountOrders,
  responsiveFilterContiainer,
  responsiveRevenue,
  responsiveStatisticContainer,
  styleCountOrders,
  styleCountOrderTitle,
  styleCountOrderValue,
  styleErrorContent,
  styleErrorHelp,
  styleErrorIcon,
  styleGridContainer,
  styleLabelAxis,
  stylePaperFilter,
  styleRevenue,
  styleRevenueContainer,
  styleRevenueValue,
  styleStatisticContainer,
  styleTooltipContainer
} from '~/app/shared/styles/Statistical'

const Statistic: React.FC = () => {
  const [searchValue, setSearchValue] = useState<Date | null>(null)
  const [dateType, setDateType] = useState(DateRange.All)
  const [animationTrigger, setAnimationTrigger] = useState(false)
  const [orders, setOrders] = useState<OrderStatistic>()

  const handleDateTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateType(event.target.value as unknown as DateRange)
    setSearchValue(null) // Reset khi đổi loại lọc
  }

  console.log(orders)

  const handleSearch = async () => {
    try {
      fetchOrdersWithTotal(dateType)
    } catch (error) {
      toast.error('Lấy dữ liệu thất bại!')
      console.error(error)
    }
  }

  const fetchOrdersWithTotal = useCallback(
    async (dateType: DateRange) => {
      try {
        let response = null
        switch (dateType) {
          case DateRange.All:
            response = await getRevenueAllTime()
            break
          case DateRange.Date:
            if (!searchValue) {
              toast.error('Vui lòng chọn ngày')
              return
            }
            response = await GetRevenueOnDate(searchValue)
            break
          case DateRange.Month:
            if (!searchValue) {
              toast.error('Vui lòng chọn ngày')
              return
            }
            const year = searchValue.getFullYear()
            const month = searchValue.getMonth() + 1
            response = await GetRevenueInMonth(month, year)
            break
          case DateRange.Year:
            if (!searchValue) {
              toast.error('Vui lòng chọn ngày')
              return
            }
            const yearValue = searchValue.getFullYear()
            response = await getRevenueInYear(yearValue)
            break
        }
        const data = response.data
        setOrders({
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: (data ?? []).map((order: any) => ({
            ...order,
            users: {
              ...order.users,
              image: order.users.image ?? ''
            }
          })),
          totalOrders: response.totalOrders ?? 0,
          totalRevenue: response.totalRevenue
        })
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setAnimationTrigger(prev => !prev)
      }
    },
    [searchValue]
  )

  useEffect(() => {
    if (!orders) {
      fetchOrdersWithTotal(DateRange.All)
    }
  }, [orders, fetchOrdersWithTotal])

  // Tính doanh thu theo xe
  const revenueByVehicle = (orders?.data ?? []).reduce(
    (acc, order) => {
      const vehicleName = order.vehicles.vehicleName
      if (!acc[vehicleName]) {
        acc[vehicleName] = 0
      }
      acc[vehicleName] += order.totalAmount // cộng doanh thu
      return acc
    },
    {} as Record<string, number>
  )

  // Tính số lượt thuê theo xe
  const rentCountByVehicle = (orders?.data ?? []).reduce(
    (acc, order) => {
      const vehicleName = order.vehicles.vehicleName
      if (!acc[vehicleName]) {
        acc[vehicleName] = 0
      }
      acc[vehicleName] += 1 // cộng lượt thuê
      return acc
    },
    {} as Record<string, number>
  )

  // Gộp lại cho Recharts
  const chartData = Object.entries(revenueByVehicle).map(
    ([vehicleName, revenue]) => ({
      vehicleName,
      revenue,
      count: rentCountByVehicle?.[vehicleName] ?? 0
    })
  )

  return (
    <>
      <Typography variant={TABLE_TITLE_VARIANT} fontWeight={FONT_WEIGHT_BOLD}>
        {STATISTICAL}
      </Typography>
      <Divider sx={styleDivider} />

      <Grid2 container spacing={2} sx={styleGridContainer}>
        {/* Cột trái: Bộ lọc */}
        <Grid2 size={responsiveFilterContiainer(dateType)}>
          <Paper elevation={4} sx={stylePaperFilter}>
            <TextField
              select
              label="Lọc theo"
              value={dateType}
              onChange={handleDateTypeChange}
              sx={styleSelectStatus}
            >
              {DATE_RANGE.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {dateType === DateRange.Date && (
                <DatePicker
                  label="Chọn ngày"
                  value={searchValue}
                  onChange={newValue => setSearchValue(newValue)}
                  format="dd/MM/yyyy"
                  slotProps={{
                    textField: { sx: styleSelectStatus }
                  }}
                />
              )}
              {dateType === DateRange.Month && (
                <DatePicker
                  views={['year', 'month']}
                  label="Chọn tháng"
                  value={searchValue}
                  onChange={newValue => setSearchValue(newValue)}
                  slotProps={{
                    textField: { sx: styleSelectStatus }
                  }}
                />
              )}
              {dateType === DateRange.Year && (
                <DatePicker
                  views={['year']}
                  label="Chọn năm"
                  value={searchValue}
                  onChange={newValue => setSearchValue(newValue)}
                  slotProps={{
                    textField: { sx: styleSelectStatus }
                  }}
                />
              )}
            </LocalizationProvider>

            <Button
              variant={VARIANT_BUTTON}
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              sx={styleSearchButton}
            >
              {SEARCH_TEXT_BTN}
            </Button>
          </Paper>
        </Grid2>

        {/* Cột phải: Thống kê */}
        <Grid2
          container
          size={responsiveStatisticContainer(dateType)}
          sx={styleStatisticContainer}
        >
          {/* Tổng lượt thuê xe */}
          <Grid2 size={responsiveCountOrders(dateType)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ flex: 1 }}
            >
              <Paper elevation={4} sx={styleCountOrders}>
                <Box sx={styleCountOrderTitle}>
                  <DriveEtaIcon sx={{ fontSize: 36 }} />
                  <Typography variant="h6" fontWeight={FONT_WEIGHT_BOLD}>
                    {TOTAL_RENT_VEHICLE}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={styleCountOrderValue}>
                  <CountUp
                    end={orders ? orders.totalOrders : 0}
                    duration={1}
                    separator=","
                    suffix={SUFFIX_COUNT_ORDERS}
                  />
                </Typography>
              </Paper>
            </motion.div>
          </Grid2>

          {/* Tổng doanh thu */}
          <Grid2 size={responsiveRevenue(dateType)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ flex: 1 }}
            >
              <Paper elevation={4} sx={styleRevenue}>
                <Box sx={styleRevenueContainer}>
                  <MonetizationOnIcon sx={{ fontSize: 32 }} />
                  <Typography variant="h6" fontWeight={FONT_WEIGHT_BOLD}>
                    {TOTAL_REVENUE}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={styleRevenueValue}>
                  <CountUp
                    end={orders ? orders.totalRevenue : 0}
                    duration={1}
                    separator=","
                    suffix={SUFFIX_REVENUE}
                  />
                </Typography>
              </Paper>
            </motion.div>
          </Grid2>
        </Grid2>
      </Grid2>
      {chartData.length > 0 && (
        <Typography
          variant="h4"
          textAlign={ALIGN_CENTER}
          fontWeight={FONT_WEIGHT_BOLD}
        >
          {REVENUE_CHART_TITLE}
        </Typography>
      )}
      <Box mt={1}>
        {chartData && chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={550}>
            <BarChart
              key={animationTrigger ? 'a' : 'b'}
              // key={chartData.length}
              data={chartData}
              margin={{ top: 40, right: 80, left: 60, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="vehicleName"
                angle={-20}
                textAnchor="end"
                interval={0}
                height={60}
                label={{
                  value: VEHICLE_NAME,
                  position: 'right',
                  style: styleLabelAxis,
                  dx: 8,
                  dy: -32
                }}
                style={{ fontSize: 14 }}
              />
              <YAxis
                dataKey="revenue"
                label={{
                  value: REVENUE,
                  position: 'top',
                  offset: 10,
                  style: styleLabelAxis,
                  dx: 28,
                  dy: -10
                }}
                style={{ fontSize: 18 }}
                tickFormatter={value => formatPrice(value.toString())}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload || payload.length === 0) return null

                  const revenue =
                    payload.find(p => p.name === 'revenue')?.value ?? 0
                  const count = payload[0]?.payload?.count ?? 0

                  return (
                    <Box sx={styleTooltipContainer}>
                      <Typography>
                        <Box
                          component={KEY_COMPONENT}
                        >{`${VEHICLE_NAME}: `}</Box>{' '}
                        {label}
                      </Typography>
                      <Typography>
                        <Box component={KEY_COMPONENT}>{`${REVENUE}: `}</Box>{' '}
                        {formatPrice(revenue.toString())}
                      </Typography>
                      <Typography>
                        <Box
                          component={KEY_COMPONENT}
                        >{`${COUNT_ORDERS}: `}</Box>{' '}
                        {count}
                      </Typography>
                    </Box>
                  )
                }}
              />
              <Bar
                dataKey="revenue"
                fill="rgb(223, 116, 16)"
                barSize={40}
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Box textAlign={ALIGN_CENTER} padding={5}>
            {orders?.data ? (
              <Box
                textAlign={ALIGN_CENTER}
                padding={6}
                display="flex"
                flexDirection="column"
                alignItems={ALIGN_CENTER}
                justifyContent={ALIGN_CENTER}
                color="text.secondary"
              >
                <ErrorOutlineIcon sx={styleErrorIcon} />
                <Typography variant="h6" sx={styleErrorContent}>
                  {STATISTIC_NULL_ERR}
                </Typography>
                <Typography variant="body2" sx={styleErrorHelp}>
                  {STATISTIC_NULL_HELP}
                </Typography>
              </Box>
            ) : (
              <>
                <CircularProgress color={INFO_COLOR} />
                <Typography variant="body1">{STATISTIC_LOADING}</Typography>
              </>
            )}
          </Box>
        )}
      </Box>
    </>
  )
}

export default Statistic
