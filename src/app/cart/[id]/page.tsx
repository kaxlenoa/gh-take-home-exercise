import { getOrderById } from "@/lib/api"
import { OrderDetails } from "@/app/components/OrderDetails"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default async function OrderDetailsPage({ params }) {
    const order = await getOrderById(parseInt(params.id))
    return <OrderDetails initialOrder={order} />
} 