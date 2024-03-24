import dayjs from 'dayjs'
import OrderCardHeader from './OrderCardHeader'
import OrderCardBody from './OrderCardBody'

const OrderCard = ({ order }: { order: any }) => {
	const getFormattedDate = () => {
		const dateInEpoch = parseInt(order.date)

		return dayjs(dateInEpoch).format('DD MMMM, YYYY')
	}

	return (
		<div>
			<OrderCardHeader
				paymentMode={order.paymentMode}
				total={order.total}
				_id={order._id}
				date={getFormattedDate()}
			/>
			<OrderCardBody order={order} />
		</div>
	)
}

export default OrderCard
