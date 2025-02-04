"use client"

import React, { useEffect, useState } from "react"
import { useSupabase } from "../context/useSupabase"
import NavBar from "./NavBar"
import { BarChart } from "../components/BarChart"

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString()

const OrdersProductsChart = () => {
  const supabase = useSupabase()
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const fetchOrdersData = async () => {
      const { data, error } = await supabase
        .from("ordersxproducts")
        .select("id_product, id_order, quantity")

      if (error) {
        console.error("Error fetching orders data:", error)
      } else {
        const transformedData = transformData(data)
        
      }
    }

    fetchOrdersData()
  }, [supabase])

  const transformData = (data) => {
    const groupedData = {}

    data.forEach(({ id_product, id_order, quantity }) => {
      if (!groupedData[id_product]) {
        groupedData[id_product] = { name: `Product ${id_product}` }
      }
      groupedData[id_product][`Order ${id_order}`] = quantity
    })

    return Object.values(groupedData)
  }

  return (
    <div>
      <NavBar />
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold">Orders per Product</h1>
        {chartData.length > 0 ? (
          <BarChart
            data={chartData}
            index="name"
            categories={Object.keys(chartData[0]).filter((key) => key !== "name")}
            valueFormatter={dataFormatter}
            yAxisWidth={48}
          />
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  )
}

export default OrdersProductsChart
