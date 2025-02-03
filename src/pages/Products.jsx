import React, { useEffect, useState } from "react";
import { useSupabase } from "../context/useSupabase";
import NavBar from "../components/NavBar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table";

const Products = () => {
  const supabase = useSupabase();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, [supabase]);

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold">Lista de Productos</h1>
        <TableRoot>
          <Table>
            <TableCaption></TableCaption>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell>Descripción</TableHeaderCell>
                <TableHeaderCell>Precio ($)</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* Opcional: Si deseas incluir un pie de tabla, descomenta y ajusta los valores */}
            {/*
            <TableFoot>
              <TableRow>
                <TableHeaderCell colSpan={2} scope="row" className="text-right">
                  Total
                </TableHeaderCell>
                <TableHeaderCell className="text-right">
                  {/* Aquí podrías sumar los precios o poner otro dato *\/}
                </TableHeaderCell>
              </TableRow>
            </TableFoot>
            */}
          </Table>
        </TableRoot>
      </div>
    </div>
  );
};

export default Products;
