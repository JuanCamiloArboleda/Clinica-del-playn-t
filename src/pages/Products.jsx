import React, { useEffect, useState } from "react";
import { useSupabase } from "../context/useSupabase";
import NavBar from "../components/NavBar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table";
import { Badge } from "@/components/Badge";

const Products = () => {
  const supabase = useSupabase();
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");

  // Estados para el formulario de creación de producto
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    id_store: "",
    id_supplier: "",
  });

  // Función para cargar productos
  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [supabase]);

  // Funciones de edición
  const handleEditClick = (productId, currentQuantity) => {
    setEditingProductId(productId);
    setNewQuantity(currentQuantity);
  };

  const handleQuantityChange = (e) => {
    setNewQuantity(e.target.value);
  };

  const handleSaveClick = async (productId) => {
    const { error } = await supabase
      .from("products")
      .update({ stock: newQuantity })
      .eq("id", productId);
    if (error) {
      console.error("Error updating product quantity:", error);
    } else {
      setProducts(
        products.map((product) =>
          product.id === productId
            ? { ...product, stock: newQuantity }
            : product
        )
      );
      setEditingProductId(null);
      setNewQuantity("");
    }
  };

  // Funciones para agregar un nuevo producto
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewProductSubmit = async (e) => {
    e.preventDefault();
    // Convertir price, stock, id_store e id_supplier a números (si es necesario)
    const productToInsert = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: newProduct.stock === "" ? null : parseInt(newProduct.stock, 10),
      id_store:
        newProduct.id_store === "" ? null : parseInt(newProduct.id_store, 10),
      id_supplier: parseInt(newProduct.id_supplier, 10),
    };

    const { data, error } = await supabase
      .from("products")
      .insert([productToInsert])
      .select();
    if (error) {
      console.error("Error inserting new product:", error);
    } else {
      // Actualizar la lista de productos tras la inserción
      setProducts([...products, ...data]);
      // Limpiar el formulario
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        id_store: "",
        id_supplier: "",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold dark:text-green-400">
          Productos
        </h1>
        <TableRoot>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell>Descripción</TableHeaderCell>
                <TableHeaderCell>Precio ($)</TableHeaderCell>
                <TableHeaderCell>Stock</TableHeaderCell>
                <TableHeaderCell>Acciones</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    {editingProductId === product.id ? (
                      <input
                        type="number"
                        value={newQuantity}
                        onChange={handleQuantityChange}
                        className="border rounded px-2 py-1 w-20"
                      />
                    ) : (
                      <Badge
                        variant={product.stock <= 5 ? "warning" : "default"}
                      >
                        {product.stock}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingProductId === product.id ? (
                      <button
                        onClick={() => handleSaveClick(product.id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      >
                        Guardar
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleEditClick(product.id, product.stock)
                        }
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                      >
                        Editar
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableRoot>

        {/* Formulario para agregar nuevos productos centrado */}
        <div className="mt-8 max-w-lg mx-auto p-4 border rounded shadow dark:border-gray-700">
          <h2 className="mb-4 text-xl font-semibold dark:text-white">
            Agregar Nuevo Producto
          </h2>
          <form onSubmit={handleNewProductSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium dark:text-white">Nombre</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleNewProductChange}
                required
                className="border rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium dark:text-white">
                Descripción
              </label>
              <input
                type="text"
                name="description"
                value={newProduct.description}
                onChange={handleNewProductChange}
                required
                className="border rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium dark:text-white">
                Precio ($)
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={newProduct.price}
                onChange={handleNewProductChange}
                required
                className="border rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium dark:text-white">Stock</label>
              <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleNewProductChange}
                className="border rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium dark:text-white">
                ID de Sede
              </label>
              <input
                type="number"
                name="id_store"
                value={newProduct.id_store}
                onChange={handleNewProductChange}
                className="border rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium dark:text-white">
                ID de Proveedor
              </label>
              <input
                type="number"
                name="id_supplier"
                value={newProduct.id_supplier}
                onChange={handleNewProductChange}
                required
                className="border rounded px-2 py-1"
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Agregar Producto
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Products;
